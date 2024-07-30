import { config, userCourseConfig as courseConfig } from "./config.js"

// Create elements for export

const pageEls = {
  header: undefined,
  navPanelButton: undefined,
  hamburgerIcon: undefined,
  closeIcon: undefined,
  subNavContainer: undefined,
  subNav: undefined,
  stickyNavButton: undefined,
  darkModeButton: undefined
}

// Create elements to use internally

const subNavItemsContainerEl = document.createElement("div")

/*
Attributes by element

Constructed as an array of (fake, because this is JS) tuples.
The first item in a "tuple" is the attribute that will be set.
The second item in a "tuple" is value to set the attribute to.

Landed on approach since some HTML attribute names are dashed.
*/

const headerElAttrs = [
  ["id", "tc-header"],
  ["class", "border-bottom position-sticky top-0"],
]

const navElAttrs = [
  ["id", "tc-nav"],
  ["class", "container-lg px-3 d-flex flex-items-center"],
]

const navPanelButtonElAttrs = [
  ["id", "tc-sub-nav-button"],
  ["class", "border-0 p-1"],
  ["aria-label", "Open navigation"],
  ["aria-controls", "tc-sub-nav-container"],
  ["aria-expanded", "false"],
]

const hamburgerIconSvgAttrs = [
  ["id", "tc-hamburger-icon"],
  ["class", "visible"],
  ["width", "30"],
  ["height", "30"],
  ["xmlns", "http://www.w3.org/2000/svg"],
  ["fill", "none"],
  ["viewBox", "0 0 18 14"],
]

const hamburgerIconPathAttrs = [
  ["stroke", "currentColor"], 
  ["stroke-linecap", "round"], 
  ["stroke-linejoin", "round"],
  ["stroke-width", "2"],
  ["d", "M1 13h7M1 1h16H1Zm0 6h16H1Z"],
]

const closeIconPathAttrs = [
  ["stroke", "currentColor"], 
  ["stroke-linecap", "round"], 
  ["stroke-linejoin", "round"],
  ["stroke-width", "2"],
  ["d", "m1 1 12 12M1 13 13 1 1 13Z"]
]

const closeIconSvgAttrs = [
  ["id", "tc-close-icon"],
  ["width", "30"],
  ["height", "30"],
  ["xmlns", "http://www.w3.org/2000/svg"],
  ["fill", "none"],
  ["viewBox", "0 0 14 14"],
]

const subNavContainerElAttrs = [
  ["id", "tc-sub-nav-container"],
  ["class", "d-grid"],
  ["aria-hidden", "true"],
]

const subNavElAttrs = [
  ["id", "tc-sub-nav"],
  ["class", "container-lg px-3 width-full"],
]

const subNavHeadingElAttrs = [
  ["class", "no-anchor"]
]

const subNavUlElAttrs = [
  ["class", "list-style-none p-0 my-3 d-flex flex-column gap-2"]
]

const stickyNavButtonElAttrs = [
  ["id", "tc-sticky-nav-button"],
  ["class", "border-0 px-3 py-2"],
]

const darkModeButtonElAttrs = [
  ["id", "tc-dark-mode-button"],
  ["class", "border-0 px-3 py-2"],
] 

const settingsBtnContainerElAttrs = [
  ["class", "my-3 d-flex gap-3 flex-wrap"]
]

// Do work:

// tktk figure out what to do when there is no config.

function buildPage() {
  if (!config) return
  buildHeader()
}

buildPage()

function buildHeader() {
  if (!courseConfig.isHeaderShown) return
  pageEls.header = createElWithAttrs("header", headerElAttrs)
  buildNav()
  pageEls.subNavContainer = createElWithAttrs("div", subNavContainerElAttrs)
  pageEls.subNav = createElWithAttrs("nav", subNavElAttrs)
  buildSubNav()
  buildSettings()
  pageEls.subNavContainer.appendChild(pageEls.subNav)
  pageEls.header.appendChild(pageEls.subNavContainer)
  document.body.prepend(pageEls.header)
}

function buildNav() {
  const navEl = createElWithAttrs("nav", navElAttrs)

  pageEls.navPanelButton = createElWithAttrs("button", navPanelButtonElAttrs)
  pageEls.hamburgerIcon = createSvgWithAttrs("svg", hamburgerIconSvgAttrs)
  pageEls.closeIcon = createSvgWithAttrs("svg", closeIconSvgAttrs)
  const hamburgerPath = createSvgWithAttrs("path", hamburgerIconPathAttrs)
  const closePath = createSvgWithAttrs("path", closeIconPathAttrs)
  
  pageEls.hamburgerIcon.appendChild(hamburgerPath)
  pageEls.closeIcon.appendChild(closePath)
  pageEls.navPanelButton.appendChild(pageEls.hamburgerIcon)
  pageEls.navPanelButton.appendChild(pageEls.closeIcon)
  navEl.appendChild(pageEls.navPanelButton)
  pageEls.header.appendChild(navEl)
}

function buildSubNav() {
  if (!courseConfig.isHeaderModuleNavShown) return

  buildHomeLink()
  buildMicrolessonLinks()
  pageEls.subNav.appendChild(subNavItemsContainerEl)
}

function buildHomeLink() {
  if (!courseConfig.isHeaderHomeNavShown) return

  const homeHeadingLinkElAttrs = [
    ["class", "no-underline p-0 my-3"],
    [
      "href", 
      `/${config.org.name}/${config.repo.name}/canvas-landing-pages/${courseConfig.name}`
    ]
  ]

  const homeHeadingEl = createElWithAttrs("h2", subNavHeadingElAttrs)

  const homeHeadingLinkEl = createElWithAttrs("a", homeHeadingLinkElAttrs)
  homeHeadingLinkEl.textContent = config.repo.friendlyName
  homeHeadingEl.appendChild(homeHeadingLinkEl)
  subNavItemsContainerEl.appendChild(homeHeadingEl)
}

function buildMicrolessonLinks() {
  if (!courseConfig.isHeaderMicrolessonNavShown) return

  const contentHeadingEl = createElWithAttrs("h2", subNavHeadingElAttrs)
  contentHeadingEl.textContent = "Content"
  const levelUpContentHeadingEl = createElWithAttrs("h2", subNavHeadingElAttrs)
  levelUpContentHeadingEl.textContent = "Level Up content"

  const contentUlEl = createElWithAttrs("ul", subNavUlElAttrs)
  const levelUpContentUlEl = createElWithAttrs("ul", subNavUlElAttrs)

  courseConfig.microlessons.forEach(ml => {
    const liEl = document.createElement("li")

    const anchorElAttrs = [
      ["class", "f3 text-bold no-underline"],
      ["href", `/${config.org.name}/${config.repo.name}/${ml.dirName}`]
    ]

    const anchorEl = createElWithAttrs("a", anchorElAttrs)
    anchorEl.textContent = ml.friendlyName

    liEl.appendChild(anchorEl)

    if (ml.type = "Content") {
      contentUlEl.appendChild(liEl)
    } else if (ml.type = "Level Up content") {
      levelUpContentUlEl.appendChild(liEl)
    }
  })

  if (contentUlEl.children.length) {
    subNavItemsContainerEl.appendChild(contentHeadingEl)
    subNavItemsContainerEl.appendChild(contentUlEl)
  }
  if (levelUpContentUlEl.children.length) {
    subNavItemsContainerEl.appendChild(levelUpContentHeadingEl)
    subNavItemsContainerEl.appendChild(levelUpContentUlEl)
  }
  pageEls.subNav.appendChild(subNavItemsContainerEl)
}

function buildSettings() {
  if (!courseConfig.isHeaderNavSettingsShown) return

  const subNavSettingsContainerEl = document.createElement("div")
  const settingsHeadingEl = createElWithAttrs("h2", subNavHeadingElAttrs)
  const settingsBtnContainerEl = createElWithAttrs(
    "div", settingsBtnContainerElAttrs
  )

  // Build sticky nav button
  if (
    courseConfig.isStickyNavAllowed && 
    courseConfig.isFixedNavAllowed &&
    courseConfig.isStickyNavSettingShown
  ) {
    pageEls.stickyNavButton = createElWithAttrs(
      "button", stickyNavButtonElAttrs
    )
    pageEls.stickyNavButton.textContent = "Disable sticky nav"
    settingsBtnContainerEl.appendChild(pageEls.stickyNavButton)
  }

  // Build dark mode button
  if(
    courseConfig.isDarkModeAllowed && 
    courseConfig.isLightModeAllowed &&
    courseConfig.isDarkModeSettingShown
  ) {
    pageEls.darkModeButton = createElWithAttrs("button", darkModeButtonElAttrs)
    pageEls.darkModeButton.textContent = "Enable dark mode"
    settingsBtnContainerEl.appendChild(pageEls.darkModeButton)
  }

  subNavSettingsContainerEl.appendChild(settingsHeadingEl)
  subNavSettingsContainerEl.appendChild(settingsBtnContainerEl)

  pageEls.subNav.appendChild(subNavSettingsContainerEl)
}

function createElWithAttrs(elName, attrs) {
  const el = document.createElement(elName)
  attrs.forEach(attr => el.setAttribute(attr[0], attr[1]));
  return el
}

function createSvgWithAttrs(elName, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", elName)
  attrs.forEach(attr => el.setAttribute(attr[0], attr[1]));
  return el
}

export {
  pageEls,
  config
}

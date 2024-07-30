import { config, userCourseConfig as courseConfig } from "./config.js"

/* ------------------------------- Constants -------------------------------- */

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

// Get cached element references

const mainContainerEl = document.getElementById("tc-main-container")

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
  ["d", "m1 1 12 12M1 13 13 1 1 13Z"],
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

const subNavHomeHeadingElAttrs = [
  ["class", "no-anchor p-0 my-2 h1"],
]

const subNavHeadingElAttrs = [
  ["class", "no-anchor"],
]

const subNavUlElAttrs = [
  ["class", "list-style-none pl-2 my-2 d-flex flex-column gap-2"],
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
  ["class", "my-3 d-flex gap-3 flex-wrap"],
]

const footerElAttrs = [
  ["id", "tc-footer"],
  ["class", "border-top"],
]

const footerItemsContainerElAttrs = [
  ["id", "tc-footer-items"],
  ["class", "container-lg px-3 d-flex flex-items-center flex-justify-between"],
]

const footerBackElAttrs = [
  ["id", "tc-footer-left"],
]

const footerNextElAttrs = [
  ["id", "tc-footer-right"],
]

const copyrightElAttrs = [
  ["id", "tc-footer-copyright"],
  ["class", "f6"],
]

// Do work:

// tktk figure out what to do when there is no config.

function buildPage() {
  if (!config) {
    document.getElementById("tc-header-temp").remove()
    console.log("No config file for this module is present.")
    return
  }
  buildHeader()
  buildFooter()
  getMinMainHeight()
}

buildPage()

/* --------------------------------- Header --------------------------------- */

function buildHeader() {
  if (!courseConfig.isHeaderShown) {
    document.getElementById("tc-header-temp").remove()
    return
  }
  pageEls.header = createElWithAttrs("header", headerElAttrs)
  buildNav()
  pageEls.subNavContainer = createElWithAttrs("div", subNavContainerElAttrs)
  pageEls.subNav = createElWithAttrs("nav", subNavElAttrs)
  buildSubNav()
  buildSettings()
  pageEls.subNavContainer.appendChild(pageEls.subNav)
  pageEls.header.appendChild(pageEls.subNavContainer)
  document.getElementById("tc-header-temp").remove()
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
    ["class", "no-underline"],
    [
      "href", 
      `/${config.org.name}/${config.repo.name}/canvas-landing-pages/${courseConfig.name}`
    ]
  ]

  const homeHeadingEl = createElWithAttrs("h2", subNavHomeHeadingElAttrs)

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
  levelUpContentHeadingEl.textContent = "Level Up content 🚀"

  const contentUlEl = createElWithAttrs("ul", subNavUlElAttrs)
  const levelUpContentUlEl = createElWithAttrs("ul", subNavUlElAttrs)

  const currentMlIdx = getMicrolessonIdx()

  courseConfig.microlessons.forEach((ml, idx) => {
    const liEl = document.createElement("li")

    // Create the base link
    const baseLinkHref = `/${config.org.name}/${config.repo.name}/${ml.dirName}`
    liEl.appendChild(createNavAnchorEl(
      idx, currentMlIdx, baseLinkHref, ml.friendlyName
    ))

    // If microlesson has a video attach a link to it
    if (ml.videoUrl) {
      const content = document.createTextNode(" - ")
      liEl.appendChild(content)
      liEl.appendChild(createNavAnchorEl(
        idx, currentMlIdx, ml.videoUrl, "video"
      ))
    }

    // Attach the microlesson to its location in the lesson
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

function createNavAnchorEl(idx, currentMlIdx, href, textContent) {
  // Create the base link
  const anchorElAttrs = [
    ["class", "f3 text-bold no-underline"],
    ["href", href]
  ]
  const anchorEl = createElWithAttrs("a", anchorElAttrs)
  if (!href.startsWith('/')) anchorEl.setAttribute("target", "_blank")
  anchorEl.textContent = textContent

  // apply styling
  if (idx < currentMlIdx) {
    anchorEl.classList.add("complete")
  } else if (idx === currentMlIdx) {
    anchorEl.classList.add("current")
  }

  return anchorEl
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

function buildFooter() {
  if (!courseConfig.isFooterShown) return

  const footerEl = createElWithAttrs("footer", footerElAttrs)
  const footerItemsContainerEl = createElWithAttrs(
    "nav", footerItemsContainerElAttrs
  )

  const currentMlIdx = getMicrolessonIdx()

  const backEl = createElWithAttrs("p", footerBackElAttrs)
  const copyrightEl = createElWithAttrs("p", copyrightElAttrs)
  const nextEl = createElWithAttrs("p", footerNextElAttrs)

  if (courseConfig.isFooterLessonNavShown && currentMlIdx > 0) {
    const prevMl = courseConfig.microlessons[currentMlIdx - 1]
    const backNavElAttrs = [
      ["class", "f4 text-bold no-underline"],
      ["href", `/${config.org.name}/${config.repo.name}/${prevMl.dirName}`]
    ]
    const backNavEl = createElWithAttrs("a", backNavElAttrs)
    backNavEl.textContent = `< ${prevMl.friendlyName}`
    backEl.appendChild(backNavEl)
  }

  if (courseConfig.isFooterCopyrightShown) {
    const currentYear = new Date().getFullYear()
    copyrightEl.textContent = `© ${currentYear} General Assembly`
  }

  if (
    courseConfig.isFooterLessonNavShown && 
    currentMlIdx > -1 &&
    currentMlIdx < courseConfig.microlessons.length - 1
  ) {
    const nextMl = courseConfig.microlessons[currentMlIdx + 1]
    const nextNavElAttrs = [
      ["class", "f4 text-bold no-underline"],
      ["href", `/${config.org.name}/${config.repo.name}/${nextMl.dirName}`]
    ]
    const nextNavEl = createElWithAttrs("a", nextNavElAttrs)
    nextNavEl.textContent = `${nextMl.friendlyName} >`
    nextEl.appendChild(nextNavEl)
  }

  footerItemsContainerEl.appendChild(backEl)
  footerItemsContainerEl.appendChild(copyrightEl)
  footerItemsContainerEl.appendChild(nextEl)

  footerEl.appendChild(footerItemsContainerEl)

  document.body.appendChild(footerEl)
}

function getMinMainHeight() {
  // We only need to put a min-height on the main if there is a footer
  if (!courseConfig.isFooterShown) return

  let minHeight
  
  if (courseConfig.isHeaderShown) {
    minHeight = `calc(100dvh - ${pageEls.header.clientHeight}px - 105px)`
  } else {
    minHeight = "calc(100dvh - 104px)"
  }

  mainContainerEl.style.gridTemplateRows = `minmax(${minHeight}, auto)`
}

/* -------------------------------- Helpers --------------------------------- */

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

function getMicrolessonIdx() {
  const currentMlDir = location.pathname.split("/")[3]

  return courseConfig.microlessons.findIndex(microlesson => {
    return microlesson.dirName === currentMlDir
  })
}

export {
  pageEls,
  config
}

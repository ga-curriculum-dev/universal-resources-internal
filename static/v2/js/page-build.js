import { config, userCourseConfig as courseConfig } from "./config.min.js"

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
  darkModeButton: undefined,
}

// Create elements to use internally

const subNavItemsContainerEl = document.createElement("div")

// Get cached element references

const mainEl = document.querySelector("main")
const tempHeader = document.getElementById("tc-header-temp")

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

const subNavHomeHeadingElAttrs = [["class", "no-anchor p-0 mt-2 mb-3 h1"]]

const subNavHeadingElAttrs = [["class", "no-anchor"]]

const subNavUlElAttrs = [
  ["class", "list-style-none pl-3 mt-1 mb-3 d-flex flex-column gap-2"],
]

const stickyNavButtonElAttrs = [
  ["id", "tc-sticky-nav-button"],
  ["class", "border-1 rounded-1 border-emphasis px-3 py-2"],
]

const darkModeButtonElAttrs = [
  ["id", "tc-dark-mode-button"],
  ["class", "border-1 rounded-1 border-emphasis px-3 py-2"],
]

const settingsBtnContainerElAttrs = [
  ["class", "mt-4 mb-3 d-flex gap-3 flex-wrap"],
]

const footerElAttrs = [
  ["id", "tc-footer"],
  ["class", "border-top"],
]

const footerItemsContainerElAttrs = [
  ["id", "tc-footer-items"],
  ["class", "container-lg px-3 d-flex flex-items-center flex-justify-between"],
]

const footerBackElAttrs = [["id", "tc-footer-left"]]

const footerNextElAttrs = [["id", "tc-footer-right"]]

const legalContainerElAttrs = [
  ["id", "tc-footer-legal"],
  ["class", "f6 d-flex flex-column flex-items-center"],
]

const attributionsElAttrs = [
  ["href", "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/universal-resources/docs/v2/attributions.html"],
  ["target", "blank_"],
  ["class", "f7"],
]

const activityIconSvgAttrs = [
  ["xmlns", "http://www.w3.org/2000/svg"],
  ["fill", "none"],
  ["viewBox", "0 0 24 24"],
  ["stroke-width", "1.4"],
  ["stroke", "currentColor"],
  ["class", "activity-icon"],
  ["height", "50"],
  ["width", "50"],
]

const activityIconPathAttrs = [
  ["stroke-linecap", "round"],
  ["stroke-linejoin", "round"],
]

const clockIconSvgAttrs = [
  ["xmlns", "http://www.w3.org/2000/svg"],
  ["fill", "none"],
  ["viewBox", "0 0 24 24"],
  ["stroke-width", "1.5"],
  ["stroke", "currentColor"],
  ["class", "clock-icon"],
  ["height", "22"],
  ["width", "22"],
]

const clockIconPathAttrs = [
  ["stroke-linecap", "round"],
  ["stroke-linejoin", "round"],
  ["d", "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"],
]

// Do work:

function buildPage() {
  if (!config) {
    if (tempHeader) tempHeader.remove()
    console.log("No config file for this module is present.")
    return
  }
  buildHeader()
  buildFooter()
  getMinMainHeight()
  addActivityBanners()
  addTimedSections()
}

buildPage()

/* --------------------------------- Header --------------------------------- */

function buildHeader() {
  
  if (!courseConfig.isHeaderShown) {
    if (tempHeader) tempHeader.remove()
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
  if (tempHeader) {
    tempHeader.remove()
  }
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

  if (courseConfig.logoUrl) {
    const headerLogoElAttrs = [
      ["id", "tc-header-logo"],
      ["class", "ml-5"],
      ["src", courseConfig.logoUrl],
      ["height", "32"],
      ["alt", "logo"],
    ]
    const headerLogoEl = createElWithAttrs("img", headerLogoElAttrs)
    navEl.appendChild(headerLogoEl)
  }

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
      `/${config.org.name}/${config.repo.name}/canvas-landing-pages/${courseConfig.name}`,
    ],
  ]

  const homeHeadingEl = createElWithAttrs("h2", subNavHomeHeadingElAttrs)

  const homeHeadingLinkEl = createElWithAttrs("a", homeHeadingLinkElAttrs)
  homeHeadingLinkEl.textContent = config.repo.friendlyName
  homeHeadingEl.appendChild(homeHeadingLinkEl)
  subNavItemsContainerEl.appendChild(homeHeadingEl)
}

function buildMicrolessonLinks() {
  if (!courseConfig.isHeaderMicrolessonNavShown) return

  const contentHeadingEl = createElWithAttrs("h3", subNavHeadingElAttrs)
  contentHeadingEl.textContent = "Content"
  const levelUpContentHeadingEl = createElWithAttrs("h3", subNavHeadingElAttrs)
  levelUpContentHeadingEl.textContent = "Level Up content 🚀"

  const contentUlEl = createElWithAttrs("ul", subNavUlElAttrs)
  const levelUpContentUlEl = createElWithAttrs("ul", subNavUlElAttrs)

  const currentMlIdx = getMicrolessonIdx()

  courseConfig.microlessons.forEach((ml, idx) => {
    const liEl = document.createElement("li")
    liEl.setAttribute("class", "f4")

    // Create the base link
    const baseLinkHref = `/${config.org.name}/${config.repo.name}/${ml.dirName}/`
    liEl.appendChild(
      createNavAnchorEl(idx, currentMlIdx, baseLinkHref, ml.friendlyName)
    )

    // If microlesson has a video attach a link to it
    if (ml.videoUrl) {
      const content = document.createTextNode(" - ")
      liEl.appendChild(content)
      liEl.appendChild(
        createNavAnchorEl(idx, currentMlIdx, ml.videoUrl, "video")
      )
    }

    // Attach the microlesson to its location in the lesson
    if (ml.type === "Content") {
      contentUlEl.appendChild(liEl)
    } else if (ml.type === "Level Up content") {
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
    ["class", "f4 text-bold no-underline"],
    ["href", href],
  ]
  const anchorEl = createElWithAttrs("a", anchorElAttrs)
  if (!href.startsWith("/")) anchorEl.setAttribute("target", "_blank")
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
  const settingsBtnContainerEl = createElWithAttrs(
    "div",
    settingsBtnContainerElAttrs
  )

  // Build sticky nav button
  if (
    courseConfig.isStickyNavAllowed &&
    courseConfig.isFixedNavAllowed &&
    courseConfig.isStickyNavSettingShown
  ) {
    pageEls.stickyNavButton = createElWithAttrs(
      "button",
      stickyNavButtonElAttrs
    )
    pageEls.stickyNavButton.textContent = "Disable sticky nav"
    settingsBtnContainerEl.appendChild(pageEls.stickyNavButton)
  }

  // Build dark mode button
  if (
    courseConfig.isDarkModeAllowed &&
    courseConfig.isLightModeAllowed &&
    courseConfig.isDarkModeSettingShown
  ) {
    pageEls.darkModeButton = createElWithAttrs("button", darkModeButtonElAttrs)
    pageEls.darkModeButton.textContent = "Enable dark mode"
    settingsBtnContainerEl.appendChild(pageEls.darkModeButton)
  }

  subNavSettingsContainerEl.appendChild(settingsBtnContainerEl)

  pageEls.subNav.appendChild(subNavSettingsContainerEl)
}

/* --------------------------------- Footer --------------------------------- */

function buildFooter() {
  const footerEl = createElWithAttrs("footer", footerElAttrs)
  const footerItemsContainerEl = createElWithAttrs(
    "nav",
    footerItemsContainerElAttrs
  )

  const currentMlIdx = getMicrolessonIdx()

  const backEl = createElWithAttrs("p", footerBackElAttrs)
  const legalContainerEl = createElWithAttrs("div", legalContainerElAttrs)
  const nextEl = createElWithAttrs("p", footerNextElAttrs)

  if (courseConfig.isFooterLessonNavShown && currentMlIdx > 0) {
    const prevMl = courseConfig.microlessons[currentMlIdx - 1]
    const backNavLgElAttrs = [
      ["id", "tc-left-nav-lg"],
      ["class", "f4 text-bold no-underline"],
      ["href", `/${config.org.name}/${config.repo.name}/${prevMl.dirName}/`],
    ]
    const backNavLgEl = createElWithAttrs("a", backNavLgElAttrs)
    backNavLgEl.textContent = `< ${prevMl.friendlyName}`

    const backNavSmElAttrs = [
      ["id", "tc-left-nav-sm"],
      ["class", "f4 text-bold no-underline"],
      ["href", `/${config.org.name}/${config.repo.name}/${prevMl.dirName}/`],
    ]
    const backNavSmEl = createElWithAttrs("a", backNavSmElAttrs)
    backNavSmEl.textContent = "< Previous"

    backEl.appendChild(backNavLgEl)
    backEl.appendChild(backNavSmEl)
  }

  if (courseConfig.isFooterCopyrightShown) {
    const copyrightEl = document.createElement("p")
    const currentYear = new Date().getFullYear()
    copyrightEl.textContent = `© ${currentYear} General Assembly`
    legalContainerEl.appendChild(copyrightEl)
  }

  const attributionsEl = createElWithAttrs("a", attributionsElAttrs)
  attributionsEl.textContent = "Attributions"
  legalContainerEl.appendChild(attributionsEl)

  if (
    courseConfig.isFooterLessonNavShown &&
    currentMlIdx > -1 &&
    currentMlIdx < courseConfig.microlessons.length - 1
  ) {
    const nextMl = courseConfig.microlessons[currentMlIdx + 1]
    const nextNavElLgAttrs = [
      ["id", "tc-right-nav-lg"],
      ["class", "f4 text-bold no-underline"],
      ["href", `/${config.org.name}/${config.repo.name}/${nextMl.dirName}/`],
    ]
    const nextNavLgEl = createElWithAttrs("a", nextNavElLgAttrs)
    nextNavLgEl.textContent = `${nextMl.friendlyName} >`

    const nextNavElSmAttrs = [
      ["id", "tc-right-nav-sm"],
      ["class", "f4 text-bold no-underline"],
      ["href", `/${config.org.name}/${config.repo.name}/${nextMl.dirName}/`],
    ]
    const nextNavSmEl = createElWithAttrs("a", nextNavElSmAttrs)
    nextNavSmEl.textContent = "Next >"

    nextEl.appendChild(nextNavLgEl)
    nextEl.appendChild(nextNavSmEl)
  }

  footerItemsContainerEl.appendChild(backEl)
  footerItemsContainerEl.appendChild(legalContainerEl)
  footerItemsContainerEl.appendChild(nextEl)

  footerEl.appendChild(footerItemsContainerEl)

  document.body.appendChild(footerEl)
}

function getMinMainHeight() {
  if (!mainEl) return
  mainEl.style.minHeight = courseConfig.isHeaderShown
    ? "calc(100dvh - 90px - 64px)"
    : "calc(100dvh - 40px - 64px)"
}

/* ---------------------------- Activity Banners ---------------------------- */

function addActivityBanners() {
  const activityEls = document.querySelectorAll(".activity")

  activityEls.forEach((activityEl) => {
    const bannerEls = getBannerElements(activityEl)

    if (!bannerEls.ogTitleEl || !bannerEls.ogMinutesEl) return

    const builtBannerEls = buildBannerElements(bannerEls)
    const finalBannerEls = customizeBannerForActivity(builtBannerEls)

    placeBannerInDom(finalBannerEls)
  })
}

function getBannerElements(activityEl) {
  // build an object to make all of these elements easier to pass around
  const bannerEls = {}

  bannerEls.activityEl = activityEl

  // We need these old elements so we can remove them from the DOM later
  bannerEls.ogTitleEl = activityEl.querySelector(".title")
  bannerEls.ogMinutesEl = activityEl.querySelector(".minutes")

  // Cloning these elements so we can work with them and place them later
  bannerEls.titleEl = bannerEls.ogTitleEl?.cloneNode(true)

  return bannerEls
}

function buildBannerElements(bannerEls) {
  bannerEls.containerEl = document.createElement("div")
  bannerEls.containerEl.classList.add("container", "d-flex", "width-full")

  bannerEls.activityIconSvg = createSvgWithAttrs("svg", activityIconSvgAttrs)
  bannerEls.activityIconPath = createSvgWithAttrs("path", activityIconPathAttrs)

  bannerEls.textContainerEl = document.createElement("div")
  bannerEls.textContainerEl.classList.add("text-container")

  bannerEls.metaContainerEl = document.createElement("div")
  bannerEls.metaContainerEl.classList.add("meta")

  bannerEls.activityTypeTextEl = document.createElement("p")

  /*
    Check explicitly for false here - if this is not defined we still want to 
    create these elements
  */

  if (
    !(courseConfig.isActivityTimeShown === false) &&
    bannerEls.ogMinutesEl.textContent.replace(/\D/g, "")
  ) {
    bannerEls.timeContainerEl = document.createElement("div")
    bannerEls.timeContainerEl.classList.add("time")
    bannerEls.clockIconSvg = createSvgWithAttrs("svg", clockIconSvgAttrs)
    bannerEls.clockIconPath = createSvgWithAttrs("path", clockIconPathAttrs)
    bannerEls.timeTextEl = document.createElement("p")

    bannerEls.timeTextEl.textContent = getTimeDisplay(bannerEls.ogMinutesEl)
  }

  return bannerEls
}

function placeBannerInDom(bannerEls) {
  bannerEls.metaContainerEl.appendChild(bannerEls.activityTypeTextEl)

  if (
    !(courseConfig.isActivityTimeShown === false) &&
    bannerEls.ogMinutesEl.textContent.replace(/\D/g, "")
  ) {
    bannerEls.clockIconSvg.appendChild(bannerEls.clockIconPath)
    bannerEls.timeContainerEl.appendChild(bannerEls.clockIconSvg)
    bannerEls.timeContainerEl.appendChild(bannerEls.timeTextEl)
    bannerEls.metaContainerEl.appendChild(bannerEls.timeContainerEl)
  }

  bannerEls.textContainerEl.appendChild(bannerEls.metaContainerEl)
  bannerEls.textContainerEl.appendChild(bannerEls.titleEl)
  bannerEls.activityIconSvg.appendChild(bannerEls.activityIconPath)
  bannerEls.containerEl.appendChild(bannerEls.activityIconSvg)
  bannerEls.containerEl.appendChild(bannerEls.textContainerEl)
  bannerEls.ogTitleEl.remove()
  bannerEls.ogMinutesEl.remove()
  bannerEls.activityEl.appendChild(bannerEls.containerEl)
}

/* ----------------------------- Timed sections ----------------------------- */

function addTimedSections() {
  const timedSectionEls = document.querySelectorAll(".timed-section")

  timedSectionEls.forEach((timedSectionEl) => {
    const minutesEl = timedSectionEl.querySelector("span")

    /*
      Check explicitly for false here - if this is not defined we still want to 
      create these elements
    */
    if (
      courseConfig.isActivityTimeShown === false ||
      !minutesEl.textContent.replace(/\D/g, "")
    ) {
      minutesEl.remove()
      return
    }

    buildMinutesSpan(timedSectionEl)
  })
}

function buildMinutesSpan(timedSectionEl) {
  const minutesEl = timedSectionEl.querySelector("span")

  minutesEl.textContent = getTimeDisplay(minutesEl)

  const clockIconSvg = createSvgWithAttrs("svg", clockIconSvgAttrs)
  const clockIconPath = createSvgWithAttrs("path", clockIconPathAttrs)

  clockIconSvg.appendChild(clockIconPath)
  minutesEl.prepend(clockIconSvg)
}

/* -------------------------------- Helpers --------------------------------- */

function createElWithAttrs(elName, attrs) {
  const el = document.createElement(elName)
  attrs.forEach((attr) => el.setAttribute(attr[0], attr[1]))
  return el
}

function createSvgWithAttrs(elName, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", elName)
  attrs.forEach((attr) => el.setAttribute(attr[0], attr[1]))
  return el
}

function getMicrolessonIdx() {
  const currentMlDir = location.pathname.split("/")[3]

  return courseConfig.microlessons.findIndex((microlesson) => {
    return microlesson.dirName === currentMlDir
  })
}

function getTimeDisplay(timeEl) {
  const minsInt = timeEl.textContent.replace(/\D/g, "")

  if (minsInt > 60) {
    const hrs = Math.floor(minsInt / 60)
    const minsRmdr = minsInt - hrs * 60
    return `${hrs} hr ${minsRmdr} min`
  } else {
    return `${minsInt} min`
  }
}

function customizeBannerForActivity(bannerEls) {
  if (bannerEls.activityEl.classList.contains("solo-exercise")) {
    bannerEls.activityTypeTextEl.textContent = "Solo exercise"
    bannerEls.activityIconPath.setAttribute(
      "d",
      "M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z M4.867 19.125h.008v.008h-.008v-.008Z"
    )
  } else if (bannerEls.activityEl.classList.contains("partner-exercise")) {
    bannerEls.activityTypeTextEl.textContent = "Partner exercise"
    bannerEls.activityIconPath.setAttribute(
      "d",
      "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
    )
  } else if (bannerEls.activityEl.classList.contains("group-exercise")) {
    bannerEls.activityTypeTextEl.textContent = "Group exercise"
    bannerEls.activityIconPath.setAttribute(
      "d",
      "M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    )
  } else if (bannerEls.activityEl.classList.contains("discussion")) {
    bannerEls.activityTypeTextEl.textContent = "Discussion"
    bannerEls.activityIconPath.setAttribute(
      "d",
      "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
    )
  } else if (bannerEls.activityEl.classList.contains("guided-walkthrough")) {
    bannerEls.activityTypeTextEl.textContent = "Guided walkthrough"
    bannerEls.activityIconPath.setAttribute(
      "d",
      "M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
    )
  } else if (bannerEls.activityEl.classList.contains("knowledge-check")) {
    bannerEls.activityTypeTextEl.textContent = "Knowledge check"
    bannerEls.activityIconPath.setAttribute(
      "d",
      "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
    )
  } else if (bannerEls.activityEl.classList.contains("pair-programming")) {
    bannerEls.activityTypeTextEl.textContent = "Pair programming"
    bannerEls.activityIconPath.setAttribute(
      "d",
      "M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
    )
  } else if (bannerEls.activityEl.classList.contains("mob-programming")) {
    bannerEls.activityTypeTextEl.textContent = "Mob programming"
    bannerEls.activityIconPath.setAttribute(
      "d",
      "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
    )
  }
  return bannerEls
}

export { pageEls, config }

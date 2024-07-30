import { pageEls } from "./page-build.js"
import { config, userCourseConfig as courseConfig } from "./config.js"

/* ------------------------- HLJS code copy buttons ------------------------- */

/*
Adds copy buttons to all hljs code blocks. This code should execute first.
*/

hljs.addPlugin(new CopyButtonPlugin());

/* ----------------------- Cached element references ------------------------ */

const mainEl = document.querySelector("main")

/* --------------------------------- State ---------------------------------- */

let isSubNavVisible = false
let isAnimationInProgress = false
let stickyNavEnabled
let darkModeEnabled = "false"

/* ------------------------- Sub-nav functionality -------------------------- */

/*
The below functionality implements the slide-down sub-nav functionality to 
enable navigation between microlessons.
*/
if (courseConfig.isHeaderShown) {
  pageEls.navPanelButton.addEventListener('click', handleToggleSubNav)
  mainEl.addEventListener("click", handleInferredNavClose)
  document.body.addEventListener("keyup", handleInferredNavClose)
}

function handleToggleSubNav() {
  if (isAnimationInProgress) return
  if (isSubNavVisible) {
    hideNav()
  } else {
    showNav()
  }
}

function showNav() {
  isAnimationInProgress = true

  pageEls.subNav.classList.add("visible")
  pageEls.subNavContainer.classList.add("open")
  pageEls.subNavContainer.setAttribute("aria-hidden", "false")
  pageEls.navPanelButton.setAttribute("aria-expanded", "true")
  pageEls.navPanelButton.setAttribute("aria-label", "Close navigation")
  pageEls.hamburgerIcon.classList.remove("visible")
  pageEls.closeIcon.classList.add("visible")

  setTimeout(function() {
    isSubNavVisible = true
    isAnimationInProgress = false
  }, 351)
}

function hideNav() {
  isAnimationInProgress = true

  pageEls.navPanelButton.setAttribute("aria-expanded", "false")
  pageEls.navPanelButton.setAttribute("aria-label", "Open navigation")
  pageEls.closeIcon.classList.remove("visible")
  pageEls.hamburgerIcon.classList.add("visible")
  pageEls.subNavContainer.classList.remove("open")
  pageEls.subNavContainer.setAttribute("aria-hidden", "true")

  // wait until close animation is complete before hiding element
  setTimeout(function() {
    pageEls.subNav.classList.remove("visible")
    isSubNavVisible = false
    isAnimationInProgress = false
  }, 351)
}

function handleInferredNavClose(evt) {
  if (!isSubNavVisible) return
  if (evt.type === "click" || (evt.type === "keyup" && evt.key === "Escape")) {
    handleToggleSubNav()
  } 
}

/* ------------------------ Sticky nav functionality ------------------------ */

/*
Not all users may want to use the sticky nav functionality so we allow them to
toggle the functionality off and on, and persist that choice in localStorage.
We can also manipulate this setting in the course configuration.
*/
if (
  courseConfig.isHeaderShown && 
  courseConfig.isHeaderNavSettingsShown &&
  courseConfig.isStickyNavSettingShown &&
  courseConfig.isStickyNavAllowed &&
  courseConfig.isFixedNavAllowed
) {
  pageEls.stickyNavButton.addEventListener("click", handleToggleStickyNav)
}

function handleToggleStickyNav() {
  if (stickyNavEnabled) {
    localStorage.setItem("gaStickyNavEnabled", "false")
    stickyNavEnabled = false
  } else {
    localStorage.setItem("gaStickyNavEnabled", "true")
    stickyNavEnabled = true
  }
  renderStickyNavSetting()
}

function setInitialStickyNavState() {
  const userStickyNavPreference = localStorage.getItem("gaStickyNavEnabled")

  if (!courseConfig.isFixedNavAllowed) {
    stickyNavEnabled = true
  } else if (!courseConfig.isStickyNavAllowed) {
    stickyNavEnabled = false
  } else if (courseConfig.isStickyNavForcedDefault) {
    stickyNavEnabled = true
  } else if (courseConfig.isFixedNavForcedDefault) {
    stickyNavEnabled = false
  } else if (userStickyNavPreference) {
    stickyNavEnabled = convertLocalStorageBool(userStickyNavPreference)
  } else if (!isStickyNavDefault) {
    stickyNavEnabled = false
  } else {
    stickyNavEnabled = true
  }

  renderStickyNavSetting()
}

function renderStickyNavSetting() {
  if (stickyNavEnabled) {
    pageEls.header.classList.remove("no-stick")
  } else {
    pageEls.header.classList.add("no-stick")
  }
  renderStickyNavButton()
}

function renderStickyNavButton() {
  if (!(
    courseConfig.isHeaderNavSettingsShown &&
    courseConfig.isStickyNavSettingShown &&
    courseConfig.isStickyNavAllowed &&
    courseConfig.isFixedNavAllowed
  )) return
  if (stickyNavEnabled) {
    pageEls.stickyNavButton.textContent = "Disable sticky nav"
  } else {
    pageEls.stickyNavButton.textContent = "Enable sticky nav"
  }
}

// Call on load to ensure state is synced with user preference
if (courseConfig.isHeaderShown) {
  setInitialStickyNavState()
}

/* ------------------------ Dark mode functionality ------------------------- */

if (
  courseConfig.isHeaderShown &&
  courseConfig.isHeaderNavSettingsShown &&
  courseConfig.isDarkModeSettingShown &&
  courseConfig.isDarkModeAllowed &&
  courseConfig.isLightModeAllowed
) {
  pageEls.darkModeButton.addEventListener("click", handleToggleDarkMode)
}

function handleToggleDarkMode() {
  if (darkModeEnabled) {
    localStorage.setItem("gaDarkModeEnabled", "false")
    darkModeEnabled = false
  } else {
    localStorage.setItem("gaDarkModeEnabled", "true")
    darkModeEnabled = true
  }
  renderDarkModeSetting()
}

function setInitialDarkModeState() {
  /*
  Check to see if the user has manually toogled dark mode off/on *first* before
  detecting their OS preference. If a user has toggled dark mode off manually
  then we want to respect that preference above all else. When the user hasn't
  indicated a preference for dark mode, it will be disabled.
  */

  const userDarkModePreference = localStorage.getItem("gaDarkModeEnabled")

  console.log(courseConfig);
  if (!courseConfig.isDarkModeAllowed) {
    darkModeEnabled = false
  } else if (!courseConfig.isLightModeAllowed) {
    darkModeEnabled = true
  } else if (courseConfig.isLightModeForcedDefault) {
    darkModeEnabled = false
  } else if (courseConfig.isDarkModeForcedDefault) {
    darkModeEnabled = true
  } else if (userDarkModePreference) {
    darkModeEnabled = convertLocalStorageBool(userDarkModePreference)
  } else if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    darkModeEnabled = true
  } else if (!isLightModeDefault) {
    darkModeEnabled = true
  } else {
    darkModeEnabled = false
  }

  renderDarkModeSetting()
}

function renderDarkModeSetting() {
  console.log(darkModeEnabled);
  if (darkModeEnabled) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
  renderDarkModeButton()
}

function renderDarkModeButton() {
  if (!(
    courseConfig.isHeaderShown &&
    courseConfig.isHeaderNavSettingsShown &&
    courseConfig.isDarkModeSettingShown &&
    courseConfig.isLightModeAllowed &&
    courseConfig.isDarkModeAllowed
  )) return
  if (darkModeEnabled) {
    pageEls.darkModeButton.textContent = "Disable dark mode"
  } else {
    pageEls.darkModeButton.textContent = "Enable dark mode"
  }
}

setInitialDarkModeState()

/* ---------------------------  Helper functions  --------------------------- */

function convertLocalStorageBool(boolString) {
  if (boolString === "true") {
    return true
  } else if (boolString === "false") {
    return false
  } else {
    return undefined
  }
}

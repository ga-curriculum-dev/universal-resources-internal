import { pageEls } from "./page-build.js"
import { config, userCourseConfig as courseConfig } from "./config.js"

/* ----------------------- Cached element references ------------------------ */

const linkEls = document.querySelectorAll('a')
const paragraphEls = document.querySelectorAll('p')

const pageContent = document.querySelector(".markdown-body")

/* --------------------------------- State ---------------------------------- */

let isSubNavVisible = false
let isAnimationInProgress = false
let stickyNavEnabled = localStorage.getItem("gaStickyNavEnabled") ?? "true"
let darkModeEnabled = "false"

/* ------------------------------- Link setup ------------------------------- */

/*
This ensures that links work properly when they are clicked inside of iframes.
Some links (like MDN) will not be handled properly when clicked without this.
*/

linkEls.forEach(link => {
  const href = link.getAttribute("href")
  if (!href.startsWith('/')) link.setAttribute("target", "_blank")
})

/* ------------------------- Sub-nav functionality -------------------------- */

/*
The below functionality implements the slide-down sub-nav functionality to 
enable navigation between microlessons.
*/

pageEls.navPanelButton.addEventListener('click', handleToggleSubNav)
pageContent.addEventListener("click", handleInferredNavClose)
document.body.addEventListener("keyup", handleInferredNavClose)

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
*/

pageEls.stickyNavButton.addEventListener("click", handleToggleStickyNav)

function handleToggleStickyNav() {
  if (stickyNavEnabled === "true") {
    localStorage.setItem("gaStickyNavEnabled", "false")
    stickyNavEnabled = "false"
  } else {
    localStorage.setItem("gaStickyNavEnabled", "true")
    stickyNavEnabled = "true"
  }
  renderStickyNavSetting()
}

function renderStickyNavSetting() {
  if (stickyNavEnabled === "true") {
    pageEls.stickyNavButton.textContent = "Disable sticky nav"
    pageEls.header.classList.remove("no-stick")
  } else if (stickyNavEnabled === "false") {
    pageEls.stickyNavButton.textContent = "Enable sticky nav"
    pageEls.header.classList.add("no-stick")
  }
}

// Call on load to ensure state is synced with user preference
renderStickyNavSetting()

/* ------------------------ Dark mode functionality ------------------------- */

pageEls.darkModeButton.addEventListener("click", handleToggleDarkMode)

function handleToggleDarkMode() {
  if (darkModeEnabled === "true") {
    localStorage.setItem("gaDarkModeEnabled", "false")
    darkModeEnabled = "false"
  } else {
    localStorage.setItem("gaDarkModeEnabled", "true")
    darkModeEnabled = "true"
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

  if (localStorage.getItem("gaDarkModeEnabled")) {
    darkModeEnabled = localStorage.getItem("gaDarkModeEnabled")
  } else if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    darkModeEnabled = "true"
  }
}

function renderDarkModeSetting() {
  if (darkModeEnabled === "true") {
    pageEls.darkModeButton.textContent = "Disable dark mode"
    document.body.classList.add("dark")
  } else if (darkModeEnabled === "false") {
    pageEls.darkModeButton.textContent = "Enable dark mode"
    document.body.classList.remove("dark")
  }
}

setInitialDarkModeState()
renderDarkModeSetting()

/* ------------------------- Filepath functionality ------------------------- */

paragraphEls.forEach(function (pEl) {
  if (pEl.nextElementSibling?.nodeName !== "PRE") return
  if ( pEl.childNodes.length === 1 && pEl.childNodes[0]?.nodeName === "CODE" ) {
    pEl.classList.add("collapse")
    pEl.childNodes[0].classList.add("codeblock-filepath")
  }
})

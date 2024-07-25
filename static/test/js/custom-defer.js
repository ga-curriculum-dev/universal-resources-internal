/* ---------------------------- Code copy button ---------------------------- */

/*
Adds copy buttons to all hljs code blocks. Run this code before anything else.
*/

hljs.addPlugin(new CopyButtonPlugin());

/* ----------------------- Cached element references ------------------------ */

const linkEls = document.querySelectorAll('a')
const paragraphEls = document.querySelectorAll('p')

const pageContent = document.querySelector(".markdown-body")

/* 
Nav elements
*/ 
const headerEl = document.getElementById("tc-header")
const navPanelButtonEl = document.getElementById("tc-sub-nav-button")
const hamburgerIconEl = document.getElementById("tc-hamburger-icon")
const closeIconEl = document.getElementById("tc-close-icon")
const subNavEl = document.getElementById("tc-sub-nav")
const subNavContainerEl = document.getElementById("tc-sub-nav-container")
const stickyNavButtonEl = document.getElementById("tc-sticky-nav-button")
const darkModeButtonEl = document.getElementById("tc-dark-mode-button")

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

navPanelButtonEl.addEventListener('click', handleToggleSubNav)
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

  subNavEl.classList.add("visible")
  subNavContainerEl.classList.add("open")
  subNavContainerEl.setAttribute("aria-hidden", "false")
  navPanelButtonEl.setAttribute("aria-expanded", "true")
  navPanelButtonEl.setAttribute("aria-label", "Close navigation")
  hamburgerIconEl.classList.remove("visible")
  closeIconEl.classList.add("visible")

  setTimeout(function() {
    isSubNavVisible = true
    isAnimationInProgress = false
  }, 351)
}

function hideNav() {
  isAnimationInProgress = true

  navPanelButtonEl.setAttribute("aria-expanded", "false")
  navPanelButtonEl.setAttribute("aria-label", "Open navigation")
  closeIconEl.classList.remove("visible")
  hamburgerIconEl.classList.add("visible")
  subNavContainerEl.classList.remove("open")
  subNavContainerEl.setAttribute("aria-hidden", "true")

  // wait until close animation is complete before hiding element
  setTimeout(function() {
    subNavEl.classList.remove("visible")
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

stickyNavButtonEl.addEventListener("click", handleToggleStickyNav)

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
    stickyNavButtonEl.textContent = "Disable sticky nav"
    headerEl.classList.remove("no-stick")
  } else if (stickyNavEnabled === "false") {
    stickyNavButtonEl.textContent = "Enable sticky nav"
    headerEl.classList.add("no-stick")
  }
}

// Call on load to ensure state is synced with user preference
renderStickyNavSetting()

/* ------------------------ Dark mode functionality ------------------------- */

darkModeButtonEl.addEventListener("click", handleToggleDarkMode)

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
    darkModeButtonEl.textContent = "Disable dark mode"
    document.body.classList.add("dark")
  } else if (darkModeEnabled === "false") {
    darkModeButtonEl.textContent = "Enable dark mode"
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

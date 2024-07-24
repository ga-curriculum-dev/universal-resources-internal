/* ---------------------------- Code copy button ---------------------------- */

/*
Adds copy buttons to all hljs code blocks. Run this code before anything else.
*/

hljs.addPlugin(new CopyButtonPlugin());

/* ----------------------- Cached element references ------------------------ */

const links = document.querySelectorAll('a')

const pageContent = document.querySelector(".markdown-body")

/* 
Nav elements
Check to confirm the below elements exist before using them in code to account
for legacy modules without these elements to prevent errors.
*/ 
const navPanelToggle = document.getElementById("sub-nav-lesson-panel-toggle")
const subNav = document.getElementById("sub-nav-lesson-panel")
const subNavContainer = document.querySelector(".sub-nav-container")
const hamburgerIcon = document.querySelector(".nav-hamburger-icon")
const closeIcon = document.querySelector(".nav-close-icon")
const stickyNavToggle = document.getElementById("sticky-nav-toggle")
const headerElement = document.querySelector("header.header")

/* --------------------------------- State ---------------------------------- */

let subNavVisible = false
let animationInProgress = false
let stickyNavEnabled = localStorage.getItem("stickyNav") ?? "true"

/* ------------------------------- Link setup ------------------------------- */

/*
This ensures that links work properly when they are clicked inside of iframes.
Some links (like MDN) will not be handled properly when clicked without this.
*/

links.forEach(link => {
  const href = link.getAttribute("href")
  if (!href.startsWith('/')) link.setAttribute("target", "_blank")
})

/* ------------------------- Sub-nav functionality -------------------------- */

/*
The below functionality implements the slide-down sub-nav functionality to 
enable navigation between microlessons.
*/

/* 
Check to confirm the navPanelToggle element exists to account for legacy 
modules without nav functionality to prevent errors.
*/ 
if (navPanelToggle) {
  navPanelToggle.addEventListener('click', handleToggleSubNav)
  pageContent.addEventListener("click", handleInferredNavClose)
  document.body.addEventListener("keyup", handleInferredNavClose)
  stickyNavToggle.addEventListener("click", handleToggleStickyNav)
}

function handleToggleSubNav() {
  if (animationInProgress) return
  if (subNavVisible) {
    hideNav()
  } else {
    showNav()
  }
}

function showNav() {
  animationInProgress = true

  subNav.classList.add("visible")
  subNavContainer.classList.add("open")
  navPanelToggle.setAttribute("aria-expanded", "true")
  navPanelToggle.setAttribute("aria-label", "Close navigation")
  hamburgerIcon.classList.remove("visible")
  closeIcon.classList.add("visible")

  setTimeout(function() {
    subNavVisible = true
    animationInProgress = false
  }, 351)
}

function hideNav() {
  animationInProgress = true

  navPanelToggle.setAttribute("aria-expanded", "false")
  navPanelToggle.setAttribute("aria-label", "Open navigation")
  closeIcon.classList.remove("visible")
  hamburgerIcon.classList.add("visible")
  subNavContainer.classList.remove("open")

  // wait until close animation is complete before hiding element
  setTimeout(function() {
    subNav.classList.remove("visible")
    subNavVisible = false
    animationInProgress = false
  }, 351)
}

function handleInferredNavClose(evt) {
  if (!subNavVisible) return
  if (evt.type === "click" || (evt.type === "keyup" && evt.key === "Escape")) {
    handleToggleSubNav()
  } 
}

/* ------------------------ Sticky nav functionality ------------------------ */

/*
Not all users may want to use the sticky nav functionality so we allow them to
toggle the functionality off and on, and persist that choice in localStorage.
*/

stickyNavToggle.addEventListener("click", handleToggleStickyNav)

function handleToggleStickyNav() {
  if (stickyNavEnabled === "true") {
    localStorage.setItem("stickyNav", "false")
    stickyNavEnabled = "false"
  } else {
    localStorage.setItem("stickyNav", "true")
    stickyNavEnabled = "true"
  }
  renderStickyNavButton()
}

function renderStickyNavButton() {
  /* 
  Check to confirm the navPanelToggle element exists to account for legacy 
  modules without nav functionality to prevent errors.
  */ 
  if (!navPanelToggle) return
  if (stickyNavEnabled === "true") {
    stickyNavToggle.textContent = "Disable sticky nav"
    headerElement.classList.remove("no-stick")
  } else if (stickyNavEnabled === "false") {
    stickyNavToggle.textContent = "Enable sticky nav"
    headerElement.classList.add("no-stick")
  }
}

// Call on load to ensure state is synced with user preference
renderStickyNavButton()

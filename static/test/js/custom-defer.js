/* ---------------------------- Code copy button ---------------------------- */

/*
Adds copy buttons to all hljs code blocks. Run this code before anything else.
*/

hljs.addPlugin(new CopyButtonPlugin());

/* ----------------------- Cached element references ------------------------ */

const links = document.querySelectorAll('a')

const pageContent = document.querySelector(".markdown-body")

/* 
Check to confirm the below elements exist before using them in code to account
for legacy modules without these elements to prevent errors.
*/ 
const navPanelToggle = document.getElementById("sub-nav-lesson-panel-toggle")
const subNav = document.getElementById("sub-nav-lesson-panel")
const hamburgerIcon = document.querySelector(".nav-hamburger-icon")
const closeIcon = document.querySelector(".nav-close-icon")

/* --------------------------------- State ---------------------------------- */

let subNavVisible = false

/* ------------------------------- Link setup ------------------------------- */

/*
This ensures that links work properly when they are clicked inside of iframes.
Some links (like MDN) will not be handled properly when clicked without this.
*/

links.forEach(link => {
  const href = link.getAttribute("href")
  if (!href.startsWith('/')) link.setAttribute("target", "_blank")
})

/*
When navigating to a heading element on a page the heading text will be
obscured under the sticky nav by default. This code moves the page up 
slightly so that the header text it is no longer obscured when navigating
to these types of links. Call this on page load, and when new history is pushed.
*/

window.addEventListener("popstate", handleIdNav)

function handleIdNav() {
  const currentPage = window.location.pathname.split("/").pop()
  if (currentPage.includes("#")) window.scrollBy(0, -60)
}

handleIdNav()

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
}

function handleToggleSubNav() {
  if (subNavVisible) {
    hideNav()
  } else {
    showNav()
  }
}

function showNav() {
  subNav.classList.add("visible", "open")
  navPanelToggle.setAttribute("aria-expanded", "true")
  navPanelToggle.setAttribute("aria-label", "Close navigation")
  hamPanelToggleIcon.classList.remove("visible")
  closeIcon.classList.add("visible")
  subNavVisible = true
}

function hideNav() {
  navPanelToggle.setAttribute("aria-expanded", "false")
  navPanelToggle.setAttribute("aria-label", "Open navigation")
  closeIcon.classList.remove("visible")
  hamPanelToggleIcon.classList.add("visible")
  subNav.classList.remove("open")
  // wait until close animation is complete before hiding element
  setTimeout(function() {
    subNav.classList.remove("visible")
  }, 251)
  subNavVisible = false
}

function handleInferredNavClose(evt) {
  if (!subNavVisible) return
  if (evt.type === "click" || (evt.type === "keyup" && evt.key === "Escape")) {
    hideNav()
  } 
}

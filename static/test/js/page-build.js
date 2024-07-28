// Create elements for export

const pageElements = {}

const headerEl = document.createElement("header")
const navPanelButtonEl = document.createElement("button")
const hamburgerIconEl = document.createElement("svg")
const closeIconEl = document.createElement("svg")
const subNavContainerEl = document.createElement("div")
const subNavEl = document.createElement("nav")
const stickyNavButtonEl = document.createElement("button")
const darkModeButtonEl = document.createElement("button")

// Get config for export

const config = getConfig()

console.log(config);

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

const hamburgerIconElAttrs = [
  ["id", "tc-hamburger-icon"],
  ["class", "visible"],
  ["width", "30"],
  ["height", "30"],
  ["xmlns", "http://www.w3.org/2000/svg"],
  ["fill", "none"],
  ["viewBox", "0 0 18 14"],
]

const closeIconElAttrs = [
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

const stickyNavButtonElAttrs = [
  ["id", "tc-sticky-nav-button"],
  ["class", "border-0 px-3 py-2"],
]

const darkModeButtonElAttrs = [
  ["id", "tc-dark-mode-button"],
  ["class", "border-0 px-3 py-2"],
] 

async function getConfig() {
  const configLinkEl = document.getElementById("config-link-element")
  const configRes = await fetch(configLinkEl.getAttribute("href"))
  return await configRes.json()
}

function buildHeader() {
  setAttributes(headerEl, headerElAttrs)
  buildNav()
  buildSubNav()
}

buildHeader()

function buildNav() {
  const navEl = document.createElement("nav")

  setAttributes(navEl, navElAttrs)
  setAttributes(navPanelButtonEl, navPanelButtonElAttrs)
  setAttributes(hamburgerIconEl, hamburgerIconElAttrs)

  hamburgerIconEl.innerHTML = `
    <path 
      stroke="currentColor" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="2" 
      d="M1 13h7M1 1h16H1Zm0 6h16H1Z"
    ></path>
  `
  closeIconEl.innerHTML = `
    <path 
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2" 
      d="m1 1 12 12M1 13 13 1 1 13Z"
    ></path>
  `

  navPanelButtonEl.appendChild(hamburgerIconEl)
  navPanelButtonEl.appendChild(closeIconEl)
  navEl.appendChild(navPanelButtonEl)
  headerEl.appendChild(navEl)
}

function buildSubNav() {
  const subNavSettingsContainerEl = document.createElement("div")
  const settingsHeadingEl = document.createElement("h2")
  const settingsBtnContainerEl = document.createElement("div")

  settingsHeadingEl.classList.add("no-anchor")
  settingsBtnContainerEl.classList.add("my-3", "d-flex", "gap-3", "flex-wrap")

  setAttributes(subNavContainerEl, subNavContainerElAttrs)
  setAttributes(subNavEl, subNavElAttrs)
  setAttributes(stickyNavButtonEl, stickyNavButtonElAttrs)
  stickyNavButtonEl.textContent = "Disable sticky nav"
  setAttributes(darkModeButtonEl, darkModeButtonElAttrs)
  darkModeButtonEl.textContent = "Enable dark mode"

  settingsBtnContainerEl.appendChild(stickyNavButtonEl)
  settingsBtnContainerEl.appendChild(darkModeButtonEl)
  subNavSettingsContainerEl.appendChild(settingsHeadingEl)
  subNavSettingsContainerEl.appendChild(settingsBtnContainerEl)

  buildSubNavItems()
}

async function buildSubNavItems() {
  
}

function setAttributes(el, attrs) {
  attrs.forEach(attr => el.setAttribute(attr[0], attr[1]));
}

export {
  pageElements,
  config
}

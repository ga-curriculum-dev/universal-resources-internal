document.addEventListener('DOMContentLoaded', function (event) {
  addCodeBlockHighlighting()
  addHeroLogo()
  attachFilePathsToCodeBlocks()
  addMediumZoom()
  setLinkAttrs()
  addAnchors()
});

function addCodeBlockHighlighting() {
  /*
  Adds copy buttons to all hljs code blocks. This code should execute first.
  */
  hljs.addPlugin(new CopyButtonPlugin());

  /*
  Adds code highlighting to all hljs code blocks.
  */
  hljs.highlightAll();
}

function addHeroLogo() {
  const h1El = document.querySelector("h1")
  if (!h1El) return

  const newH1El = h1El.cloneNode(true)
  const heroContainerEl = document.createElement("div")
  const heroLogoContainerEl = document.createElement("div")
  const logoImgEl = document.createElement("img")

  heroContainerEl.setAttribute("id", "hero")
  logoImgEl.setAttribute("alt", "Logo")
  logoImgEl.setAttribute("class", "no-zoom")
  logoImgEl.setAttribute(
    "src", 
    "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/universal-resources-internal/static/v2/assets/hero-logo.png"
  )

  heroLogoContainerEl.appendChild(logoImgEl)
  heroContainerEl.appendChild(heroLogoContainerEl)
  heroContainerEl.appendChild(newH1El)
  h1El.remove()
  document.querySelector("main").prepend(heroContainerEl)
}

function attachFilePathsToCodeBlocks() {
  /*
  Attaches a file path to a code block. Detects when an inline code block
  is the only node on a line that precedes a code block. When this is the case
  the text in the code block receives a special style and moves to be attached
  to the code block it is adjacent to.
  */

  const paragraphEls = document.querySelectorAll('p')

  paragraphEls.forEach(function (pEl) {
    if (pEl.nextElementSibling?.nodeName !== "PRE") return
    if ( pEl.childNodes.length === 1 && pEl.childNodes[0]?.nodeName === "CODE" ) {
      pEl.classList.add("collapse")
      pEl.childNodes[0].classList.add("codeblock-filepath")
    }
  })
}

function addMediumZoom() {
  // mediumZoom function is in in medium-zoom.js
  mediumZoom(document.querySelectorAll("main img:not(.no-zoom)"), {
    margin: 24,
    background: null,
  })
}

function setLinkAttrs() {
  /*
  This ensures that links work properly when they are clicked inside of iframes.
  Some links (like MDN) will not be handled properly when clicked without this.
  */

  const linkEls = document.querySelectorAll('a')

  linkEls.forEach(link => {
    const href = link.getAttribute("href")
    if (!href.startsWith('/')) link.setAttribute("target", "_blank")
  })
}

function addAnchors() {
  /*
  Add anchor links to all h2, h3, h4, and h5 elements excluding those with
  the no-anchor class
  */
  anchors.add(
    'h2:not(.no-anchor), h3:not(.no-anchor), h4:not(.no-anchor), h5:not(.no-anchor)'
  );
}

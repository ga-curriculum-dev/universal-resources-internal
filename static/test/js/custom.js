document.addEventListener('DOMContentLoaded', function (event) {
  /*
  Add anchor links to all h2, h3, h4, and h5 elements excluding those with
  the no-anchor class
  */
  anchors.add(
    'h2:not(.no-anchor), h3:not(.no-anchor), h4:not(.no-anchor), h5:not(.no-anchor)'
  );

  /* --------------------- hljs code block highlighting --------------------- */

  /*
  Adds code highlighting to all hljs code blocks.
  */


  hljs.highlightAll();

  /* ------------------------ hljs code copy button ------------------------- */

  /*
  Adds copy buttons to all hljs code blocks.
  */

  hljs.addPlugin(new CopyButtonPlugin());
});

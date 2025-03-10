// This is the button that allows students to run tests in CodePens that are embedded in pre-work exercises.
// Do not modify this file.
// If you need to make changes, please reach out to the Curriculum team.

const testToggleButton = document.createElement('button');
testToggleButton.innerText = 'View Test Results';
testToggleButton.id = 'test-results-toggle';
testToggleButton.classList.add('test-button');
testToggleButton.style.position = 'fixed';
testToggleButton.style.bottom = '5px';
testToggleButton.style.right = '5px';
testToggleButton.style.height = '3em';
testToggleButton.style['border-radius'] = '5px';
testToggleButton.style['background-color'] = '#e41a23';
testToggleButton.style.color = 'white';
testToggleButton.style['font-family'] = 'Circular,Helvetica,Arial,sans-serif';
testToggleButton.style.border = 'none';
document.body.prepend(testToggleButton);

let testResultsShowing = false;
const testResultsToggle = document.getElementById('test-results-toggle');

// Updated event listener with DOM update hack
testResultsToggle.addEventListener('click', (e) => {
  const jasmineWindow = document.getElementsByClassName(
    'jasmine_html-reporter'
  )[0];

  if (testResultsShowing) {
    jasmineWindow.style.display = 'none';
    e.target.innerText = 'View Test Results';
  } else {
    jasmineWindow.style.display = 'block';
    e.target.innerText = 'Hide Test Results';

    // Force a small, invisible DOM update to trigger a re-render
    const refreshSpan = document.createElement('span');
    refreshSpan.style.display = 'none'; // Keep it hidden
    refreshSpan.setAttribute('data-refresh', Date.now()); // Unique value to force reflow
    document.body.appendChild(refreshSpan);

    setTimeout(() => {
      document.body.removeChild(refreshSpan);
    }, 50);
  }

  testResultsShowing = !testResultsShowing;
});

// Function to wait for an element to be added to the DOM
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

waitForElm('.jasmine_html-reporter').then((el) => {
  el.style.display = 'none';
});

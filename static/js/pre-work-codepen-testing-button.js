// This is the button that allows students to run tests in CodePens that are embedded in pre-work exercises.
// Do not modify this file.
// If you need to make changes, please reach out to the Curriculum team.

// Create the "View Test Results" button
const testToggleButton = document.createElement('button');
testToggleButton.innerText = 'View Test Results';
testToggleButton.id = 'test-results-toggle';
testToggleButton.classList.add('test-button');

// Apply basic styles
Object.assign(testToggleButton.style, {
  position: 'fixed',
  bottom: '5px',
  right: '5px',
  height: '3em',
  borderRadius: '5px',
  backgroundColor: '#e41a23',
  color: 'white',
  fontFamily: 'Circular, Helvetica, Arial, sans-serif',
  border: 'none'
});

document.body.prepend(testToggleButton);

let testResultsShowing = false;

// Toggle visibility of the Jasmine test results
testToggleButton.addEventListener('click', () => {
  const jasmineWindow = document.querySelector('.jasmine_html-reporter');

  if (jasmineWindow) {
    testResultsShowing = !testResultsShowing;
    jasmineWindow.style.display = testResultsShowing ? 'block' : 'none';
    testToggleButton.innerText = testResultsShowing ? 'Hide Test Results' : 'View Test Results';
  }

  if (typeof loadCssTest === 'function') {
    loadCssTest();
  }
});

// Hide Jasmine test results initially
document.addEventListener('DOMContentLoaded', () => {
  const jasmineWindow = document.querySelector('.jasmine_html-reporter');
  if (jasmineWindow) jasmineWindow.style.display = 'none';
});

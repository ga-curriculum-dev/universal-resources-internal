/* ------------------------ Dark mode functionality ------------------------- */

/*
  Make a best-effort guess on this as soon as possible. Pulling in a config
  may change this later, but the faster we are executing this code the less
  visual pop-in we have.
*/

let darkModeEnabled

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
    document.documentElement.classList.add("dark")
  } else if (darkModeEnabled === "false") {
    document.documentElement.classList.remove("dark")
  }
}

setInitialDarkModeState()
renderDarkModeSetting()
// Get config for export
const config = await getConfig()

// Use userCourse to find course details in config
const userCourseConfig = getUserCourseConfig()

async function getConfig() {
  try {
    const configLinkEl = document.getElementById("prefetch-config-link-element")
    const configRes = await fetch(configLinkEl.getAttribute("href"))
    return await configRes.json()
  } catch (error) {
    return undefined
  }
}

function getUserCourseConfig() {
  // If there is no config we can't get the user course config
  if (!config) return

  const userCourse = getUserCourse()

  const userCourseConfig = config.courses.find(course => {
    return course.name === userCourse
  })
  // If there is no match for the user course, use the fallback course config
  const fallbackCourseConfig = config.courses.find(course => {
    return course.name === "fallback"
  })

  // Note that if there is no config for the user's course OR for the
  // fallback course this may return undefined.
  return userCourseConfig ? userCourseConfig : fallbackCourseConfig
}

function getUserCourse() {
  const localStorageCourse = localStorage.getItem("userCourse")

  // Get the user course and if found set it in localstorage
  if (window.location.pathname.includes("canvas-landing-pages")) {
    const course = window.location.pathname.split("/").pop()
    localStorage.setItem("userCourse", course)
    return course

  // Get the user course from localstorage
  } else if (localStorageCourse) {
    return localStorageCourse
  
  // We can't determine the user's course - use the fallback
  } else {
    return "fallback"
  }
}

export { config, userCourseConfig }

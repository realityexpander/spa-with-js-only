const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("Viewing Dashboard")},
    { path: "/posts", view: () => console.log("Viewing posts")},
    { path: "/settings", view: () => console.log("Viewing settings")}
  ]

  const potentialMatches = routes.map( route=> {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

  // 404 route
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    }
  }

  console.log(match?.route?.view())
}

window.addEventListener("popstate", router )

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault()
      navigateTo(e.target.href)
    }
  })
  router();
})
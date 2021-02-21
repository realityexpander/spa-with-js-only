import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";

const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    // { path: "/settings", view: () => console.log("Viewing settings")}
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

  // Load the new view
  const view = new match.route.view();
  document.querySelector("#app").innerHTML = await view.getHtml();

}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault()
      navigateTo(e.target.href)
    }
  })
  router();
})
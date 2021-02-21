import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Post from "./views/Post.js";
import Settings from "./views/Settings.js";

const getParams = match => {
  return pathsToParams(match.result[0], match.path)
}

const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  const routes = [
    { path: "/",            view: Dashboard },
    { path: "/posts",       view: Posts },
    { path: "/post/:id",    view: Post },
    { path: "/settings",    view: Settings }
  ]
  
  // Find the route that matches the location path
  let match = routes.find( route => {
    return route.path.split("/")[1] === location.pathname.split("/")[1]
  })

  // 404 route
  if (!match) {
    match = routes[0] //  route for 404 is Dashboard.js
  }
  match.result = [location.pathname]

  // Load the new view
  // console.log("getParams=" + JSON.stringify(getParams(match)) )
  const view = new match.view(getParams(match));

  // Apply the view to the DOM
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

// Converts query="/posts/2/4/..." , path="/posts/:id/:xxx/..." -> {"id":2, "xxx":4, ... }
function pathsToParams(query, path) {
  let keys = path.split("/").slice(2).map( e => e.split(":")[1] )
  let values = query.split("/").slice(2)
  return Object.fromEntries( keys.map( (key,i) => [key, values[i]] ) )
}
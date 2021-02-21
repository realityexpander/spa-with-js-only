import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Post from "./views/Post.js";
import Settings from "./views/Settings.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"); // match the first "/", get the id

const getParams = match => {

  return pathsToParams(match.result[0], match.route.path)

  // const values = match.result.slice(1); // ["/posts/2/4/6","2","4","6"] -> [2,4,6]
  // const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]); // "posts/:id/:a/:b" -> ["id","a","b"]
  // return Object.fromEntries( keys.map((key, i) => [key, values[i]] )); // Converts array of k,v pairs to an object
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

  const potentialMatches = routes.map( route=> {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

  // 404 route
  if (!match) {
    match = {
      route: routes[0],  // Dashboard.js route is 404
      isMatch: true
    }
  }

  // Load the new view
  console.log("getParams=" + JSON.stringify(getParams(match)) )
  const view = new match.route.view(getParams(match));
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

function pathToId(path) {
  let id = path.split("/")[2] 
}

// Converts query="/posts/2/4/..." , path="/posts/:id/:xxx/..." -> {"id":2, "xxx":4, ... }
function pathsToParams(query, path) {
  let keys = path.split("/").slice(2).map( e => e.split(":")[1] )
  let values = query.split("/").slice(2)
  return Object.fromEntries( keys.map( (key,i) => [key, values[i]] ) )
}
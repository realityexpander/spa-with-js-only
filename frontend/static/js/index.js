import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Post from "./views/Post.js";
import Settings from "./views/Settings.js";

// const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"); // match the first "/", get the id

const getParams = match => {
  return pathsToParams(match.result[0], match.path)

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

  // // generate regex for each path
  // console.log(location.pathname)
  // const potentialMatches = routes.map( route=> {
  //   console.log(route.path, pathToRegex(route.path) , location.pathname.match(pathToRegex(route.path)))
  //   return {
  //     route: route,
  //     result: location.pathname.match(pathToRegex(route.path))
  //   }
  // })


  // // Create the list of potential matching routes
  console.log("location.pathname=" + location.pathname.split("/")[1])
  // let potentialMatches = routes.map( route => {
  //   console.log("route.path=" + route.path.split("/")[1])
  //   return { 
  //     route,
  //     result: location.pathname.split("/")[1] == route.path.split("/")[1]
  //   }
  // })
  
  // // Find the path that matches
  // let match = potentialMatches.find(potentialMatch => potentialMatch.result != null)

  let match = routes.find( route => {
    console.log("route.path='"+route.path.split("/")[1]+"', location.pathname="+location.pathname.split("/")[1])
    console.log(route.path.split("/")[1] === location.pathname.split("/")[1])
    return route.path.split("/")[1] === location.pathname.split("/")[1]
  })

  // 404 route
  if (!match) {
    match = {
      route: routes[0],  // Dashboard.js route is 404
      result: [location.pathname]
    }
  } else {
    console.log("match="+match.path)
    match.result = [location.pathname]
  }

  // Load the new view
  console.log("getParams=" + JSON.stringify(getParams(match)) )
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

function pathToId(path) {
  let id = path.split("/")[2] 
}

// Converts query="/posts/2/4/..." , path="/posts/:id/:xxx/..." -> {"id":2, "xxx":4, ... }
function pathsToParams(query, path) {
  let keys = path.split("/").slice(2).map( e => e.split(":")[1] )
  let values = query.split("/").slice(2)
  return Object.fromEntries( keys.map( (key,i) => [key, values[i]] ) )
}
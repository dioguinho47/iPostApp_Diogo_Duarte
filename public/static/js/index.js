import Homepage from "./myViews/Homepage.js";
import Posts from "./myViews/ViewPosts.js";
import Register from "./myViews/Register.js";

const applicationNavigation = myUrl => {
    history.pushState(null, null, myUrl);
    myRouter();
}

//Routes for my application
const myRouter = async function() {
    const myRoutes = [
        {path: "/", view: Homepage},
        {path: "/viewposts", view: Posts},
       {path: "/register&login", view: Register}
    ];

    const routePath = myRoutes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let Match = routePath.find(potentialMatch => potentialMatch.isMatch);

    if (!Match) {
        Match = {
            route: myRoutes[404],
            isMatch: true
        };
    }

    const myView = new Match.route.view();

    //Content for each route will be stored in the 'id = myApp' div container
    document.querySelector("#ApplicationContent").innerHTML = await myView.getHtml();
};

window.addEventListener("popstate", myRouter);

document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", function(evt) {
        if (evt.target.matches("[data-link]")){
            evt.preventDefault();
            applicationNavigation(evt.target.href);
        }
    })  
    myRouter();
});

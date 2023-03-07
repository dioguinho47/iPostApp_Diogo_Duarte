import Homepage from "./myViews/Homepage.js";
import Posts from "./myViews/ViewPosts.js";
import Login from "./myViews/Login.js";


const myNavigation = url => {
    history.pushState(null, null, url);
    myRouter();
}

const myRouter = async function() {
    const myRoutes = [
        { path: "/", view: Homepage },
        { path: "/viewposts", view: Posts },
       { path: "/login", view: Login },
    ];

    const potentialMatches = myRoutes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let aMatch = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!aMatch) {
        aMatch = {
            route: myRoutes[0],
            isMatch: true
        };
    }

    const myView = new aMatch.route.view();

    document.querySelector("#app").innerHTML = await myView.getHtml();
};

window.addEventListener("popstate", myRouter);

document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", function(evt) {
        if (evt.target.matches("[data-link]")){
            evt.preventDefault();
            myNavigation(evt.target.href);
        }
    })  
    myRouter();
});

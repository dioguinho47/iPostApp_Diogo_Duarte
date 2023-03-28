import Homepage from "./myViews/Homepage.js";
import Posts from "./myViews/ViewPosts.js";
import Register from "./myViews/Register.js";
import Login from "./myViews/Login.js"
import translation  from './Translation/translation.js';

//Translation in my application
let definedLanguage = "en";
let myTranslations = translation[definedLanguage];

const translateBtn = document.getElementById("translateBtn");

translateBtn.addEventListener("click", function(evt){

    translateLang();

});

function translateLang(){
    if (definedLanguage === "en"){
        definedLanguage = "pt"
    } else {
        definedLanguage = "en"
    }

    myTranslations = translation[definedLanguage];
    translatedInterface();
}

function translatedInterface(){
    const interfaceElements = document.querySelectorAll("[data-translate]");

    for (const myElement of interfaceElements) {
        const translationKey = myElement.getAttribute("data-translate")
        myElement.innerText = myTranslations[translationKey];
    }
}

//Application navigation
export const applicationNavigation = myUrl => {
    history.pushState(null, null, myUrl);
    myRouter();
}

let currentView = null;

//Routes for my application
const myRouter = async function() {
    const myRoutes = [
        {path: "/", view: Homepage},
        {path: "/viewposts", view: Posts},
       {path: "/register", view: Register},
       {path: "/login", view: Login}
    ];

    const routePath = myRoutes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let Match = routePath.find(potentialMatch => potentialMatch.isMatch);

    if (!Match) {
       myRoutes(404);
    }

    const myView = new Match.route.view();

    //Content for each route will be stored in the 'id = ApplicationContent' div container
    const container = document.querySelector("#ApplicationContent");
    if (currentView !== null) {
        await currentView.onEnd(container);
    }
    container.innerHTML = await myView.getHtml();
    currentView = myView;
    await myView.onBegin(container);
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

translatedInterface();
import MainView from "./MainView.js";
import { get_authorization_header } from "../authorization.js";

export default class extends MainView {
    constructor(){
        super();
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="wrapper">
            <div class="post-box">
                <div class="post-area">
                    <div class="input editable" contenteditable="true" spellcheck="false" id="messageDiv">Type your post here...</div>
                </div>
                
            </div>
            <div class="bottom">
                <ul class="icons">
                    <li id="heart"><i class="fa-regular fa-heart"></i></li>
                    <li id="smileyFace"><i class="fa-regular fa-face-smile"></i></li>
                </ul>
                <div class="content">
                    <button id="postBtn">Post</button>           
                </div>
            </div>
        </div>
        <div class="info-Container"> 
        </div>
        <div id="postedSucess"> </div>
        `;
    }

    async onBegin(container) {
        //Does nothing by default
        let postBtn = container.querySelector("#postBtn");
        let messageDiv = container.querySelector("#messageDiv");
        let smileyFace = container.querySelector("#smileyFace");
        let heart = container.querySelector("#heart");
        let postedSucess = container.querySelector("#postedSucess");

        postBtn.addEventListener("click", async function(evt){

            let currentPostText = messageDiv.innerText;

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": get_authorization_header()
                },
                body: JSON.stringify({
                  message: currentPostText
                })
            });
            if (res.ok) {
                postedSucess.innerText = "Your post has been posted! Check View your Posts";
            } else {
                postedSucess.innerText = "You need to have an account and be logged in to be able to share posts!";
            }
        });

        smileyFace.addEventListener("click", async function(evt){
            
            messageDiv.innerText = "😁";

        });

        heart.addEventListener("click", async function(evt){
            
            messageDiv.innerText = "❤️";

        });
    }
}
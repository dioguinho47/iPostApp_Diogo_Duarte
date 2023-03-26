import MainView from "./MainView.js";

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
                  "Authorization": "Bearer 1 super_password"
                },
                body: JSON.stringify({
                  message: currentPostText
                })
            });

            postedSucess.innerText = "You post has been posted! Check View your Posts";
        });

        smileyFace.addEventListener("click", async function(evt){
            
            messageDiv.innerText = "😁";

        });

        heart.addEventListener("click", async function(evt){
            
            messageDiv.innerText = "❤️";

        });
    }
}
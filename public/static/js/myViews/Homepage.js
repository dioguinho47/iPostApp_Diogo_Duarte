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
                    <span></span>
                    <div class="input editable" contenteditable="true" spellcheck="false" id="messageDiv">Type you post here</div>
                    <div class="input readonly" contenteditable="true" spellcheck="false"></div>
                </div>
                
            </div>
            <div class="bottom">
                <ul class="icons">
                    <li><i class="fa-regular fa-image"></i></li>
                    <li><i class="fa-regular fa-face-smile"></i></li>
                </ul>
                <div class="content">
                    <button id="postBtn">Post</button>           
                </div>
            </div>
        </div>
        `;
    }

    async onBegin(container) {
        //Does nothing by default
        let postBtn = container.querySelector("#postBtn");
        let messageDiv = container.querySelector("#messageDiv");

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

        });
    }


}
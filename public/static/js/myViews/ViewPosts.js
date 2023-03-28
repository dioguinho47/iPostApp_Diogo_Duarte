import MainView from "./MainView.js";
import { get_authorization_header } from "../authorization.js";

export default class extends MainView {
    constructor(){
        super();
        this.setTitle("ViewPosts");
    }

    async onBegin(container) {
        //Does nothing by default
    
        const res = await fetch("/api/posts", {
            method: "GET",
            headers: {
                "Authorization": get_authorization_header()
            }
        });

        let posts = await res.json();
        console.log(posts);

        for(let i = 0; i < posts.length; i++){

            let currentPost = posts[i];
            let div = document.createElement("div");
            let postView = new SinglePostView(currentPost, div);
            container.appendChild(div);

        }
    }
}

class SinglePostView {
    
    constructor(post, container){

        container.innerHTML = this.getHtml();
        this.postedMessage = container.querySelector("#postedMessage");
        this.postedMessage.innerText = post.postedmessage;
        this.usernameTxt = container.querySelector("#usernameTxt");
        this.usernameTxt.innerText = post.username;
        this.deleteBtn = container.querySelector("#deleteBtn");

        this.deleteBtn.addEventListener("click", async () => {

            const res = await fetch("/api/posts/" + post.messageid, {
                method: "DELETE",
                headers: {
                  "Authorization": get_authorization_header()
                }
            });

            if (res.ok) {
                container.parentElement.removeChild(container);
            } else {
                alert("You can´t delete a post shared by another user!");
            }

        });
    }

    getHtml() {
        return `
        <div class="wrapper2">
            <div class="post-box">
                <div class="post-area">
                    <h3 id="usernameTxt"></h3>
                    <h1 id="postedMessage"></h1>
                </div>
                <div class="privacy">
                    <i class="fa-sharp fa-solid fa-reply"></i>                
                    <span data-translate="replyTrslt">Reply</span>         
                </div>
            </div>
            <div class="bottom">
                <ul class="icons">
                    <li><i class="fa-regular fa-heart"></i></li>
                    <li><i class="fa-regular fa-face-smile"></i></li>
                    <li><i class="fa-regular fa-face-sad-tear"></i></li>
                </ul>
                <div class="content">
                    <button id="deleteBtn" data-translate="deleteTrslt">Delete</button>           
                </div>
            </div>
        </div>
        `;
    }
}
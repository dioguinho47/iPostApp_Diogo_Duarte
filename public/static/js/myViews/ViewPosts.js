import MainView from "./MainView.js";

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
              "Authorization": "Bearer 1 super_password"
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
        this.useridTxt = container.querySelector("#useridTxt");
        this.useridTxt.innerText = "USER ID " + " " + post.userid;
        
    }

    getHtml() {
        return `
        <div class="wrapper2">
            <div class="post-box">
                <div class="post-area">
                    <h3 id="useridTxt"></h3>
                    <h1 id="postedMessage"></h1>
                </div>
                <div class="privacy">
                    <i class="fa-sharp fa-solid fa-reply"></i>                
                    <span>Reply</span>         
                </div>
            </div>
            <div class="bottom">
                <ul class="icons">
                    <li><i class="fa-regular fa-heart"></i></li>
                    <li><i class="fa-regular fa-face-smile"></i></li>
                    <li><i class="fa-regular fa-face-sad-tear"></i></li>
                </ul>
            </div>
        </div>
        `;
    }
}
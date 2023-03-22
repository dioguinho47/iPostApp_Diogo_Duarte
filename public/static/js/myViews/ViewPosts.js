import MainView from "./MainView.js";

export default class extends MainView {
    constructor(){
        super();
        this.setTitle("ViewPosts");
    }

    async getHtml() {
        return `
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="wrapper2">
            <div class="post-box">
                <div class="post-area">
                    <h1>This is a post</h1>
                    <div class="input readonly" contenteditable="true" spellcheck="false"></div>
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
                <div class="content">
                    
                </div>

            </div>
        </div>
        `;
    }
}
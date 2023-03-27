import MainView from "./MainView.js";

export default class extends MainView {
    constructor(){
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
            <div class="login-container">
            <h1 id="logH1"> Login </h1>
                    <form id="LoginForm" action="/" method="post">
                        <div class="data2">
                            <label for="name" data-translate="userTrslt">Username: </label>
                            <input type="name" name="name" id="name2" />
                        </div>
                        <div class="data2">
                            <label for="password" data-translate="pwTrslt">Password: </label>
                            <input type="password" name="password" id="password2" />
                        </div>
                        <div class="logBtn">
                            <button type="submit" id="myloginBtn">Login</button>
                        </div>
                    </form>
            </div>

        `;
    }

}
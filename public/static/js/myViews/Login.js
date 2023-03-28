import MainView from "./MainView.js";
import { applicationNavigation } from "../index.js";
import { make_authorization } from "../authorization.js";

export default class extends MainView {
    constructor(){
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
            <div class="login-container">
            <h1 id="logH1"> Login </h1>
                    <div id="LoginForm">
                        <div class="data2">
                            <label for="name" data-translate="userTrslt">Username: </label>
                            <input type="name" name="name" id="loginInputUsername" </input>
                        </div>
                        <div class="data2">
                            <label for="password" data-translate="pwTrslt">Password: </label>
                            <input type="password" name="password" id="loginInputPassword" </input>
                        </div>
                        <div class="logBtn">
                            <button type="submit" id="submitBtn">Login</button>
                        </div>
                    </div>
            </div>
            <div id="loginError"> </div>
        `;
    }

    async onBegin(container) {

        let loginInputUsername = container.querySelector("#loginInputUsername");
        let loginInputPassword = container.querySelector("#loginInputPassword");
        let submitBtn = container.querySelector("#submitBtn");
        let loginError = container.querySelector("#loginError");

        submitBtn.addEventListener("click", async function() {

            const res = await fetch("/api/login/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: loginInputUsername.value,
                    password: loginInputPassword.value 
                })
            });

            console.log(res); 

            if (res.ok) {
                let successLogin = await res.json();
                let userid = successLogin.id; 
                let password = loginInputPassword.value;
                make_authorization(userid, password);
                applicationNavigation("/");
            } else {
                loginError.innerText = "The username or password are incorrect!"
            }
        });
    }
}
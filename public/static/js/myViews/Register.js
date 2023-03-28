import MainView from "./MainView.js";
import { applicationNavigation } from "../index.js";
import { make_authorization } from "../authorization.js";

export default class extends MainView {
    constructor(){
        super();
        this.setTitle("Register");
    }

    async getHtml() {
        return `
            <div class="registration-container">
                    <h1 id="regH1" data-translate="regTitle"> Don´t have an account? Register here </h1>
                    <div id="RegForm">
                        <div class="data">
                            <label for="name" data-translate="userTrslt">Username: </label>
                            <input type="text" name="name" id="regInpUsername" </input>
                        </div>
                        <div class="data">
                        <label for="name" data-translate="countryTxtTrslt">Country: </label>
                        <input type="text" name="country" id="regCountryInp" </input>
                        </div>
                        <div class="data">
                            <label for="password" data-translate="pwTrslt">Password: </label>
                            <input type="password" name="password" id="regInpPassword" </input>
                        </div>
                        <div class="regBtn">
                            <button type="submit" data-translate="regBtnTrslt" id="regBtn">Register</button>
                        </div>
                    </div>
            </div>
            <div class="redirectContainer">
            <h2 id="logH2" data-translate="loginTxtTrslt"> Already have an account? Login here </h2>
            <li><a href="/login" data-link id="loginRedirect"> Login </a></li>
            </div>
            <div id="registerError"> </div>
        `;
    }

    async onBegin(container) {

        let regBtn = container.querySelector("#regBtn");
        let regInpPassword = container.querySelector("#regInpPassword");
        let regInpUsername = container.querySelector("#regInpUsername");
        let regCountryInp = container.querySelector("#regCountryInp");
        let registerError = container.querySelector("#registerError");

        regBtn.addEventListener("click", async function (evt) {

            const res = await fetch("/api/register/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: regInpUsername.value,
                    country: regCountryInp.value,
                    password: regInpPassword.value
                })
            });

            if (res.ok) {
                let successRegister = await res.json();
                let userid = successRegister.id; 
                let country = regCountryInp.value;
                let password = regInpPassword.value;
                make_authorization(userid, password);
                applicationNavigation("/");
            } else {
                registerError.innerText = "Registration failed. The username you typed already exists!"
            }
        });
    }
}
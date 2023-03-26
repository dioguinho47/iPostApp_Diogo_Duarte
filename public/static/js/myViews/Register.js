import MainView from "./MainView.js";

export default class extends MainView {
    constructor(){
        super();
        this.setTitle("Register");
    }

    async getHtml() {
        return `
            <div class="registration-container">
                    <h1 id="regH1" data-translate="regTitle"> Don´t have an account? Register here </h1>
                    <form id="RegForm" action="#" method="post">
                        <div class="data">
                            <label for="name" data-translate="userTrslt">Username: </label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div class="data">
                            <label for="email">Email: </label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div class="data">
                            <label for="password" data-translate="pwTrslt">Password: </label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <div class="regBtn">
                            <button type="submit" data-translate="regBtnTrslt">Register</button>
                        </div>
                    </form>
            </div>
            <div id="redirectContainer">
            <h2 id="logH2" data-translate="loginTxtTrslt"> Already have an account? Login here </h2>
            <li><a href="/login" data-link id="loginRedirect"> Login </a></li>
            </div>
        `;
    }

    async onBegin(container) {
        //Does nothing by default
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user123,
                password: super_password
            })
        });
    }
}
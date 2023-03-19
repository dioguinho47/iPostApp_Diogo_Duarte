import GeneralView from "./GeneralView.js";

export default class extends GeneralView {
    constructor(){
        super();
        this.setTitle("Register&Login");
    }

    async getHtml() {
        return `
            <div class="registration-container">
                    <h1 id="regH1"> Don´t have an account? Register here </h1>
                    <form id="RegForm" action="#" method="post">
                        <div class="data">
                            <label for="name">Name: </label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div class="data">
                            <label for="email">Email: </label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div class="data">
                            <label for="password">Password: </label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <div class="regBtn">
                            <button type="submit">Register</button>
                        </div>
                    </form>
            </div>
            <div class="login-container">
                <h1 id="logH1"> Login </h1>
                    <form id="LoginForm" action="#" method="post">
                        <div class="data2">
                            <label for="email">Email: </label>
                            <input type="email" name="email" id="email2" />
                        </div>
                        <div class="data2">
                            <label for="password">Password: </label>
                            <input type="password" name="password" id="password2" />
                        </div>
                        <div class="logBtn">
                            <button type="submit">Login</button>
                        </div>
                    </form>
            </div>

        `;
    }
}
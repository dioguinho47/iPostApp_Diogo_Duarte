import GeneralView from "./GeneralView.js";

export default class extends GeneralView {
    constructor(){
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <h1> Login/Register </h1>
            <p> Text</p>
        `;
    }
}
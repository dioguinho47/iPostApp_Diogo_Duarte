import GeneralView from "./GeneralView.js";

export default class extends GeneralView {
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
        <h1> View your posts </h1>
        <p> Text </p>
        `;
    }
}
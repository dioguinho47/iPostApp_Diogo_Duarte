export default class {
    constructor() {

    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }
    
    async onBegin(container) {
        //Does nothing by default
    }
    async onEnd(container) {
        //Does nothing by default
    }
}

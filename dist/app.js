export default class TeamApp {
    constructor(rootElementSelector) {
        this.rootElement = document.querySelector(rootElementSelector);
    }
    init() {
        if (!this.rootElement)
            return console.error("Root element not found!");
        console.log("App is initialized");
    }
}

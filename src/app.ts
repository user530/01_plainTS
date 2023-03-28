export default class TeamApp{
    private rootElement : Element | null

    constructor(
        rootElementSelector: string
    ){
        this.rootElement = document.querySelector(rootElementSelector);
    }

    init()
    {
        if(!this.rootElement) 
            return console.error("Root element not found!");

        console.log("App is initialized")
    }
}
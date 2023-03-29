import { MediaLink, Player, Team } from "./types.js";
import { Teams, SocialMediaLinks } from "./consts.js";

export default abstract class AppUI{
    protected _rootElement : Element | null;
    protected _interfaceHTML : HTMLElement;
    protected _teams: Team [] = Teams;
    protected _footerLinks: MediaLink [] = SocialMediaLinks;

    constructor(rootElementSelector: string){
        // Interface wrapper
        this._interfaceHTML = document.createElement("section");
        this._interfaceHTML.setAttribute("id", "app-interface");
        this._interfaceHTML.classList.add("app-wrapper");

        // Root element
        this._rootElement = document.querySelector(rootElementSelector);
    }

    protected get root(): Element | null
    {
        return this._rootElement;
    }

    protected get interfaceHTML() : HTMLElement
    {
        return this._interfaceHTML;
    }

    protected get footerLinks() : MediaLink[]
    {
        return this._footerLinks;
    }

    protected get teams() : Team []
    {
        return this._teams;
    }

    protected abstract submitHandler(e: Event) : void 
    protected abstract deleteHandler(e: Event) : void
    protected abstract editHandler(e: Event) : void

    public renderInterface() : void
    {
        if(!this.root) throw new Error("Root element not found!");

        // Link app interface to the root
        this.root.appendChild(this.interfaceHTML);

        // Render interface
        this.renderHeader(this.interfaceHTML);
        this.renderMain(this.interfaceHTML, this.teams);
        this.renderFooter(this.interfaceHTML, this.footerLinks);
    }

    protected renderHeader(rootElement: HTMLElement) : void
    {
        const existing = rootElement.querySelector("#app-header");
        if(existing) return;
        
        const header = document.createElement("header");
        header.setAttribute("id", "app-header");
        header.classList.add("header-wrapper");

        const heading = document.createElement("h1");
        heading.innerText = "Team Manager";

        header.appendChild(heading);

        rootElement.insertAdjacentElement("afterbegin", header);
    }

    protected renderMain(rootElement: HTMLElement, teamsArr: Team[]) : void
    {
        const existing = rootElement.querySelector("#app-main");
        if(existing) return;

        const mainSection = document.createElement("section");
        mainSection.setAttribute("id", "app-main");
        mainSection.classList.add("main-wrapper");

        this.renderMainInput(mainSection, teamsArr);
        this.renderMainContent(mainSection, teamsArr);

        rootElement.appendChild(mainSection);
    }

    protected renderMainInput(rootElement: HTMLElement, teamsArr: Team[]) : void
    {
        const existing = rootElement.querySelector("#app-main-input");
        if(existing) return;

        const inputBlock = document.createElement("div");
        inputBlock.setAttribute("id", "app-main-input");
        inputBlock.classList.add("input-wrapper");

        // Form
        const form = document.createElement("form");
        form.classList.add("input-form");
        form.addEventListener("submit", this.submitHandler.bind(this));

        // Name Text Input
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("name", "name");
        nameInput.setAttribute("placeholder", "Name");
        nameInput.setAttribute("required", "true");

        // Team Select Input
        const teamInput = document.createElement("select");
        teamInput.setAttribute("name", "team");
        teamInput.setAttribute("required", "true");

        // Select options
        const teamOptions = teamsArr.map(singleTeam => {
            const option = document.createElement("option");
            option.setAttribute("id", singleTeam.id);
            option.label = singleTeam.label;
            option.value = singleTeam.value;

            return option;
        })

        teamInput.append(...teamOptions);

        // Submit btn
        const submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "submit");
        submitBtn.value = "Add player";

        // Populate form
        form.append(nameInput, teamInput, submitBtn);

        // Populate Input Block
        inputBlock.appendChild(form);

        // Populate root element 
        rootElement.appendChild(inputBlock);
    }

    protected renderMainContent(rootElement: HTMLElement, teamsArr: Team[]) : void
    {
        const existing = rootElement.querySelector("#app-main-content");
        if(existing) return;

        // Content wrapper
        const contentBlock = document.createElement("div");
        contentBlock.setAttribute("id", "app-main-content");
        contentBlock.classList.add("content-wrapper");

        // Render teams
        const teamsContent = teamsArr.map((teamObj: Team)=>{
            const teamContainer = document.createElement("div");
            teamContainer.classList.add("team-wrapper");

            const teamHeading = document.createElement("h3");
            teamHeading.classList.add("team-heading");
            teamHeading.innerHTML = teamObj.label

            const teamList = document.createElement("ul");
            teamList.setAttribute("id", `team-${teamObj.id}`);

            return teamContainer;
        });

        // Append team containers
        contentBlock.append(...teamsContent);

        // Populate root element 
        rootElement.appendChild(contentBlock);
    }

    protected renderFooter(rootElement: HTMLElement, mediaLinks: MediaLink[])
    {
        const existing = rootElement.querySelector("#app-footer");
        if(existing) return;

        const footer = document.createElement("footer");
        footer.setAttribute("id", "app-footer");
        footer.classList.add("footer-wrapper");

        const mediaBlock = document.createElement("div");
        mediaBlock.classList.add("media-wraper");

        const links = mediaLinks.map((linkObj: MediaLink)=>{
            const img = document.createElement("img");
            img.setAttribute("src", linkObj.iconURI);
            img.setAttribute("alt", linkObj.label);
            img.classList.add("media-icon");

            const link = document.createElement("a");
            link.setAttribute("href", linkObj.link)
            link.setAttribute("aria-label", linkObj.label)
            link.appendChild(img);

            return link;
        })

        mediaBlock.append(...links);

        footer.appendChild(mediaBlock);

        rootElement.insertAdjacentElement("beforeend", footer);
    }

    protected renderAddPlayer(){}
    protected renderDelPlayer(){}
    protected renderUpdatePlayer(){}
}

import { Teams, SocialMediaLinks, delImgURL } from "./consts.js";
export default class AppUI {
    constructor(rootElementSelector) {
        this._teams = Teams;
        this._footerLinks = SocialMediaLinks;
        // Interface wrapper
        this._interfaceHTML = document.createElement("section");
        this._interfaceHTML.setAttribute("id", "app-interface");
        this._interfaceHTML.classList.add("app-wrapper");
        // Root element
        this._rootElement = document.querySelector(rootElementSelector);
    }
    get root() {
        return this._rootElement;
    }
    get interfaceHTML() {
        return this._interfaceHTML;
    }
    get footerLinks() {
        return this._footerLinks;
    }
    get teams() {
        return this._teams;
    }
    renderInterface() {
        if (!this.root)
            throw new Error("Root element not found!");
        // Link app interface to the root
        this.root.appendChild(this.interfaceHTML);
        // Render interface
        this.renderHeader(this.interfaceHTML);
        this.renderMain(this.interfaceHTML, this.teams);
        this.renderFooter(this.interfaceHTML, this.footerLinks);
    }
    renderHeader(rootElement) {
        const existing = rootElement.querySelector("#app-header");
        if (existing)
            return;
        const header = document.createElement("header");
        header.setAttribute("id", "app-header");
        header.classList.add("header-wrapper");
        const heading = document.createElement("h1");
        heading.innerText = "Team Manager";
        header.appendChild(heading);
        rootElement.insertAdjacentElement("afterbegin", header);
    }
    renderMain(rootElement, teamsArr) {
        const existing = rootElement.querySelector("#app-main");
        if (existing)
            return;
        const mainSection = document.createElement("section");
        mainSection.setAttribute("id", "app-main");
        mainSection.classList.add("main-wrapper");
        this.renderMainInput(mainSection, teamsArr);
        this.renderMainContent(mainSection, teamsArr);
        rootElement.appendChild(mainSection);
    }
    renderMainInput(rootElement, teamsArr) {
        const existing = rootElement.querySelector("#app-main-input");
        if (existing)
            return;
        const inputBlock = document.createElement("div");
        inputBlock.setAttribute("id", "app-main-input");
        inputBlock.classList.add("input-wrapper");
        // Heading
        const heading = document.createElement("h2");
        heading.classList.add("input-heading");
        heading.innerText = "Add new player";
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
        });
        teamInput.append(...teamOptions);
        // Submit btn
        const submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "submit");
        submitBtn.value = "Add player";
        // Populate form
        form.append(nameInput, teamInput, submitBtn);
        // Populate Input Block
        inputBlock.append(heading, form);
        // Populate root element 
        rootElement.appendChild(inputBlock);
    }
    renderMainContent(rootElement, teamsArr) {
        const existing = rootElement.querySelector("#app-main-content");
        if (existing)
            return;
        // Content wrapper
        const contentBlock = document.createElement("div");
        contentBlock.setAttribute("id", "app-main-content");
        contentBlock.classList.add("content-wrapper");
        // Render teams
        const teamsContent = teamsArr.map((teamObj) => {
            const teamContainer = document.createElement("div");
            teamContainer.classList.add("team-wrapper");
            const teamHeading = document.createElement("h3");
            teamHeading.classList.add("team-heading");
            teamHeading.innerHTML = teamObj.label;
            const teamList = document.createElement("ul");
            teamList.setAttribute("id", `team-${teamObj.id}`);
            teamList.classList.add("team-list");
            teamContainer.append(teamHeading, teamList);
            return teamContainer;
        });
        // Append team containers
        contentBlock.append(...teamsContent);
        // Populate root element 
        rootElement.appendChild(contentBlock);
    }
    renderFooter(rootElement, mediaLinks) {
        const existing = rootElement.querySelector("#app-footer");
        if (existing)
            return;
        const footer = document.createElement("footer");
        footer.setAttribute("id", "app-footer");
        footer.classList.add("footer-wrapper");
        const mediaBlock = document.createElement("div");
        mediaBlock.classList.add("media-wrapper");
        const links = mediaLinks.map((linkObj) => {
            const img = document.createElement("img");
            img.setAttribute("src", linkObj.iconURI);
            img.setAttribute("alt", linkObj.label);
            img.classList.add("media-icon");
            const link = document.createElement("a");
            link.setAttribute("href", linkObj.link);
            link.setAttribute("aria-label", linkObj.label);
            link.appendChild(img);
            return link;
        });
        mediaBlock.append(...links);
        footer.appendChild(mediaBlock);
        rootElement.insertAdjacentElement("beforeend", footer);
    }
    renderAddPlayer(newPlayer) {
        const { id, name, team } = newPlayer;
        const teamList = this.findTeamList(team.id);
        if (!teamList)
            return;
        const playerElement = document.createElement("li");
        playerElement.setAttribute("id", `player-${id}`);
        playerElement.classList.add("player-wrapper");
        // Player name span
        const nameElement = document.createElement("span");
        nameElement.classList.add("player-span");
        nameElement.innerText = name;
        // Delete player icon
        const delIcon = document.createElement("img");
        delIcon.setAttribute("src", delImgURL);
        delIcon.setAttribute("alt", "delete");
        delIcon.setAttribute("data-playerid", id);
        delIcon.classList.add("player-icon");
        delIcon.addEventListener("click", this.deleteHandler.bind(this));
        // Populate player element
        playerElement.append(nameElement, delIcon);
        // Add Player element to the appropriate team list
        teamList.appendChild(playerElement);
    }
    renderDelPlayer(playerId) {
        const playerElement = document.querySelector(`#player-${playerId}`);
        if (!playerElement)
            return;
        // Remove player item
        playerElement.remove();
    }
    findTeamList(teamId) {
        return document.querySelector(`ul#team-${teamId}`);
    }
}

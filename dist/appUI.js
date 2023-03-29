import { SocialMediaLinks, Teams } from "./consts.js";
export default class AppUI {
    constructor(sumbitHandler) {
        this.footerLinks = SocialMediaLinks;
        this.teams = Teams;
        // App section wrapper
        this.uiElement = document.createElement("div");
        this.uiElement.setAttribute("id", "ui-section");
        this.uiElement.classList.add("section-wrapper");
        // ===  Header section  ===
        const uiHeader = document.createElement("header");
        uiHeader.classList.add("section-header");
        const header = document.createElement("h1");
        header.innerText = "Team Manager";
        uiHeader.appendChild(header);
        // ===  Main section    ===
        const uiMain = document.createElement("section");
        // Input part
        const input = document.createElement("div");
        input.classList.add("input-wrapper");
        const form = document.createElement("form");
        form.classList.add("input-form");
        form.addEventListener("submit", sumbitHandler);
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("name", "name");
        nameInput.setAttribute("placeholder", "Name");
        nameInput.setAttribute("required", "true");
        const teamInput = document.createElement("select");
        teamInput.setAttribute("name", "team");
        teamInput.setAttribute("required", "true");
        const teamOptions = this.teams.map(singleTeam => {
            const option = document.createElement("option");
            option.setAttribute("id", singleTeam.id);
            option.label = singleTeam.label;
            option.value = singleTeam.value;
            return option;
        });
        teamInput.append(...teamOptions);
        const submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "submit");
        submitBtn.value = "Add player";
        form.append(nameInput, teamInput, submitBtn);
        input.appendChild(form);
        // Content part
        const content = document.createElement("div");
        content.classList.add("content-wrapper");
        uiMain.append(input, content);
        // ===  Footer section  ===
        const uiFooter = document.createElement("footer");
        uiFooter.classList.add("section-footer");
        const socialMedia = document.createElement("div");
        socialMedia.classList.add("media-wraper");
        const links = this.footerLinks.map(linkObj => {
            const icon = `<svg viewBox="0 0 14 16" width="50">
            <use xlink:href="${linkObj.iconURI}"> 
            </svg>`;
            const link = document.createElement("a");
            link.setAttribute("href", linkObj.link);
            link.setAttribute("aria-label", linkObj.label);
            link.innerHTML += icon;
            return link;
        });
        socialMedia.append(...links);
        uiFooter.appendChild(socialMedia);
        this.uiElement.append(uiHeader, uiMain, uiFooter);
    }
    renderHeader() {
    }
}

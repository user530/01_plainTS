import AppUI from "./appUI.js";
import { Teams } from "./consts.js";
export default class TeamApp {
    constructor(rootElementSelector) {
        this._rootElement = document.querySelector(rootElementSelector);
        this._appUI = null;
        this._teams = [];
        this._players = [];
    }
    get getRoot() {
        return this._rootElement;
    }
    appendRoot(newEl) {
        var _a;
        (_a = this._rootElement) === null || _a === void 0 ? void 0 : _a.appendChild(newEl);
    }
    set setAppUI(newUI) {
        this._appUI = newUI;
    }
    get getAppUI() {
        return this._appUI;
    }
    set setTeams(teamsArr) {
        this._teams = teamsArr;
    }
    get getTeams() {
        return this._teams;
    }
    findTeamByName(teamName) {
        const match = this.getTeams.find(team => team.value === teamName);
        return match || null;
    }
    set setPlayers(playersArr) {
        this._players = playersArr;
    }
    get getPlayers() {
        return this._players;
    }
    addPlayer(newPlayer) {
        this.getPlayers.push(newPlayer);
    }
    findPlayerById(playerId) {
        const match = this.getPlayers.find(player => player.id === playerId);
        return match || null;
    }
    deletePlayer(playerId) {
        const index = this.getPlayers.findIndex((player) => player.id === playerId);
        if (index >= 0)
            this.getPlayers.splice(index, 1);
    }
    init() {
        if (!this.getRoot)
            return console.error("Root element not found!");
        // Set initial data
        this.setTeams = Teams;
        // Create and set UI
        const ui = new AppUI(this.submitHandler.bind(this));
        this.setAppUI = ui;
        // Render app
        this.render();
    }
    submitHandler(e) {
        e.preventDefault();
        try {
            this.dispatch({ type: "ADD_PLAYER", data: e.target });
        }
        catch (error) {
            console.error(error);
            alert(error);
        }
    }
    dispatch(action) {
        switch (action.type) {
            case "ADD_PLAYER":
                if (!action.data)
                    throw new Error("No player data found!");
                const form = action.data;
                if (!(form instanceof HTMLFormElement))
                    throw new Error("Provide correct player data!");
                const nameEl = form.querySelector('[name="name"]');
                const teamEl = form.querySelector('[name="team"]');
                if (!nameEl || !teamEl || !("value" in nameEl) || !("value" in teamEl))
                    throw new Error("Provide user name and team!");
                // Find the team
                const userTeam = this.findTeamByName(String(teamEl.value));
                if (!userTeam)
                    throw new Error("Please, select existing team!");
                if (!nameEl.value.trim())
                    throw new Error("Please, enter non-empty player name!");
                // Add player to the dataset
                this.addPlayer({
                    id: Date.now().toString(),
                    name: String(nameEl.value),
                    team: userTeam
                });
                // Clear the name field
                nameEl.value = "";
                // Render data
                this.renderData();
                break;
            case "DELETE_PLAYER":
                break;
            default:
                throw new Error("Action not recognized!");
        }
    }
    render() {
        // Render UI
        this.renderUI();
        // Render content
        this.renderData();
    }
    renderUI() {
        this.appendRoot(this.getAppUI.uiElement);
    }
    renderData() {
        console.log("Render data fired!");
    }
}

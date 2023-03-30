import AppUI from "./appUI.js";
export default class TeamApp extends AppUI {
    constructor(rootElementSelector) {
        super(rootElementSelector);
        this._players = [];
        this._rootElement = document.querySelector(rootElementSelector);
    }
    findTeamByName(teamName) {
        const match = this.teams.find(team => team.value === teamName);
        return match || null;
    }
    set players(playersArr) {
        this._players = playersArr;
    }
    get players() {
        return this._players;
    }
    addPlayer(newPlayer) {
        this.players.push(newPlayer);
    }
    deletePlayer(playerId) {
        const index = this.players.findIndex((player) => player.id === playerId);
        if (index >= 0)
            this.players.splice(index, 1);
    }
    init() {
        try {
            // Render app
            this.renderInterface();
        }
        catch (error) {
            alert(error.message);
        }
    }
    submitHandler(e) {
        e.preventDefault();
        try {
            const form = e.target;
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
            // Create new player
            const newPlayer = {
                id: Date.now().toString(),
                name: String(nameEl.value),
                team: userTeam
            };
            // Add player to the dataset
            this.addPlayer(newPlayer);
            // Render new player
            this.renderAddPlayer(newPlayer);
            // Clear the name field
            nameEl.value = "";
        }
        catch (error) {
            console.error(error);
            alert(error);
        }
    }
    deleteHandler(e) {
        e.preventDefault();
        const playerId = e.target.dataset.playerid;
        if (!playerId)
            return;
        // Delete player from the data storage
        this.deletePlayer(playerId);
        // Update the UI
        this.renderDelPlayer(playerId);
    }
}

import AppUI from "./appUI.js";
export default class TeamApp extends AppUI {
    constructor(rootElementSelector) {
        super(rootElementSelector);
        this._players = [];
        this._rootElement = document.querySelector(rootElementSelector);
        // this._teams = [];
        // this._players = [];
    }
    findTeamByName(teamName) {
        const match = this.teams.find(team => team.value === teamName);
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
            // Add player to the dataset
            this.addPlayer({
                id: Date.now().toString(),
                name: String(nameEl.value),
                team: userTeam
            });
            // Clear the name field
            nameEl.value = "";
            // Render new player
            this.renderAddPlayer();
        }
        catch (error) {
            console.error(error);
            alert(error);
        }
    }
    deleteHandler(e) {
    }
    editHandler(e) {
    }
}

import AppUI from "./appUI.js"; 
import {Teams} from "./consts.js"
import { Player, Team } from "./types.js";

export default class TeamApp{
    private _rootElement : Element | null
    private _appUI : AppUI | null
    private _teams : Team[]
    private _players: Player []

    public constructor(
        rootElementSelector: string
    ){
        this._rootElement = document.querySelector(rootElementSelector);
        this._appUI = null;
        this._teams = [];
        this._players = [];
    }

    private get getRoot()
    {
        return this._rootElement;
    }

    private appendRoot(newEl :Element) : void
    {
        this._rootElement?.appendChild(newEl);
    }

    private set setAppUI(newUI: AppUI)
    {
        this._appUI = newUI
    }

    private get getAppUI()
    {
        return this._appUI;
    }

    private set setTeams(teamsArr: Team[])
    {
        this._teams = teamsArr;
    }

    private get getTeams()
    {
        return this._teams;
    }

    private findTeamByName(teamName: string) : Team | null
    {
        const match = this.getTeams.find(team => team.value === teamName);

        return match || null;
    }

    private set setPlayers(playersArr: Player[])
    {
        this._players = playersArr;
    }

    private get getPlayers()
    {
        return this._players;
    }

    private addPlayer(newPlayer : Player) : void
    {
        this.getPlayers.push(newPlayer);
    }

    private findPlayerById(playerId: string) : Player | null
    {
        const match = this.getPlayers.find(player=>player.id === playerId);

        return match || null;
    }

    private deletePlayer(playerId: string): void
    {
        const index = this.getPlayers.findIndex((player)=>player.id === playerId);

        if(index >= 0)this.getPlayers.splice(index, 1);
    }

    public init()
    {
        if(!this.getRoot) 
            return console.error("Root element not found!");

        // Set initial data
        this.setTeams = Teams;

        // Create and set UI
        const ui = new AppUI(this.submitHandler.bind(this));
        this.setAppUI = ui;
        
        // Render app
        this.render();
    }

    private submitHandler(e: Event){
        e.preventDefault();

        try {
            this.dispatch({type: "ADD_PLAYER", data: e.target as HTMLElement})
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    private dispatch(action: 
                    {
                        type: "ADD_PLAYER" | "DELETE_PLAYER", 
                        data?: HTMLElement
                    }): void
    {
        switch(action.type){
            case "ADD_PLAYER":
                if(!action.data)throw new Error("No player data found!");

                const form = action.data;

                if(!(form instanceof HTMLFormElement)) throw new Error("Provide correct player data!");

                const nameEl = form.querySelector('[name="name"]');
                const teamEl = form.querySelector('[name="team"]');

                if(!nameEl || !teamEl || !("value" in nameEl) || !("value" in teamEl))
                    throw new Error("Provide user name and team!");

                // Find the team
                const userTeam = this.findTeamByName(String(teamEl.value));

                if(!userTeam)
                    throw new Error("Please, select existing team!");

                if(!(nameEl.value as string).trim())
                    throw new Error("Please, enter non-empty player name!");

                // Add player to the dataset
                this.addPlayer({
                    id: Date.now().toString(), 
                    name: String(nameEl.value), 
                    team: userTeam
                })

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

    private render(): void
    {
        // Render UI
        this.renderUI();

        // Render content
        this.renderData();
    }

    private renderUI(): void
    {
        this.appendRoot((this.getAppUI as AppUI).uiElement);
    }

    private renderData(): void
    {
        console.log("Render data fired!")
    }

}
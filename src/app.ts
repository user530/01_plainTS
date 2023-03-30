import AppUI from "./appUI.js"; 
import { Player, Team } from "./types.js";

export default class TeamApp extends AppUI{
    private _players: Player [] = [];

    public constructor(
        rootElementSelector: string
    ){
        super(rootElementSelector);
        this._rootElement = document.querySelector(rootElementSelector);
    }

    private findTeamByName(teamName: string) : Team | null
    {
        const match = this.teams.find(team => team.value === teamName);

        return match || null;
    }

    private set players(playersArr: Player[])
    {
        this._players = playersArr;
    }

    private get players()
    {
        return this._players;
    }

    private addPlayer(newPlayer : Player) : void
    {
        this.players.push(newPlayer);
    }

    private deletePlayer(playerId: string): void
    {
        const index = this.players.findIndex((player)=>player.id === playerId);

        if(index >= 0)this.players.splice(index, 1);
    }

    public init()
    {
        try {
            // Render app
            this.renderInterface();
        } catch (error) {
            alert((error as Error).message);
        }
    }

    protected submitHandler(e: Event){
        e.preventDefault();

        try {
            const form = e.target;

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

            // Create new player
            const newPlayer = {
                id: Date.now().toString(), 
                name: String(nameEl.value), 
                team: userTeam
            }

            // Add player to the dataset
            this.addPlayer(newPlayer)
            
            // Render new player
            this.renderAddPlayer(newPlayer);

            // Clear the name field
            nameEl.value = "";

        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    protected deleteHandler(e: Event): void 
    {
        e.preventDefault();

        const playerId = (e.target as HTMLElement).dataset.playerid;
        if(!playerId)return;
        
        // Delete player from the data storage
        this.deletePlayer(playerId);

        // Update the UI
        this.renderDelPlayer(playerId);
    }

}
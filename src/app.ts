import AppUI from "./appUI.js"; 
import { Player, Team } from "./types.js";
import { Teams } from "./consts.js"

export default class TeamApp extends AppUI{
    private _players: Player [] = [];

    public constructor(
        rootElementSelector: string
    ){
        super(rootElementSelector);
        this._rootElement = document.querySelector(rootElementSelector);
        // this._teams = [];
        // this._players = [];
    }

    private findTeamByName(teamName: string) : Team | null
    {
        const match = this.teams.find(team => team.value === teamName);

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

            // Add player to the dataset
            this.addPlayer({
                id: Date.now().toString(), 
                name: String(nameEl.value), 
                team: userTeam
            })

            // Clear the name field
            nameEl.value = "";

            // Render new player
            this.renderAddPlayer();

        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    protected deleteHandler(e: Event): void 
    {
        
    }

    protected editHandler(e: Event): void {
        
    }

}
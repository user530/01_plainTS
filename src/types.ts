export type MediaLink = {
    iconURI: string,
    link: string,
    label: string
}

export type Team = {
    id: string,
    label: string,
    value: string
}

export type Player = {
    id: string,
    name: string,
    team: Team
}
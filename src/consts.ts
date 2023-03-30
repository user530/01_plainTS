import {MediaLink, Team} from "./types.js"

export const SocialMediaLinks : MediaLink[] =
[
    {
    iconURI: "https://www.svgrepo.com/show/512317/github-142.svg", 
    label: "github", 
    link: "https://github.com/user530"
    },
    {
    iconURI: "https://www.svgrepo.com/show/303299/linkedin-icon-2-logo.svg", 
    label: "linkedin", 
    link: "https://www.linkedin.com/#"
    },
    {
    iconURI: "https://www.svgrepo.com/show/475689/twitter-color.svg", 
    label: "twitter", 
    link: "https://twitter.com/#"
    },
    {
    iconURI: "https://www.svgrepo.com/show/468758/email.svg", 
    label: "email", 
    link: "mailto:m.timarsuev@gmail.com"
    },
];

export const Teams : Team [] = 
[
    {id: "1", label: "Adrenalin", value: "adrenalin"},
    {id: "2", label: "Buccaneer", value: "buccaneer"},
    {id: "3", label: "Chariot", value: "chariot"},
    {id: "4", label: "Dynamo", value: "dynamo"},
]

export const delImgURL : string = "https://www.svgrepo.com/show/500535/delete.svg"

export interface Hero {
    id?:               string;
    superhero:        string;
    publisher:        Publisher;    
    realName:       string;
    alt_img?:         string;
    img_link?:      string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
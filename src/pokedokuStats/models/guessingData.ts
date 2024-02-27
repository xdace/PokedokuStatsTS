export interface GuessingData {
    author: string,
    authorId: string,
    guesses: Guesses[]
}

export interface Guesses {
    prozent: string;
    pokemon: string;
    field: number;
    guessingOrder: number;
}
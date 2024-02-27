import { Puzzle, IncludedTypes } from "../models/puzzle";

export class PuzzleReader {
    todaysPuzzle : Puzzle;
    allPuzzleTypes : string[] = ["ground", "EVOLVEDBYITEM", "MONO-TYPE", "water","PALDEA +AREA ZERODLC", "FINALEVOLUTION"];
    constructor(todaysPuzzle : string) {
        this.todaysPuzzle = this.readPuzzle(todaysPuzzle);
        console.log(this.todaysPuzzle);
    }

    readPuzzle(todaysPuzzle: string) : Puzzle {
        var myColumns : string[] = [];
        var myRows : string[] = [];
        if(todaysPuzzle.startsWith("PokeDoku Master Puzzle"))
        {
            var puzzleWithoutLines = todaysPuzzle.replace(/(\r\n|\n|\r)/gm, "");
            puzzleWithoutLines = puzzleWithoutLines.replace("PokeDoku Master PuzzlebyPaulDrawsArtpokedoku_logo", "");
            console.log(puzzleWithoutLines);
            var includedPuzzleTypes : IncludedTypes[] = [];
            this.allPuzzleTypes.forEach(type => {
                var curIndex = puzzleWithoutLines.indexOf(type);
                if(curIndex > -1)
                {
                    includedPuzzleTypes.push({index: curIndex, name: type});
                }
            });
            includedPuzzleTypes.sort((typA, typB) => (typA.index < typB.index ? -1 : 1));
            if(includedPuzzleTypes.length == 6)
            {
                myColumns.push(includedPuzzleTypes[0].name);
                myColumns.push(includedPuzzleTypes[1].name);
                myColumns.push(includedPuzzleTypes[2].name);
                myRows.push(includedPuzzleTypes[3].name);
                myRows.push(includedPuzzleTypes[4].name);
                myRows.push(includedPuzzleTypes[5].name);
                
            }
            else{
                console.error("Not 6 Types found");
            }
            console.log(includedPuzzleTypes);
        }
        return {columns: myColumns, rows: myRows} ;
    }

    getTodaysPuzzleMessage() : string {
        var message : string = "";
        message += "Das heute PokeDokuPuzzle verlangt folgende Pokemonkombinationen:\n";
        var index : number = 1;
        this.todaysPuzzle.columns.forEach(column =>
            {
                this.todaysPuzzle.rows.forEach(row =>
                    {
                        message += index + ". " + column + " " + row + "\n";
                        index++;
                    });
            });
        return message;
    }
}
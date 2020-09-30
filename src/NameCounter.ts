class NameCounter {

    private occurrences: { [word: string]: number; };
    private namesPath: string;
    private wordsPath: string;

    constructor() {
        this.occurrences = {};
        this.namesPath = "data/first-names.txt"
        this.wordsPath = "data/oliver-twist.txt"
    }

    public CountingNames() {
        const fs: any = require('fs')

        let namesData: string
        let wordsData: string
        let names: string[]
        let words: string[]

        //Get a list of all names
        namesData = fs.readFileSync(this.namesPath, { encoding: 'utf8', flag: 'r' })
        names = namesData.split("\r")
        
        //Get a list of all words
        wordsData = fs.readFileSync(this.wordsPath, { encoding: 'utf8', flag: 'r' })
        words = wordsData.replace(/[^a-zA-Z\s\n\r]|(\r\n|\n|\r)/g, " ").split(/[ ]+/)
        
        //Incrementing the occurrences of each name
        for (let current of words) {
            if (names.includes(current)) {
                this.occurrences[current] = (this.occurrences[current] || 0) + 1
            }
        }

    }

    public writeToFile(outputPath: string) {    
        let fs = require('fs')
        let occurrences_matrix: any[][] = []
        let writeLine: string

        //Convert dictionary into matrix
        occurrences_matrix = Object.keys(this.occurrences).map((key) => {
            return [key, this.occurrences[key]];
        });

        //Sort according to the number of occurrences
        occurrences_matrix.sort((first: any, second: any) => {
            return second[1] - first[1];
        });

        // Write to file
        fs.truncate(outputPath, 0, () => {  //if the file already exists, overwrites it
            for (let elem of occurrences_matrix) {
                writeLine = elem[0] + ": " + elem[1] + "\n"

                fs.appendFileSync(outputPath, writeLine, (err: Error) => {
                    if (err) {
                        return console.log("Error writing file: " + err);
                    }
                });

            }
        });
    }

    public getCounting(name: string) {
        return this.occurrences[name];
    }



} export default NameCounter;
import express, {Application, Request, Response} from "express";
import NameCounter from "../src/NameCounter";

const app: Application = express();

//PART 1
app.get('/results_file', (req: Request, res: Response) => {
    
    let nameCounter = new NameCounter() 

    nameCounter.CountingNames()
    nameCounter.writeToFile('data/results.txt')

    res.send('File for Part 1 generated!')

});


//PART 2
app.get('/name-count', (req: any, res: any) => {
    
    const fs: any = require('fs')

    var counter: number;
    var name: string;
    var fields: string
    var data: string
    var finalJSON: JSON
    var data_parsed: any
    var nameCounter: any


    name = req.query.name

    //in case that the parameter doesn't exist or is empty
    if (name === undefined || name == '') {
        return res.status(422).send('\'name\' parameter not found!')
    }

    try {    //Tries to read from results.txt database first in order to be faster
        data = fs.readFileSync('data/results.txt', { encoding: 'utf8', flag: 'r' })

        //parse to json
        data = "{" + data.replace(/\n/g, ',').slice(0, -1) + "}"
        data_parsed = JSON.parse(data.replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":'))

        counter = data_parsed[name]

    } catch (err) { //if it doesn't exist, it runs the NameCounter algorithm again
        console.log("Generating name countings... ")

        nameCounter = new NameCounter()
        nameCounter.CountingNames()
        counter = nameCounter.getCounting(name)
    }

    //Create JSON to send
    fields = '{ "' + name + '" : ' + counter + '}'
    finalJSON = JSON.parse(fields)
    res.send(finalJSON)

});


app.listen(5000, () => {console.log('Server running at https://localhost:5000/');})

import express, {Application, Request, Response, NextFunction} from "express";

const app: Application = express();

//PART 1
app.get('/result_file', (req: Request, res: Response) => {
    res.send("Hello")

});







app.listen(5000, () => {console.log('Server running at https://localhost:5000/');});

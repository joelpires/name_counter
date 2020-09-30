# Name Couter


Written in TypeScript / Node.js, this program outputs a file with the number of occurrences of a name (in a names database) on a document. It also provides an API endpoint to request the number of occurrences of a particular name on that document.

## Requirements:
- Node
- Typescript
- Express
- Nodemon


## Run the App:

1) ```npm install```

2) ```npm run dev```

## Generate the file with the number of occurrences:
```http://localhost:5000/results_file```


## Request the number of occurrences of a particular name
```http://localhost:5000/name-count/?name=<insert name>```
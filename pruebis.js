//#!/usr/bin/env node
//Se agrega shebang characer para que sea ejcutable localmnte con node
//file System
const fs = require('fs');
const path = require('path');
//se procederá a captar todos los argumentos dados de la linea anterior y se les procesará
const [,, ...args] = process.argv;
const readFileUrl = (findFile) => {
  if (path.extname(findFile) === '.md') {
    console.log('achivo md');
    fs.readFile(findFile,'utf8',(err, data) => {
      const exp = /\[(.*?)\]\(.*?\)/gm;
        const dataFile = data.match(exp);
       
    });
  }
}

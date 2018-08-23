#!/usr/bin/env node
const [,, ... args] = process .args
/* const fs = require('fs');
const marked = require('marked');
let request = require('request'); 

const mdLinks = (path, options) => {
  if (options.validate === true && options.stats == true) {
    console.log('imprima links')
  } else if (options.stats == true) {
    console.log('imprima las opciones')
  } else if (options.validate == true) {
    console.log('imprima links validados')
  } else {
    console.log()
  }
  readFile(path)
}

const readFile = (path, promise) =>{
  let result = [];
 /*  fs.readFile() */
 /*fs.readFile('.../.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});

} */
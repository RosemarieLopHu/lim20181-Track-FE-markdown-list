#!/usr/bin/env node

const mdlinks = require('./indexx.js');
const program = require('commander');
// operador de propagación para que usuario ingrese su archivo
const [, , ...userFile] = process.argv; 
// es index porque tomo el valor que esta ingresando el usuario
const relativePath = userFile[0]; 
// let validate = userFile[1];

//Pedazo de código requerido por librería comander
program
  .version('0.1.0')
  .arguments('<path>')
  .option('-s, --stats', 'contador de links')
  .option('-v, --validate', 'valida links')
  .option('-s -v, --stats-validate', 'resumen del stado de links')
  .parse(process.argv);

const options = {
  stats: program.stats,
  validate: program.validate,
  path: relativePath,

}
mdlinks(options)
  .then(resultado => {
    if (options.validate && options.stats) {
      console.log(resultado);
      
      console.log(`total: ${resultado.total} unique:${resultado.unique} broken:${resultado.broken}`);
    } else if (options.stats) {
      console.log(`total: ${resultado.total} unique:${resultado.unique}`);
    } else if (options.validate) {
      resultado.forEach(element => {
        console.log(` ${element.file}  ${element.href} ${element.statusTxt} ${element.status} ${element.text}`);
      });
    } else if (options.path) {
      resultado.forEach(element => {
        console.log(` ${element.file}  ${element.href} ${element.text}`);
      });
    }
    // sera una carpeta o dir 
  });

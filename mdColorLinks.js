#!/usr/bin/env node
const path = require('path');
const mdlinks = require('./mdlinks ').mdlinks;
const colors = require('colors');

// funcion ubica archivo y trae la info de links
function mdColorLinks() {
  const [, , ...userFile] = process.argv;
  let writeFileUser = userFile[0];
  // concateno directorio actual donde se esta ejecutando desde la consola y el nombre de archivo ingresado
  let concatPath = path.join(process.cwd(), writeFileUser);
  // uso archivo actual  como parametro y retorno promesas 
  mdlinks(concatPath).then((values) => { // lee el archivo y retorna las promesas
    values.forEach(link => {
      let InfoLink = `
File ${colors.green(link.file)} 
Link ${colors.cyan(link.href)}
Text ${colors.white(link.text)}  
Status ${colors.magenta(link.status)} 
      `;
      console.log(InfoLink);
    });
  });
};

module.exports = {
  mdColorLinks
};
#!/usr/bin/env node
const fs = require('fs');
const fetch = require('node-fetch');
const markdownLinkExtractor = require('./app.js');
//f(x) array de archivos
const recorrerRuta = (relativePath) => {
  let arrFile = []; //array de archivos md
  const id = fs.statSync(relativePath)
  if(id.isFile()){
    if(path.extname(relativePath) === '.md'){
      arrFile.push(relativePath)
    }
  }else if(id.isDirectory()){
    const readDir = fs.readdir(relativePath)
    console.log(readDir);
    
  }

}

// Toma como parametro el archivo md
const mdlinks=(filePath)=> {
  // FilePath es la ruta
  return new Promise((resolve, reject) => {

    // Aquí se lee el archivo
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return reject(error);
      }    
      const links = markdownLinkExtractor(data);
      let infoLinks = [];
      // Iteras sobre el arreglo de links
      links.forEach(function(url) {
        // fetch me da el status ok
        infoLinks.push(fetch(url.href)
          .then(function(response) { // En la resuestas agreguo propiedad de estaus
            url.file = filePath,
            url.status = `${response.statusText} ${response.status}`;
            delete url.title;
            return url; // Retorna nueva url con su estatus
          })
          .catch(function(err) {
            console.log(err);
            url.status = 'fail'; // Si no hay nada
            return url;
          })
        );
      });
      // Arreglo vacio de promise guarda valores
      Promise.all(infoLinks).then(() => { // Retorno de las promesas de la función
        resolve(links);
      }).catch((err) => {
        console.error(err);
      });
    });
  });
};

module.exports = {
  mdlinks
};
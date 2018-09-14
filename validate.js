const fs = require('fs');
const fetch = require('node-fetch');
const markdownLinkExtractor = require('./app.js');
// Función que leerá el archivo
function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, fileData) => {
      console.log('Error');
      if (error) {
        return reject(error);
      }
      return resolve(fileData).then((data) => {
        extractLinks(data);
      });
      console.log(data);  
    });
  });
};
// función que extrae los links del archivo 
function extractLinks(readFile) {
  const links = markdownLinkExtractor(readFile);
  let infLinks = [];
  // iteración sobre el arreglo de links
  links.forEach(function(url) {
    // con fetch me permite obtener el status ok
    infLinks.push(fetch(url.href)
    // En el response se agrega propiedad de estatus
      .then(function(response) { 
        url.file = filePath,
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

  // Arreglo vacio de promise gurada valores
  // Retorno todas las promesas de la función
  Promise.all(infLinks).then(() => { 
    resolve(links);
  }).catch((err) => {
    console.error(err);
  });
};


const funcStats = (arrTotal) => {
  const total = arrTotal.length;
  const arrOnlyLink = arrTotal.map(objLink => objLink.href);
  const arrUnique = arrayUnique(arrOnlyLink);

  const unique = arrUnique.length;
  const objet = {
    "total": total,
    "unique": unique
  }
  return objet
} 
module.exports = {
  readFilePromise,
  extractLinks
};
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const marked = require('marked');
//using strict equality for comparisons:
const union = require('arr-union')//Combines a list of arrays, returning a single array with unique values

const arrObjetLinks = (recorrDirOfile) => {
  let arrObj = [];
  const renderer = new marked.Renderer();
  recorrDirOfile.forEach(file => {
    const filesLeidos = fs.readFileSync(file, 'utf-8')
    renderer.link = (href, title, text) => {
      arrObj.push({
        href: href,
        text: text,
        file: file,
      });
    };
    marked(filesLeidos, { renderer: renderer });
  })
  return arrObj
}

//f(x) que valida estado de los links --validate
const validateExtractLinks = (cjtoArr) => {
  const arrLink = cjtoArr.map((cjtoObjects => cjtoObjects.href))
  const cjtoArrPromise = arrLink.map(objLinks => fetch(objLinks))//fcth me permite obtener el status
  return Promise.all(cjtoArrPromise)// retorno de todas las promesas de la f(x) cuando el cjtoarrpromis han concluido con exito
    .then((res) => {
      cjtoArr.map((objectLink, stat) => {
        objectLink.status = res[stat].status;
        objectLink.statusTxt = res[stat].statusText;
      })
      return cjtoArr;
    })
}
//f(x) stats que permita determinar la stats basica de cada link
const flat = (arrObjet) => {
  const arrLink = arrObjet.map((cjtoObjects => cjtoObjects.href))
  const arrCompare = [];
  //artificio para utilizar arr-union (compara 2 ó + arr)
  const newArr = union(arrCompare, arrLink)
  const objeto = {
    total: arrLink.length,
    unique: newArr.length,
  }
  return objeto
}
//funcion contador links buenos
const validateStats = (arrValidate, responseStat) => {

  return arrValidate.then(response => {
    let broken = 0;
    response.forEach(objeto => {
      if (objeto.status === 404) {
        broken += 1
      }
    })
    console.log(broken);
    
    return broken;
  }).then((res) => {
    responseStat.broken = res;
    return responseStat;
  })
}

//f(x) capta la ruta y distingue si es dir o file y retorna un array de files md
const recorrerRuta = (route) => {
  const relativePath = path.resolve(route)
  let arrFile = []; //array de archivos md
  const id = fs.statSync(relativePath)
  if (id.isFile()) {
    if (path.extname(relativePath) === '.md') {
      arrFile.push(relativePath)
    }
  } else {
    const readDir = fs.readdirSync(relativePath) //ARRAY DE ARCHIVO O FILE
    //X CADA ELEMENT DE READDIR(ARRAY) VOY A VOLVER A LLAMAR A Fx(REECORR RUTA)
    readDir.forEach(file => {
      arrFile = arrFile.concat((recorrerRuta(path.join(relativePath, file))))
    })
  }
  return arrFile;
}

// Toma como parametro el archivo md
const mdlinks = (options) => {
  // FilePath es la ruta
  return new Promise((resolve, reject) => {
    if (!options.path) {
      reject('falta argumentos, ejm: md-links <path> [options]')
    } else {
      const recorrDirOfile = recorrerRuta(options.path);
      const arrObjet = arrObjetLinks(recorrDirOfile)
      let result = arrObjet
      let arrValidate
      let responseStat

      if (options.validate) {
        arrValidate = validateExtractLinks(arrObjet)

        result = arrValidate
      }
      if (options.stats) {
        responseStat = flat(arrObjet)
        result = responseStat
      }
      if (options.stats && options.validate) {
        result = validateStats(arrValidate, responseStat)
      }
      resolve(result)
    }
  });
};
module.exports = mdlinks
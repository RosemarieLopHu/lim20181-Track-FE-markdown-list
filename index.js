// const {promisify} = require('es6-promisify');
const fs = require('fs');
const Path = require('path');
const fetch = require('node-fetch'); 
//const linkCheck = require('link-check');
// const stat = promisify(fs.stat);


fs.readFile('README.md', 'utf-8', (err, data) => {
  let arrLinks = [];

  if (err) throw err;
  if (data) {
    const expression = /\[(.*?)\]\((.*?)\)/g;
    const reExp = new RegExp(expression);
    //console.log(data);
    let a = []
    data.split('\n')
      .map(line => reExp.exec(line))
      .filter(matches => !!matches)
      .forEach((matches, idx) => {
        // console.log(idx, line)
        // const data2 = reExp.exec(line)
        a.push({
          file: 'Aquí irá la ruta',
          text: matches[1],
          href: matches[2]})
        console.log(a);
      })
  }
});


5
//el metodo substring permite sacar e contenido de el [] y ()
//con el leng -1 me sale el indice y el subindice
//indexof(desde el ()hasta la url)
//split: que se parta donde hay un[] y un()
/* let promesa = fetch('');
promesa.then((res)=>{
  return res.json();
}).then((json)=>{
  console.log(json);
}) */

const readFileMd = (arrfile) => {
  fs.readFile(arrfile, (err, content) => {

  })
  try {
    const content = fs.readFileSync(arrfile);
    resolve(content)
  } catch (err) {
    reject(err)
  }
}


const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    err ? reject(err) : resolve(data)
  });
});
const recorrer = (ruta) => {
  if (!fs.statSync(ruta).isDirectory()) {
    const content = fs.readFileSync(ruta)
    // LISTO!
    console.log(ruta)
  } else { // entonces es directorio
    const rutasDir = fs.readdirSync(ruta)
    rutasDir.forEach(rutaDir => {
      recorrer(path.join(ruta, rutaDir))
    })
  }
}

const fsReadDir = (path) => new Promise((resolve, reject) => {




  fs.readdir(path, (err, files) => {
    

    err ? reject(err) : resolve(files)
  });
});


//recorrer('./node_modules')

/* 
const extractLink = contenido => Promise.resolve([]);
const validateLink = (Link, count) => (
  (count === 0)
    ? Promise.reject(new Error('HTTP fail: status 500'))
    : Promise.resolve(200)
)
  .catch(err => {
    //console.log(err)
    return 500;
  })
 */

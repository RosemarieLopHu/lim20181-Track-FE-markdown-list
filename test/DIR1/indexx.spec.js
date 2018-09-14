const mdLinks = require('../../indexx.js');

jest.setTimeout(12000);
test('deberia retornar un array de objetos [{href, text, file}]', () => {
  return mdLinks({ path: 'test/DIR1/mk/Readme.md' })
    .then((respuesta) => {
      expect(respuesta).toEqual(
        [{
          href:
            'https://docs.npmjs.com/getting-started/publishing-npm-packages',
          text: 'Crear módulos en Node.js',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md'
        },
        {
          href:
            'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
          text: 'Leer un archivo',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md'
        },
        {
          href:
            'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
          text: 'Leer un Directorio',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md'
        },
        {
          href: 'https://nodejs.org/api/path.html9404657',
          text: 'Path',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md'
        }]
      )
    })
});

test('deberia retornar un array de objetos [{href, text, file, status, statusTxt}]', () => {
  return mdLinks({ path: 'test/DIR1/mk/Readme.md', validate: true })
    .then((respuesta) => {
      expect(respuesta).toEqual(
        [{
          href:
            'https://docs.npmjs.com/getting-started/publishing-npm-packages',
          text: 'Crear módulos en Node.js',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md',
          status: 200,
          statusTxt: 'OK'
        },
        {
          href:
            'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
          text: 'Leer un archivo',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md',
          status: 200,
          statusTxt: 'OK'
        },
        {
          href:
            'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
          text: 'Leer un Directorio',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md',
          status: 200,
          statusTxt: 'OK'
        },
        {
          href: 'https://nodejs.org/api/path.html9404657',
          text: 'Path',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md',
          status: 404,
          statusTxt: 'Not Found'
        }]
      )
    })
});

test('debería retornar objeto con {total, unique} para --stats', () => {
  return mdLinks({ path: 'test/DIR1/mk/Readme.md', stats: true })
  .then((respuesta) => {
    expect(respuesta).toEqual(
      { total: 4, unique: 4 }
    )
  })
});

test('debería retornar objeto con {total, unique, broken} para --stats & -- validate', () => {
  return mdLinks({ path: 'test/DIR1/mk/Readme.md', validate: true, stats: true})
  .then((respuesta) => {
    expect(respuesta).toEqual(
      { total: 4, unique: 4, broken: 1}
    )
  })
});

test('debería retornar objeto con {total, unique, broken} para --stats & -- validate', () => {
  return mdLinks({ path: 'test', validate: true, stats: true})
  .then((respuesta) => {
    expect(respuesta).toEqual(
      { total: 4, unique: 4, broken: 1}
    )
  })
});
test('verifica que envie un mensaje de error', () => {
  return mdLinks({ path: ''})
  .catch((respuesta) => {
    expect(respuesta).toEqual('falta argumentos, ejm: md-links <path> [options]'
    )
  })
});

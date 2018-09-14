const mdLinks = require('../../indexx.js');

jest.setTimeout(7000);
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
          href: 'https://nodejs.org/api/path.html',
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
          href: 'https://nodejs.org/api/path.html',
          text: 'Path',
          file: 'C:\\Users\\RosemarieLopezH\\Documents\\lim20181-Track-FE-markdown-list\\test\\DIR1\\mk\\Readme.md',
          status: 200,
          statusTxt: 'OK'
        }]
      )
    })
});

test('debería retornar objeto con {total, unique} para --stats', () => {
  return mdLinks({ path: 'test/DIR1/mk/Readme.md', stats: true }).then((respuesta) => {
    expect(respuesta).toEqual(
      { total: 4, unique: 4 }
    )
  })
});

test('debería retornar objeto con {total, unique, broken} para --stats & -- validate', () => {
  return mdLinks({ path: 'test/DIR1/mk/Readme.md', validate: true, stats: true}).then((respuesta) => {
    expect(respuesta).toEqual(
      { total: 4, unique: 4, broken: 0}
    )
  })
});

const axios = require('axios');
const tarFs = require('tar-fs');
const fs = require('fs')

const url =
  'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.render-runtime@8.69.0/public/@types/vtex.render-runtime';

const go = async () => {
  const res = await axios.get(url, {
    responseType: 'stream',
    headers: {
      Accept: 'application/x-gzip',
      'Accept-Encoding': 'gzip'
    },
  });
  
//   res.data.on('data', (v) => console.log(v.toString()))
//   res.data.pipe(fs.createWriteStream('./content'))

  fs.createReadStream('./content.tar.gz').pipe(tarFs.extract('./fromfile'))
//   res.data.pipe(tarFs.extract('./wololo'));
  
};

go()

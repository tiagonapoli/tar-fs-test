const tarFs = require('tar-fs');
const tar = require('tar')
const fs = require('fs')
const tarStream = require('tar-stream')
const gunzip = require('gunzip-maybe')
const axios = require('axios')
const request = require('request')

const getUrlStream = () => {
  const url = 'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.render-runtime@8.69.0/public/@types/vtex.render-runtime'
  return request({
    url,
    method: 'GET',
    headers: {
      // 'User-Agent': 'yarn/1.20.0-0 npm/? node/v12.6.0 linux x64',
      Accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*',
      'Accept-Encoding': 'gzip'
    },
    // json: false,
    // buffer: false,
    // gzip: true,
  }).on('error', (err) => console.log(err))  
}

const openStream = () => {
  return new Promise((resolve) => {
    const st = fs.createReadStream('./content.tar.gz')
    st.on('open', resolve(st))
  })
}

const goTarFs = async () => {
  const stream = await openStream()
  stream.pipe(gunzip()).pipe(tarFs.extract('./fromfile'))
};

const goTar = async () => {
  const stream = await openStream()
  stream.pipe(tar.extract())
}

const goTarStream = async () => {
  console.log("Go tar stream")
  const extract = tarStream.extract()
  extract.on('entry', function(header, stream, next) {
    stream.on('end', function() {
      next() 
    })
  
    stream.resume()
  })
  const str = await getUrlStream()
  str.on('data', (data) => console.log(data))
  str.pipe(gunzip()).pipe(extract)
}

// goTarFs()
// goTar()
goTarStream()
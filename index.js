const tarFs = require('tar-fs');
const tar = require('tar')
const fs = require('fs')
const tarStream = require('tar-stream')
const gunzip = require('gunzip-maybe')
const axios = require('axios')

const getUrlStream = () => {
  const url = 'http://vtex.vteximg.com.br/_v/public/typings/v1/vtex.render-runtime@8.69.0/public/@types/vtex.render-runtime'
  return axios.get(url, { responseType: 'stream' })  
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
  str.data.on('data', (data) => console.log(data))
  str.data.pipe(gunzip()).pipe(extract)
}

// goTarFs()
// goTar()
goTarStream()
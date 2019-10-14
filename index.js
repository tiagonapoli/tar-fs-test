const tarFs = require('tar-fs');
const tar = require('tar')
const fs = require('fs')
const tarStream = require('tar-stream')


const openStream = () => {
  return new Promise((resolve) => {
    const st = fs.createReadStream('./content.tar.gz')
    st.on('open', resolve(st))
  })
}

const goTarFs = async () => {
  const stream = await openStream()
  stream.pipe(tarFs.extract('./fromfile'))
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
  const stream = await openStream()
  stream.pipe(extract)
}

// goTarFs()
// goTar()
goTarStream()
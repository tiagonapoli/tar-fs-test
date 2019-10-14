const tarFs = require('tar-fs');
const tar = require('tar')
const fs = require('fs')

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

// goTarFs()
goTar()
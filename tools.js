
const fs = require("fs")
const path = require("path")

const traverse = function(dirPath, filter, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  filter = filter || ((x) => true)
  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    let fullFile = path.join(dirPath, "/", file)
    if (fs.statSync(fullFile).isDirectory()) {
      arrayOfFiles = traverse(fullFile, filter, arrayOfFiles)
    } else {
      if(filter(fullFile)){
      	arrayOfFiles.push(fullFile)
      }
    }
  })

  return arrayOfFiles
}

const prependToFile = function(file, prefix) {
  fs.readFile(file, function (err, data) {
    if (err) {
      return console.log(err)
    }
    let content = data.toString("utf8")
    if (! content.startsWith(prefix)) {
      content = prefix + content
    }
    fs.writeFile(file, content, function(err) {
      if (err) {
        return console.log(err)
      }
    })
  })
}

module.exports = {
  traverse: traverse,
  prependToFile: prependToFile
}


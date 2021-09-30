#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const tools = require('./tools')
const cp = require("child_process");

const protoc = "protoc"

const options = yargs
  .option('d', {
        alias: 'dir',
        demandOption: true,
        describe: 'Source directory',
        type: 'string'
    })
  .option('o', {
        alias: 'out',
        demandOption: true,
        describe: 'Output directory',
        type: 'string'
    })
  .option('e', {
        alias: 'ext',
        demandOption: false,
        default: [".proto"],
        describe: 'Proto file extensions',
        type: 'array'
    })
  .option('b', {
        alias: 'binary',
        demandOption: false,
        default: false,
        describe: 'Binary protocol ("grpcweb" instead of "grpcwebtext")',
        type: 'boolean'
    })
  .help('h')
  .alias('h', 'help')
  .argv

const fileFilter = (file) => options.e.includes(path.extname(file))

const files = tools.traverse(options.d, fileFilter)

const mode = options.b ? "grpcweb" : "grpcwebtext" 
const protocArgs = [
	'-I=' + options.d,
	'--js_out=import_style=commonjs:' + options.o,
	'--grpc-web_out=import_style=typescript,mode=' + mode + ':' + options.o
].concat(files) 

fs.mkdirSync(options.o, { recursive: true })

cp.execFile(protoc, protocArgs, null,
  function(err, stdout, stderr){
    if(err){
      console.log('Protoc error: ', err)
      process.exit(1)
    }
     
    const jsFilter = (file) => (path.extname(file) == ".js")      
    let jsFiles = tools.traverse(options.o, jsFilter)
    
    jsFiles.forEach((file) => {
      tools.prependToFile(file, "/* eslint-disable */\n")
    })
  }
)




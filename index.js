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
  .option("interop", {
    default: false,
    describe: 'Compile with \'esModuleInterop\' flag',
    type: 'boolean'
  })
  .help('h')
  .alias('h', 'help')
  .argv

const fileFilter = (file) => options.e.includes(path.extname(file))

const files = tools.traverse(options.d, fileFilter)

const additionalArgs = [] 

if(options.interop){
    additionalArgs.push("--ts_proto_opt=esModuleInterop=true")
}

const protocArgs = [
    '-I=' + options.d,
	'--plugin=./node_modules/.bin/protoc-gen-ts_proto',
    ...additionalArgs,
    '--ts_proto_out=' + options.o
].concat(files)

fs.rmSync(options.o, { recursive: true, force: true })

fs.mkdirSync(options.o, { recursive: true })

cp.execFile(protoc, protocArgs, null,
  function(err, stdout, stderr){
    if(err){
      console.log('Protoc error: ', err)
      process.exit(1)
    }
  }
)




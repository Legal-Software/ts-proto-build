#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const tools = require('./tools')
const cp = require('child_process')

const protoc = "protoc"

const pluginPathDefault = path.join("node_modules", ".bin", "protoc-gen-ts_proto")

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
   .option("ignore", {
        demandOption: false,
        default: [],
        describe: 'Ignore files matching JS RegExp',
        type: 'array'
    })
  .option("interop", {
    default: false,
    describe: 'Compile with \'esModuleInterop\' flag',
    type: 'boolean'
  })
  .option("plugin", {
    default: pluginPathDefault,
    describe: 'Path to the \'protoc-gen-ts_proto\' plugin executable',
    type: 'string'
  })
  .help('h')
  .alias('h', 'help')
  .argv

const regexFilters = options.ignore.map(s => new RegExp(s))

const fileFilter = (file) => {
    const rightExt = options.e.includes(path.extname(file))
    if(rightExt){
        const filterRes = regexFilters.map(r => r.test(file))
        return !filterRes.reduce((a, b) => a || b, false)
    }
    else return false
}

const files = tools.traverse(options.d, fileFilter)

const additionalArgs = [] 

if(options.interop){
    additionalArgs.push("--ts_proto_opt=esModuleInterop=true")
}

const protocArgs = [
    '-I=' + options.d,
	'--plugin=' + options.plugin,
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




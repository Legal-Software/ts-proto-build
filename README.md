# Typescript Protobuf Build Tool

This project implements an NPM CLI wrapper tool for [ts-proto](https://www.npmjs.com/package/ts-proto) to recursively generate TypeScript code for Protobuf definitions using NPM run scripts.

## Usage

```
$ ts-protobuf-build

Options:
      --version  Show version number                                   [boolean]
  -d, --dir      Source directory                            [string] [required]
  -o, --out      Output directory                            [string] [required]
  -e, --ext      Proto file extensions             [array] [default: [".proto"]]
      --ignore   Ignore files matching JS RegExp           [array] [default: []]
      --interop  Compile with 'esModuleInterop' flag  [boolean] [default: false]
      --plugin   Path to the 'protoc-gen-ts_proto' plugin executable
                     [string] [default: "node_modules/.bin/protoc-gen-ts_proto"]
  -h, --help     Show help                                             [boolean]
```

## Requirements

Please make sure that the `protoc` binary is installed.

- See [protoc installation](https://grpc.io/docs/protoc-installation/)

## Features

* Pure NodeJS wrapper script (works on all platforms supporting NodeJS and protoc)
* Searches source directory recursively for proto files
* Generates TypeScript code from Protobuf definitions

## Use case

This script is intended to be used in NPM run scripts.


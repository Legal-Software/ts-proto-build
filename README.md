# Typescript Protobuf Build Tool

This project implements an NPM CLI wrapper tool for [protoc](https://www.npmjs.com/package/protoc). It uses [ts-proto](https://www.npmjs.com/package/ts-proto) to recursively generate TypeScript code for Protobuf definitions using NPM run scripts.

## Usage

```
$ ts-proto-build

Options:
  --version     Show version number                                    [boolean]
  -d, --dir     Source directory                             [string] [required]
  -o, --out     Output directory                             [string] [required]
  -e, --ext     Proto file extensions              [array] [default: [".proto"]]
  -h, --help    Show help                                              [boolean]

```

## Features

* Pure NodeJS wrapper script (works on all platforms supporting NodeJS and protoc)
* Searches source directory recursively for proto files
* Generates TypeScript code from Protobuf definitions

## Use case

This script is intended to be used in NPM run scripts.


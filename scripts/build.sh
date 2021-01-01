#!/usr/bin/env bash
cp ./README.md ./dist/README.md
browserify ./src/index.js > ./dist/main.js
terser ./dist/main.js --compress --mangle -o ./dist/index.min.js 
rm ./dist/main.js

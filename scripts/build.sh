#!/usr/bin/env bash
cp ./README.md ./dist/README.md
cp ./package.json ./dist/package.json
cp ./package-lock.json ./dist/package-lock.json
browserify ./src/index.js > ./dist/main.js
terser ./dist/main.js --compress --mangle -o ./dist/index.min.js 
rm ./dist/main.js

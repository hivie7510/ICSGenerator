#!/usr/bin/env bash
webpack --config webpack.config.js
cp ./README.md ./dist/README.md
cp ./package.json ./dist/package.json 
cp ./LICENSE ./dist/LICENSE
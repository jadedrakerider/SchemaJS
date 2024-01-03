#!/bin/bash

npm install mocha chai --save-dev
npm install ajv --save-dev

git submodule init
git submodule update

cd SchemaJS

git submodule init
git submodule update

cd ..

npm test
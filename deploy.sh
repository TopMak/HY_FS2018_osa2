#!/bin/sh
npm run build
rm -rf ../../osa3/osa3puhbackend/build
cp -r build ../../osa3/osa3puhbackend/

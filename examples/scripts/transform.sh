#!/usr/bin/env bash

node ./dist/cli transform \
            --in-file ./examples/mock/_style-data.json \
            --out-file ./examples/output/theme.dsm.js

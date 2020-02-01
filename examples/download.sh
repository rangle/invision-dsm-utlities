#!/usr/bin/env bash

node ./dist/cli download \
            --url 'https://rangle.invisionapp.com/dsm-export/rangle-io/where-van-gogh/style-data.json?exportFormat=lookup&key=Hk4MnZ1bU' \
            --out-file ./examples/output/_style-data.json

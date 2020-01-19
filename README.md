## How to use

_Temporary Solution_

* Download this package and save in your repo.
* Replace `./transform-to-theme` with a reference to where the file is in your folder
* `-s` is the source json or url of design tokens
* `-d` is the destination file

```json
"scripts": {
  "build-theme": "./transform-to-theme -s ./src/_style-data.json -d ./src/theme.dsm.js",
  "download": "./download-design-tokens -s 'https://rangle.invisionapp.com/dsm-export/rangle-io/where-van-gogh/style-data.json?exportFormat=lookup&key=Hk4MnZ1bU' -d ./src/_style-data.json"
}
```

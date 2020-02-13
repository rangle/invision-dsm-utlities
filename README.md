# invision-dsm-utils

Utility scripts to help integrate [InVision Design System Manager (DSM)](https://www.invisionapp.com/design-system-manager) into your front-end codebase.

*You will need to be an InVision DSM customer to get value out of this library*

## Functionality

* Download design token files
* Transform design tokens into JS file that meets [Styled System Theme Specification](https://styled-system.com/theme-specification)

## Installation (Not active, yet)

```
npm install --dev @rangle/invision-dsm-utils
```

## API

### Configuration

You must set two variables in a configuration file that follows the [cosmicconfig](https://github.com/davidtheclark/cosmiconfig) pattern (e.g. a `package.json` property, an extensionless "rc file", etc.)

**.invisiondsmutilsrc**

```
{
    dsmExportUrl: <url>,
    key: <string>
}
``` 

Find these values by:

* Log into InVision DSM
* Select your project
* In the top right corner select the icon `</>`
* Select `Design tokens`
* Select `CSS`
* Copy the URL displayed underneath the `Styles` heading and paste it into a text editor. For instance:

```
https://rangle.invisionapp.com/dsm-export/rangle-io/where-van-gogh/_style-params.css?key=Hk4MnZ1bU
```

* The `dsmExportUrl` is `https://rangle.invisionapp.com/dsm-export/rangle-io/where-van-gogh`
* The `key` is the url query parameter value `Hk4MnZ1bU`

### Download

This is a node script that accepts inputs from the command line.

```
invision-dsm-utils download --type <type> --out-dir <relativeOutputDirectory>
```

**Required Inputs**
```
--type: css | scss | less | styl | xml | json | yaml | android | ios
--out-dir: relative path to output directory
``` 

**Optional Inputs**
```
--icons-out-dir: relative path to output directory
--json-export-format: lookup | list
```

Note that `json-export-format` is only relevant when `type` is `json`. The default value is `lookup`.

Setting the `--icons-out-dir` will download a zip file of icons from the DSM.

### Transform

This is a node script that accepts inputs from the command line.

```
invision-dsm-utils transform --in-file <relativeFilePath> --out-file <relativeFilePath>
```

**Required Inputs**
```
--in-file: relative path to input to design tokens in JSON lookup format
--out-file: relative path to JS file 
```

The outfile can be used as a theme object for any library that supports the `Styled System Theme Specification` (e.g. [styled-system](https://styled-system.com/)).

## Examples

View the `examples` folder.

## License

MIT

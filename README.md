
# EasyLog.js
EasyLog.js is a fully open source logger for JavaScript and Node.js projects.
It comes without any external dependencies and is easy to use and extend.

## Installation

### NPM
```
npm install EasyLog.js
```

## Usage  (Node.js)

EasyLog supports CommonJS and ES6 module style imports.

### ES6 modules
```js
import {EasyLog} from 'easylog';

/**
 * Creates a new logger to console
 */
let logger = new EasyLog('My Logger', EasyLog.LEVEL_WARNING);
logger.warning('This is a warning!');
```
### CommonJS
```js

let EasyLog = require('easylog').EasyLog;

/**
 * Creates a new logger to console
 */
let logger = new EasyLog('My Logger', EasyLog.LEVEL_WARNING);
logger.warning('This is a warning!');
```

## Usage (Browser)

EasyLog can also be included in the browser with the pre-built minified scripts.
```html
      <script src="./dist/easylog.main.min.js"></script>
      <script>
        /**
        * Create a logger without color
        */
        const logger = new easylog.EasyLog('My Loggger', easylog.EasyLog.LEVEL_INFO,
            new easylog.EasyLogConsoleStream({color: false}));

        // debug should not output anything
        logger.warning('This is a warning!');
      </script>
```

## Examples

See the examples folder for full examples.

## Testing and Documentation
Some of the following commands may require you to install the development dependencies.

### Documentation
The JSDocs can be found [here](https://krickl.dev/easylog/index.html).

To build the documentation yourself run
```
npm run docs
```

### Tests
To run the tests use
```
npm run test
```

### Distribution
To build a minfied version for distribution use
```
npm run dist
```

### Linting
To lint the code use
```
npm run lint
```



## License
EasyLog.js is licensed under the MIT license.






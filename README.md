
# JustLog.js
JustLog.js is a fully open source logger for JavaScript and Node.js projects.
It comes without any external dependencies and is easy to use and extend.

## Installation

### NPM
```
npm install justlog.js
```

## Usage  (Node.js)

JustLog supports CommonJS and ES6 module style imports.

### ES6 modules
```js
import {JustLog} from 'justlog.js';

/**
 * Creates a new logger to console
 */
let logger = new JustLog('My Logger', JustLog.LEVEL_WARNING);
logger.warning('This is a warning!');
```
### CommonJS
```js

let JustLog = require('justlog.js').JustLog;

/**
 * Creates a new logger to console
 */
let logger = new JustLog('My Logger', JustLog.LEVEL_WARNING);
logger.warning('This is a warning!');
```

## Usage (Browser)

JustLog can also be included in the browser with the pre-built minified scripts.
```html
<script src="./dist/justlog.main.min.js"></script>
<script>
  /**
  * Create a logger without color
  */
  const logger = new justlog.JustLog('My Loggger', justlog.JustLog.LEVEL_INFO,
      new justlog.JustLogConsoleStream({color: false}));

  // debug should not output anything
  logger.warning('This is a warning!');
</script>
```

## Examples

See the examples folder for full examples.

## Testing and Documentation
Some of the following commands may require you to install the development dependencies.

### Documentation
The JSDocs can be found [here](https://krickl.dev/justlog/index.html).

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
JustLog.js is licensed under the MIT license.






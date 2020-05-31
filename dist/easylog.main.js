var easylog =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/easylog.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/easylog.js":
/*!************************!*\
  !*** ./src/easylog.js ***!
  \************************/
/*! exports provided: ColorString, EasyLogStreamBase, EasyLogConsoleStream, EasyLog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorString", function() { return ColorString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasyLogStreamBase", function() { return EasyLogStreamBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasyLogConsoleStream", function() { return EasyLogConsoleStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasyLog", function() { return EasyLog; });
/**
 * @class ColorString A basic class that enables color formatted output to
 * the command line
 */
class ColorString {
    /**
     * @constructor
     * @param {Bool} allowColor Enables color mode
     */
    constructor(allowColor=true) {
        this.str = '';
        this.allowColor = allowColor;
    }

    /**
     * Appends a value to the current output buffer
     * @param {String} str The string
     * @return {ColorString}
     */
    append(str) {
        this.str += str;
        return this;
    }

    /**
     * Appends a color to the current string
     * @param {String} cStr The color string
     * @return {ColorString}
     */
    appendColor(cStr) {
        if (this.allowColor) {
            this.str += cStr;
        }
    }

    /**
     * Resets terminal to default
     * @return {ColorString}
     */
    reset() {
        this.appendColor(ColorString.termColors.reset);
        return this;
    }

    /**
     * Sets font to bright mode
     * @return {ColorString}
     */
    bright() {
        this.appendColor(ColorString.termColors.bright);
        return this;
    }

    /**
     * Sets font to dim mode
     * @return {ColorString}
     */
    dim() {
        this.appendColor(ColorString.termColors.dim);
        return this;
    }

    /**
     * Sets font to underscore mode
     * @return {ColorString}
     */
    underscore() {
        this.appendColor(ColorString.termColors.underscore);
        return this;
    }

    /**
     * Sets font to blink mode
     * @return {ColorString}
     */
    blink() {
        this.appendColor(ColorString.termColors.blink);
        return this;
    }

    /**
     * Reverses foreground and background colors
     * @return {ColorString}
     */
    reverse() {
        this.appendColor(ColorString.termColors.reverse);
        return this;
    }

    /**
     * Enables hidden mode
     * @return {ColorString}
     */
    hidden() {
        this.appendColor(ColorString.termColors.reverse);
        return this;
    }

    /**
     * Sets color to black
     * @param {Bool} bg Background color (default false)
     * @return {ColorString}
     */
    black(bg=false) {
        this.appendColor(bg ? ColorString.termColors.bgBlack : ColorString.termColors.fgBlack);
        return this;
    }

    /**
     * Sets color to red
     * @param {Bool} bg Background color (default false)
     * @return {ColorString}
     */
    red(bg=false) {
        this.appendColor(bg ? ColorString.termColors.bgRed : ColorString.termColors.fgRed);
        return this;
    }


    /**
     * Sets color to green
     * @param {Bool} bg Background color (default false)
     * @return {ColorString}
     */
    green(bg=false) {
        this.appendColor(bg ? ColorString.termColors.bgGreen : ColorString.termColors.fgGreen);
        return this;
    }


    /**
     * Sets color to yellow
     * @param {Bool} bg Background color (default false)
     * @return {ColorString}
     */
    yellow(bg=false) {
        this.appendColor(bg ? ColorString.termColors.bgYellow : ColorString.termColors.fgYellow);
        return this;
    }


    /**
     * Sets color to blue
     * @param {Bool} bg Background color (default false)
     * @return {ColorString}
     */
    blue(bg=false) {
        this.appendColor(bg ? ColorString.termColors.bgBlue : ColorString.termColors.fgBlue);
        return this;
    }


    /**
     * Sets color to magenta
     * @param {Bool} bg Background color (default false)
     * @return {ColorString}
     */
    magenta(bg=false) {
        this.appendColor(bg ? ColorString.termColors.bgMagenta : ColorString.termColors.fgMagenta);
        return this;
    }


    /**
     * Sets color to cyan
     * @param {Bool} bg Background color (default false)
     * @return {ColorString}
     */
    cyan(bg=false) {
        this.appendColor(bg ? ColorString.termColors.bgCyan : ColorString.termColors.fgCyan);
        return this;
    }

    /**
     * Sets color to white
     * @param {Bool} bg Background color (default false)
     * @return {ColorString}
     */
    white(bg=false) {
        this.appendColor(bg ? ColorString.termColors.bgWhite : ColorString.termColors.fgWhite);
        return this;
    }

    toString() {
        return this.str;
    }


    /**
     * Clears the current string buffer
     */
    clear() {
        this.str = '';
    }
}
ColorString.termColors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    fgBlack: '\x1b[30m',
    fgRed: '\x1b[31m',
    fgGreen: '\x1b[32m',
    fgYellow: '\x1b[33m',
    fgBlue: '\x1b[34m',
    fgMagenta: '\x1b[35m',
    fgCyan: '\x1b[36m',
    fgWhite: '\x1b[37m',

    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
};



/**
 * @class EasyLogStreamBase
 * Base class for streams.
 * Use it as a base to create your own logger output stream.
 */
class EasyLogStreamBase {
    /**
     * @constructor
     * @param {Object} options Options obejct. Keys: {Array} levels -> Log level names, {Bool} color -> allow color
     */
    constructor(options={}) {
        this.levels = options.levels || ['debug', 'info', 'warning', 'error', 'critical', 'fatal'];
        this.output = '';
        this.color = new ColorString(options.color);
    }

    /**
     * Picks the color for the given log leven. Override for custom (or no) colors
     * @param {Number} level The loglevel
     */
    colorPicker(level) {
        // choose color
        switch (level) {
            case EasyLog.LEVEL_INFO:
                this.color.white();
                break;
            case EasyLog.LEVEL_WARNING:
                this.color.yellow();
                break;
            case EasyLog.LEVEL_ERROR:
                this.color.red(false);
                break;
            case EasyLog.LEVEL_CRITICAL:
                this.color.red(true);
                break;
            case EasyLog.LEVEL_FATAL:
                this.color.red(true);
                this.color.bright();
                break;
        }
    }

    /**
     * Formats the date string. Override for custom formatting.
     * @param {Date} time The current time
     */
    dateFormatter(time) {
        return time.toUTCString();
    }

    /**
     * writes the logged message. Override to log to custom destination
     * @param {Number} level The log level
     * @param {String} name The origin of the log
     * @param {String} message The actual log message
     * @param {Date} time Time (defaults to current time)
     */
    write(level, name, message, time=new Date()) {
        this.color.clear();
        this.color.reset();

        this.colorPicker(level);

        this.color.append(`${this.dateFormatter(time)} [${this.levels[level]}] [${name}] ${message}`);
        this.color.reset();

        this.output = this.color.str;
    }
}

/**
 * @class EasyLogConsoleStream Console output logger
 */
class EasyLogConsoleStream extends EasyLogStreamBase {
    /**
     * @constructor
     * @param {Object} options Options obejct. Keys: {Array} levels -> Log level names, {Bool} color -> allow color
     */
    constructor(options) {
        super(options);
    }

    /**
     * writes the logged message. Override to log to custom destination
     * @param {Number} level The log level
     * @param {String} name The origin of the log
     * @param {String} message The actual log message
     * @param {Date} time Time (defaults to current time)
     */
    write(level, name, message, time=new Date()) {
        super.write(level, name, message, time);
        if (level < EasyLog.LEVEL_WARNING) {
            console.log(this.output);
        } else if (level < EasyLog.LEVEL_ERROR) {
            console.warn(this.output);
        } else {
            console.error(this.output);
        }
    }
}

/**
 * @class EasyLog Logger class
 */
class EasyLog {
    /**
     * @constructor
     * @param {string} name The name of the logger
     * @param {Number} minLevel The current log level
     * @param {EasyLogStreamBase} stream The output stream for the logger. Must be a subclass of EasyLogStreamBase
     */
    constructor(name, minLevel=EasyLog.LEVEL_ERROR, stream=new EasyLogConsoleStream()) {
        this.name = name;
        this.minLevel = minLevel;
        this.streams = [stream];
    }

    /**
     * Add a new stream to this logger
     * @param {Object} stream The stream
     */
    addStream(stream) {
        this.streams.push(stream);
    }

    /**
     * @param {Number} level
     * @return {Bool} true if level is above or equal to the current log level
     */
    isMinLevel(level) {
        return level >= this.minLevel;
    }


    /**
     * Outputs the current message to log if the level is ok
     * @param {Number} level The log level
     * @param {String} message The message to output
     */
    output(level, message) {
        if (!this.isMinLevel(level)) {
            return;
        }
        for (let stream of this.streams) {
            stream.write(level, this.name, message);
        }
    }

    /**
     * Outputs info log level
     * @param {String} message The message
     * @return {EasyLog}
     */
    info(message) {
        this. output(EasyLog.LEVEL_INFO, message);
        return this;
    }

    /**
     * Outputs warning log level
     * @param {String} message The message
     * @return {EasyLog}
     */
    warning(message) {
        this.output(EasyLog.LEVEL_WARNING, message);
        return this;
    }


    /**
     * Outputs error log level
     * @param {String} message The message
     * @return {EasyLog}
     */
    error(message) {
        this.output(EasyLog.LEVEL_ERROR, message);
        return this;
    }

    /**
     * Outputs ciritcal log level
     * @param {String} message The message
     * @return {EasyLog}
     */
    crit(message) {
        this.output(EasyLog.LEVEL_CRITICAL, message);
        return this;
    }

    /**
     * Outputs fatal log level
     * @param {String} message The message
     * @return {EasyLog}
     */
    fatal(message) {
        this.output(EasyLog.LEVEL_FATAL, message);
        return this;
    }


    /**
     * Outputs debug log level
     * @param {String} message The message
     * @return {EasyLog}
     */
    debug(message) {
        this.output(EasyLog.LEVEL_DEBUG, message);
        return this;
    }
}
/**
 * {Number} LEVEL_DEBUG Debug log level
 */
EasyLog.LEVEL_DEBUG = 0;
/**
 * {Number} LEVEL_INFO Info log level
 */
EasyLog.LEVEL_INFO = 1;
/**
 * {Number} LEVEL_WARNING Warning log level
 */
EasyLog.LEVEL_WARNING = 2;
/**
 * {Number} LEVEL_ERROR Error log level
 */
EasyLog.LEVEL_ERROR = 3;
/**
 * {Number} LEVEL_CRITICAL Ciritcal log level
 */
EasyLog.LEVEL_CRITICAL = 4;
/**
 * {Number} LEVEL_FATAL Fatal log level
 */
EasyLog.LEVEL_FATAL = 5;




/***/ })

/******/ });
//# sourceMappingURL=easylog.main.js.map
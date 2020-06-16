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
     * @returns {ColorString}
     */
    clear() {
        this.str = '';
        return this;
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
 * @callback StreamDateFormatter
 * @param {Date} time The current time
 * @param {JustLogStream} stream The calling stream
 * @return {String} The formatted date string
 */

/**
 * @callback StreamMessageFormatter
 * @param {Number} level The log level
 * @param {String} name The origin of the log
 * @param {String} message The actual log message
 * @param {Date} time Time (defaults to current time)
 * @param {Array} args The argument objects
 * @param {JustLogStream} stream The calling stream
 * @return {String} The formatted message
 */

/**
 * @typedef {Object} StreamOptions
 * @property {Array} levels The log level names
 * @property {Bool} color Enable Colors. Defaults to true
 * @property {StreamDateFormatter} dateFormatter Custom date formatter. By default it will return .toUTCString
 * @property {StreamMessageFormatter} messageFormatter Custom message formatter.
 */



/**
 * @class JustLogStream
 * Base class for streams.
 * Use it as a base to create your own logger output stream.
 */
class JustLogStream {
    /**
     * @constructor
     * @param {StreamOptions} options The options object.
     */
    constructor(options={}) {
        this.levels = options.levels || ['debug', 'info', 'warning', 'error', 'critical', 'fatal'];
        this.output = '';
        this.color = new ColorString(options.color);
        this._dateFormatter = options.dateFormatter;
        this.messageFormatter = options.messageFormatter;
    }

    /**
     * Picks the color for the given log leven. Override for custom (or no) colors
     * @param {Number} level The loglevel
     */
    colorPicker(level) {
        // choose color
        switch (level) {
            case JustLog.LEVEL_INFO:
                this.color.white();
                break;
            case JustLog.LEVEL_WARNING:
                this.color.yellow();
                break;
            case JustLog.LEVEL_ERROR:
                this.color.red(false);
                break;
            case JustLog.LEVEL_CRITICAL:
                this.color.red(true);
                break;
            case JustLog.LEVEL_FATAL:
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
        /**
         * If time formatter exists do not call default
         */
        if (this._dateFormatter) {
            return this._dateFormatter(time, this);
        }
        return time.toUTCString();
    }

    /**
     * writes the logged message. Calls messageFormatter is defined
     * @param {Number} level The log level
     * @param {String} name The origin of the log
     * @param {String} message The actual log message
     * @param {Date} time Time (defaults to current time)
     * @param {Array} args The arguments array of unformatted obejcts
     * @return {String} The output
     */
    write(level, name, message, time=new Date(), args=[]) {
        /**
         * If message formatter exists do not invoke default behaviour
         */
        if (this.messageFormatter) {
            this.output = this.messageFormatter(level, name, message, time, args, this);
            return this.output;
        }
        return this.defaultFormatter(level, name, message, time, args);
    }

    /**
     * The default message formatter.
     * @param {Number} level The log level
     * @param {String} name The origin of the log
     * @param {String} message The actual log message
     * @param {Date} time Time (defaults to current time)
     * @param {Array} args The argument objects
     * @return {String} The output
     */
    defaultFormatter(level, name, message, time) {
        this.color.clear();
        this.color.reset();

        this.colorPicker(level);

        this.color.append(`${this.dateFormatter(time)} [${this.levels[level]}] [${name}] ${message}`);
        this.color.reset();

        this.output = this.color.str;

        return this.output;
    }
}

/**
 * @class JustLogConsoleStream Console output logger
 */
class JustLogConsoleStream extends JustLogStream {
    /**
     * @constructor
     * @param {StreamOptions} options The options object.
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
     * @param {Array} args The arguments array of unformatted obejcts
     * @return {String} The output
     */
    write(level, name, message, time=new Date(), args=[]) {
        super.write(level, name, message, time, args);
        if (level < JustLog.LEVEL_WARNING) {
            console.log(this.output);
        } else if (level < JustLog.LEVEL_ERROR) {
            console.warn(this.output);
        } else {
            console.error(this.output);
        }

        return this.output;
    }
}

/**
 * @typedef {Object} JustLogOptions
 * @property {Number} prettyPrintSpace Space for JSON pretty printing
 */

/**
 * @class JustLog Logger class
 */
class JustLog {
    /**
     * @constructor
     * @param {string} name The name of the logger
     * @param {Number} minLevel The current log level
     * @param {JustLogStream} stream The output stream for the logger. Must be a subclass of JustLogStreamBase
     * @param {JustLogOptions} options Other options
     */
    constructor(name, minLevel=JustLog.LEVEL_ERROR, stream=new JustLogConsoleStream(), options={}) {
        this.name = name;
        this.minLevel = minLevel;
        this.streams = [stream];
        this.prettyPrintSpace = options.prettyPrintSpace;
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
    output(level, args) {
        if (!this.isMinLevel(level)) {
            return;
        }
        let message = '';

        for (let a of args) {
            if (typeof a === 'object') {
                message = `${message} ${JSON.stringify(a, null, this.prettyPrintSpace)}`;
            } else {
                message = `${message} ${a}`;
            }
        }

        for (let stream of this.streams) {
            stream.write(level, this.name, message, new Date(), args);
        }
    }

    /**
     * Outputs info log level
     * @param {String} message The message
     * @return {JustLog}
     */
    info() {
        this. output(JustLog.LEVEL_INFO, arguments);
        return this;
    }

    /**
     * Outputs warning log level
     * @param {String} message The message
     * @return {JustLog}
     */
    warning() {
        this.output(JustLog.LEVEL_WARNING, arguments);
        return this;
    }


    /**
     * Outputs error log level
     * @param {String} message The message
     * @return {JustLog}
     */
    error() {
        this.output(JustLog.LEVEL_ERROR, arguments);
        return this;
    }

    /**
     * Outputs ciritcal log level
     * @param {String} message The message
     * @return {JustLog}
     */
    crit() {
        this.output(JustLog.LEVEL_CRITICAL, arguments);
        return this;
    }

    /**
     * Outputs fatal log level
     * @param {String} message The message
     * @return {JustLog}
     */
    fatal() {
        this.output(JustLog.LEVEL_FATAL, arguments);
        return this;
    }


    /**
     * Outputs debug log level
     * @param {String} message The message
     * @return {JustLog}
     */
    debug() {
        this.output(JustLog.LEVEL_DEBUG, arguments);
        return this;
    }
}
/**
 * {Number} LEVEL_DEBUG Debug log level
 */
JustLog.LEVEL_DEBUG = 0;
/**
 * {Number} LEVEL_INFO Info log level
 */
JustLog.LEVEL_INFO = 1;
/**
 * {Number} LEVEL_WARNING Warning log level
 */
JustLog.LEVEL_WARNING = 2;
/**
 * {Number} LEVEL_ERROR Error log level
 */
JustLog.LEVEL_ERROR = 3;
/**
 * {Number} LEVEL_CRITICAL Ciritcal log level
 */
JustLog.LEVEL_CRITICAL = 4;
/**
 * {Number} LEVEL_FATAL Fatal log level
 */
JustLog.LEVEL_FATAL = 5;

module.exports = {ColorString, JustLog, JustLogConsoleStream, JustLogStream};

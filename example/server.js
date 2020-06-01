#!/usr/bin/env node
/**
 * EasyLog.js node.js example
 */

const EasyLog = require('../src/easylog.js').EasyLog;
const EasyLogConsoleStream = require('../src/easylog.js').EasyLogConsoleStream;

/**
 * Create a new logger with color.
 */
const logger = new EasyLog('Example Logger', EasyLog.LEVEL_INFO);

/**
 * Debug messages will not show.
 */
logger.debug('Debug message');
logger.info('Info message');
logger.error('Error message');
logger.crit('Critical message');
logger.fatal('Fatal message');
logger.warning('Warning message');

/**
 * Logger with custom formatter
 */
const customLogger = new EasyLog('Custom Logger', EasyLog.LEVEL_INFO,
    /**
     * The original stream is exposed via the stream object
     */
    new EasyLogConsoleStream({messageFormatter: (level, name, message, time, stream) => {
        return stream.color.clear()
            .yellow().append(`{${stream.dateFormatter(time)}} [${stream.levels[level]}, ${name}] ${message}`).reset().str;
    }}));

customLogger.warning('My custom warning!');
customLogger.error('Custom Error');

/**
 * Define a custom logger stream class
 */
class CustomStream extends EasyLogConsoleStream {
    write(level, name, message, time) {
        // simple console log
        console.log(level, name, message);
        return '';
    }
}

const customStreamLogger = new EasyLog('Stream Logger', EasyLog.LEVEL_INFO, new CustomStream());
customStreamLogger.error('Custom stream');

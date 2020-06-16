#!/usr/bin/env node
/**
 * JustLog.js node.js example
 */

const JustLog = require('../src/justlog.js').JustLog;
const JustLogConsoleStream = require('../src/justlog.js').JustLogConsoleStream;

/**
 * Create a new logger with color.
 */
const logger = new JustLog('Example Logger', JustLog.LEVEL_INFO);

/**
 * Debug messages will not show.
 */
logger.debug('Debug message', {value: 255});
logger.info('Info message', {value: 255}, 0);
logger.error('Error message');
logger.crit('Critical message');
logger.fatal('Fatal message');
logger.warning('Warning message');

/**
 * Logger with custom formatter
 */
const customLogger = new JustLog('Custom Logger', JustLog.LEVEL_INFO,
    /**
     * The original stream is exposed via the stream object
     */
    new JustLogConsoleStream({messageFormatter: (level, name, message, time, args, stream) => {
        return stream.color.clear()
            .yellow()
            .append(`{${stream.dateFormatter(time)}} [${stream.levels[level]}, ${name}] ${message} args: ${JSON.stringify(args)}`).reset().str;
    }}), {prettyPrintSpace: 2});

customLogger.warning('My custom warning!');
customLogger.error('Custom Error');
customLogger.info('Logging object: ', {value: 255});

/**
 * Define a custom logger stream class
 */
class CustomStream extends JustLogConsoleStream {
    write(level, name, message, time) {
        // simple console log
        console.log(level, name, message);
        return '';
    }
}

const customStreamLogger = new JustLog('Stream Logger', JustLog.LEVEL_INFO, new CustomStream());
customStreamLogger.error('Custom stream');

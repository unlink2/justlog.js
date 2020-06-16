#!/usr/bin/env node
/**
 * JustLog.js node.js example
 */

import {JustLog, JustLogConsoleStream} from '../src/wrapper.mjs'

/**
 * Create a new logger with color.
 */
const logger = new JustLog('Example Logger', JustLog.LEVEL_INFO);

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
const customLogger = new JustLog('Custom Logger', JustLog.LEVEL_INFO,
    /**
     * The original stream is exposed via the stream object
     */
    new JustLogConsoleStream({messageFormatter: (level, name, message, time, args, stream) => {
        return stream.color
            .yellow().append(`{${stream.dateFormatter(time)}} [${stream.levels[level]}, ${name}] ${message}`).reset().str;
    }}));

customLogger.warning('My custom warning!');

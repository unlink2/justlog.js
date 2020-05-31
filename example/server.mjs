#!/usr/bin/env node
/**
 * EasyLog.js node.js example
 */

import {EasyLog} from '../src/wrapper.mjs'

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

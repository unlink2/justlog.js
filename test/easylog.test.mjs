import assert from 'assert';
import { EasyLogStream, ColorString, EasyLog } from '../src/wrapper.mjs';

describe('ColorString', () => {
    describe('String chaining', () => {
        it('Should chain color commands', () => {
            let c = new ColorString();
            c.reset().bright().append('bright')
                .reset().dim().append('dim')
                .reset().underscore().append('underscore')
                .reset().blink().append('blink')
                .reset().reverse().append('reverse')
                .reset().hidden().append('hidden').reset()
                .black().append('black')
                .red().append('red')
                .green().append('green')
                .yellow().append('yellow')
                .blue().append('blue')
                .magenta().append('magenta')
                .cyan().append('cyan')
                .white().append('white').reset()
                .black(true).append('black')
                .red(true).append('red')
                .green(true).append('green')
                .yellow(true).append('yellow')
                .blue(true).append('blue')
                .magenta(true).append('magenta')
                .cyan(true).append('cyan')
                .white(true).append('white')
                .black(true).append('black').reset();
            // man this is ugly
            assert.equal(c.str, `\x1B[0m\x1B[1mbright\x1B[0m\x1B[2mdim\x1B[0m\x1B[4munderscore\x1B[0m\x1B[5mblink\x1B[0m\x1B[7mreverse\x1B[0m\x1B[7mhidden\x1B[0m\x1B[30mblack\x1B[31mred\x1B[32mgreen\x1B[33myellow\x1B[34mblue\x1B[35mmagenta\x1B[36mcyan\x1B[37mwhite\x1B[0m\x1B[40mblack\x1B[41mred\x1B[42mgreen\x1B[43myellow\x1B[44mblue\x1B[45mmagenta\x1B[46mcyan\x1B[47mwhite\x1B[40mblack\x1B[0m`);
        });

        it ('Should not use color commands if disabled', () => {
            let c = new ColorString(false);
            c.reset().bright().append('bright')
                .reset().dim().append('dim')
                .reset().underscore().append('underscore')
                .reset().blink().append('blink')
                .reset().reverse().append('reverse')
                .reset().hidden().append('hidden').reset()
                .black().append('black')
                .red().append('red')
                .green().append('green')
                .yellow().append('yellow')
                .blue().append('blue')
                .magenta().append('magenta')
                .cyan().append('cyan')
                .white().append('white').reset()
                .black(true).append('black')
                .red(true).append('red')
                .green(true).append('green')
                .yellow(true).append('yellow')
                .blue(true).append('blue')
                .magenta(true).append('magenta')
                .cyan(true).append('cyan')
                .white(true).append('white')
                .black(true).append('black').reset();

            assert.equal(c.str,
                `brightdimunderscoreblinkreversehiddenblackredgreenyellowbluemagentacyanwhiteblackredgreenyellowbluemagentacyanwhiteblack`);
        });

        it('Should clear the string when clear is called', () => {
            let c = new ColorString();
            c.append('hello');
            assert.equal(c.str, 'hello');
            c.clear();
            assert.equal(c.str, '');
        });
    });
});

describe('Stream', () => {
    describe('Mock stream', () => {
        it('should listen to all levels', () => {
            let b = new EasyLogStream();
            b.write(EasyLog.LEVEL_INFO, 'test', 'message', new Date(0));
            assert.equal(b.output, '\x1B[0m\x1B[37mThu, 01 Jan 1970 00:00:00 GMT [info] [test] message\x1B[0m');

            b.write(EasyLog.LEVEL_FATAL, 'test', 'fatal', new Date(1));
            assert.equal(b.output, '\x1B[0m\x1B[41m\x1B[1mThu, 01 Jan 1970 00:00:00 GMT [fatal] [test] fatal\x1B[0m');
        });

        it('Should use custom date formatters', () => {
            let b = new EasyLogStream({dateFormatter: (time, stream) => {
                assert.equal(stream, b);
                return 'My fancy date formatter';
            }});

            assert.equal(b.dateFormatter(new Date(100)), 'My fancy date formatter');

        });

        it('Should use a custom message formatter', () => {
            let b = new EasyLogStream({messageFormatter: (level, name, message, time, args, stream) => {
                assert.equal(stream, b);
                assert.equal(typeof args, 'object');
                assert.equal(args.length, 1);
                assert.equal(args[0], message);
                return `${level} ${name} ${message} ${time.toUTCString()}`;
            }});

            assert.equal(b.write(2, 'test name', 'test message', new Date(100), ['test message']),
                '2 test name test message Thu, 01 Jan 1970 00:00:00 GMT');
        });
    });
});

describe('Logger', () => {
    describe('Logger with mock stream', () => {
        it('Should not log levels below the current level', () => {
            let l = new EasyLog('name', EasyLog.LEVEL_ERROR, new EasyLogStream({color: false}));
            // should not log these
            for (let i = EasyLog.LEVEL_INFO; i < EasyLog.LEVEL_ERROR; i++) {
                assert(!l.isMinLevel(i));
            }
            // should log these levels
            for (let i = EasyLog.LEVEL_ERROR; i <= EasyLog.LEVEL_DEBUG; i++)  {
                assert(l.isMinLevel(i));
            }
            // test output
            assert.equal(l.debug('test'), l);
            assert.equal(l.streams[0].output, '');
            assert.equal(l.info('test'), l);
            assert.equal(l.streams[0].output, '');
            assert.equal(l.warning('test'), l);
            assert.equal(l.streams[0].output, '');
            assert.equal(l.error('test'), l);
            assert.notEqual(l.streams[0].output, '');
            assert.equal(l.crit('test'), l);
            assert.notEqual(l.streams[0].output, '');
            assert.equal(l.fatal('test'), l);
            assert(!l.streams[0].color.allowColor);
            assert.notEqual(l.streams[0].output, '');
        });

        it('Should write to all streams', () => {
            let l = new EasyLog('name', EasyLog.LEVEL_ERROR, new EasyLogStream({color: false}));
            l.addStream(new EasyLogStream({color: false})); // second stream
            l.error('test');
            assert.notEqual(l.streams[0].output, '');
            assert.equal(l.streams[1].output, l.streams[0].output);
            l.info('testing');
            assert.equal(l.streams[1].output, l.streams[0].output);
        });

        it('Should pretty print Objects', () => {
            let l = new EasyLog('name', EasyLog.LEVEL_ERROR, new EasyLogStream({dateFormatter: () => {return '';}}),
                {prettyPrintSpace: 0});
            l.error('Test', {value: 255});
            assert.equal(l.streams[0].output, '\x1B[0m\x1B[31m [error] [name]  Test {"value":255}\x1B[0m');
        });
    });
});

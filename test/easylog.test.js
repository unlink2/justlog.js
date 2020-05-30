import assert from 'assert';
import { EasyLogStreamBase, ColorString, EasyLog } from '../src/easylog.js';

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
            let b = new EasyLogStreamBase();
            b.write(EasyLogStreamBase.LEVEL_INFO, 'test', 'message', new Date(0));
            assert.equal(b.output, '\x1B[0m\x1B[37mThu, 01 Jan 1970 00:00:00 GMT [info] [test] message\x1B[0m');

            b.write(EasyLogStreamBase.LEVEL_FATAL, 'test', 'fatal', new Date(1));
            assert.equal(b.output, '\x1B[0m\x1B[41m\x1B[1mThu, 01 Jan 1970 00:00:00 GMT [fatal] [test] fatal\x1B[0m');
        });
    });
});

describe('Logger', () => {
    describe('Logger with mock stream', () => {
        it('Should not log levels below the current level', () => {
            let l = new EasyLog('name', EasyLogStreamBase.LEVEL_ERROR, new EasyLogStreamBase({color: false}));
            // should not log these
            for (let i = EasyLogStreamBase.LEVEL_INFO; i < EasyLogStreamBase.LEVEL_ERROR; i++) {
                assert(!l.isMinLevel(i));
            }
            // should log these levels
            for (let i = EasyLogStreamBase.LEVEL_ERROR; i <= EasyLogStreamBase.LEVEL_DEBUG; i++)  {
                assert(l.isMinLevel(i));
            }
            // test output
            l.debug('test');
            assert.equal(l.stream.output, '');
            l.info('test');
            assert.equal(l.stream.output, '');
            l.warning('test');
            assert.equal(l.stream.output, '');
            l.error('test');
            assert.notEqual(l.stream.output, '');
            l.crit('test');
            assert.notEqual(l.stream.output, '');
            l.fatal('test');
            assert(!l.stream.color.allowColor);
            assert.notEqual(l.stream.output, '');
        });
    });
});

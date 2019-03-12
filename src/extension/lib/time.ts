'use strict';

// Native
import {EventEmitter} from 'events';

// Packages
import parseMsToObj = require('parse-ms');
import * as convertUnitToMs from 'milliseconds';
import {MsObj} from '../../types/time';
import {TimeStruct} from '../../types/time';


/**
 * Constructs a new TimeStruct with the provided number of milliseconds.
 * @param milliseconds - The value to instantiate this TimeObject with, in milliseconds.
 * @returns A populated TimeStruct object.
 */
export function createTimeStruct(milliseconds = 0): TimeStruct {
    const parsedTime = parseMilliseconds(milliseconds);

    return {
        ...parsedTime,
        formatted: formatMilliseconds(milliseconds),
        raw: milliseconds,
        timestamp: Date.now()
    };
}
/**
 * Formats a number of milliseconds into a string ([hh:]mm:ss).
 * @param inputMs - The number of milliseconds to format.
 * @returns  The formatted time sting.
 */
export function formatMilliseconds(inputMs: number): string {
    // tslint:disable-next-line
    const {days, hours, minutes, seconds, milliseconds} = parseMilliseconds(inputMs);
    let str = '';

    if (days) {
        str += `${days}d `;
    }

    if (hours) {
        str += `${hours}:`;
    }

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    const tenths = milliseconds as number < 100 ? 0 : String(milliseconds).charAt(0);

    str += `${paddedMinutes}:${paddedSeconds}.${tenths}`;
    return str;
}

/**
 * Parses a number of milliseconds into a ParsedTime object.
 * @param milliseconds - A number of milliseconds.
 * @returns An object representing each dimension of the time.
 */
export function parseMilliseconds(milliseconds: number): MsObj {
    return (parseMsToObj as any)(milliseconds) as MsObj;
}

/**
 * Parses a number of seconds into a ParsedTime object.
 * @param seconds - A number of seconds.
 * @returns An object representing each dimension of the time.
 */
export function parseSeconds(seconds: number): MsObj {
    return parseMilliseconds(seconds * 1000);
}

/**
 * Parses a formatted time string into an integer of milliseconds.
 * @param timeString - The formatted time string to parse.
 * Accepts the following: hh:mm:ss.sss, hh:mm:ss, hh:mm, hh
 * @returns The parsed time string represented as milliseconds.
 */
export function parseTimeString(timeString: string): number {
    let ms = 0;
    const timeParts = timeString.split(':').filter(part => part.trim());
    if (timeParts.length === 3) {
        ms += convertUnitToMs.hours(parseInt(timeParts[0], 10));
        ms += convertUnitToMs.minutes(parseInt(timeParts[1], 10));
        ms += convertUnitToMs.seconds(parseFloat(timeParts[2]));
        return ms;
    }

    if (timeParts.length === 2) {
        ms += convertUnitToMs.minutes(parseInt(timeParts[0], 10));
        ms += convertUnitToMs.seconds(parseFloat(timeParts[1]));
        return ms;
    }

    if (timeParts.length === 1) {
        ms += convertUnitToMs.seconds(parseFloat(timeParts[0]));
        return ms;
    }

    throw new Error(`Unexpected format of timeString argument: ${timeString}`);
}

/**
 * A timer which counts down to a specified end time.
 */
export class CountdownTimer extends EventEmitter {
    private readonly interval: NodeJS.Timer;

    public constructor(endTime: number, {tickRate = 100} = {}) {
        super();
        this.interval = setInterval(
            () => {
                const currentTime = Date.now();
                const timeRemaining = Math.max(endTime - currentTime, 0);
                this.emit('tick', createTimeStruct(timeRemaining));
                if (timeRemaining <= 0) {
                    this.emit('done');
                }
            },
            tickRate
        );
    }

    public stop(): void {
        clearInterval(this.interval);
    }
}

/**
 * A timer which counts up, with no specified end time.
 */
export class CountupTimer extends EventEmitter {
    private readonly interval: NodeJS.Timer;

    public constructor({tickRate = 100, offset = 0} = {}) {
        super();
        const startTime = Date.now() - offset;
        this.interval = setInterval(
            () => {
                const currentTime = Date.now();
                const timeElapsed = currentTime - startTime;
                this.emit('tick', createTimeStruct(timeElapsed));
                if (timeElapsed <= 0) {
                    this.emit('done');
                }
            },
            tickRate
        );
    }

    public stop(): void {
        clearInterval(this.interval);
    }
}


import * as nodecgApiContext from './util/nodecg-api-context';
import {OmnibarTicks, TickObject} from '../types/schemas/omnibarTicks';
import {TickArgs} from '../types/ticker';
import clone = require('clone');
require('clone');

const nodecg = nodecgApiContext.get();

const current = nodecg.Replicant<number>('currentOmnibarTick');
const ticks = nodecg.Replicant<OmnibarTicks>('omnibarTicks');

setInterval(next, 6000);


// Playback functions
/*******************/
nodecg.listenFor('nextOmnibarTick', next);

// Play next item in list
// Only runs if more than 1 ticks are in list
function next(): void {
    ticks.value.items = ticks.value.items || [];

    // get array of just ids
    let ids = ticks.value.items.map(val => val.id);

    if (current.value >= 0 && ids.length > 1) {
        // current value is 0 when nothing is running
        const currentIndex = ids.indexOf(current.value) || 0;

        // add one to id, loop back round to 0 if at end
        const nextIndex = (currentIndex + 1) % ids.length;
        nodecg.sendMessage('playLowerThird', ids[nextIndex]);
    }
}


// List mutation functions
/************************/
nodecg.listenFor('addOmnibarTick', add);
nodecg.listenFor('delOmnibarTick', del);
nodecg.listenFor('editOmnibarTick', edit);

// Append item to the list
function add(args: TickArgs): void {
    const newTicks: OmnibarTicks = clone(ticks.value);

    // Get id for this object, and THEN increment index stored in replicant
    const id = newTicks.index++;

    // ensure newTicks.items is an array
    newTicks.items = newTicks.items || [];

    newTicks.items.push({id: id, message: args.message});

    ticks.value = newTicks;
}

// Delete item from list
// Disallows deletion of currently shown tick
function del(id: number): void {
    // check id is not 0
    if (!id || id < 1) return;

    const newList = clone(ticks.value.items) || [];

    // filter out element that matches our id
    ticks.value.items = newList.filter(x => x.id !== id);
}

// Modify item in list
function edit(args: TickObject): void {
    let newList = clone(ticks.value);

    newList.items = newList.items || [];

    newList.items[args.id] = {id: args.id, message: args.message};
    ticks.value = newList;
}

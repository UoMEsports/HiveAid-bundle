
import * as nodecgApiContext from './util/nodecg-api-context';
import {OmnibarTicks, TickObject} from '../types/schemas/omnibarTicks';
import {TickArgs} from '../types/ticker';
import clone = require('clone');
require('clone');

const nodecg = nodecgApiContext.get();

const current = nodecg.Replicant<number>('currentOmnibarTick');
const list = nodecg.Replicant<OmnibarTicks>('omnibarTicks');

setInterval(next, 6000);


// Playback functions
/*******************/
nodecg.listenFor('nextOmnibarTick', next);

// Play next item in list
// Only runs if more than 1 ticks are in list
function next(): void {
    list.value.items = list.value.items || [];

    // get array of just ids
    let ids = list.value.items.map(val => val.id);

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
    const newList: OmnibarTicks = clone(list.value);

    // Get id for this object, and THEN increment index stored in replicant
    const id = newList.index++;

    // ensure newList.items is an array
    newList.items = newList.items || [];

    newList.items.push({id: id, message: args.message});

    list.value = newList;
}

// Delete item from list
// Disallows deletion of currently shown tick
function del(id: number): void {
    // check id is not 0
    if (!id || id < 1) return;

    const newList = clone(list.value);

    // check at least one item exists
    if (!newList.items || newList.items.length < 1) return;

    // find index of object with the same id we're looking for
    const index = newList.items.findIndex(x => x.id === id);

    // check item with id exists
    if (index === undefined) return;

    delete newList.items[index];

    list.value = newList;
}

// Modify item in list
function edit(args: TickObject): void {
    let newList = clone(list.value);

    newList.items = newList.items || [];

    newList.items[args.id] = {id: args.id, message: args.message};
    list.value = newList;
}

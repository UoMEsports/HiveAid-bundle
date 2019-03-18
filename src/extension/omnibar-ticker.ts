
import * as nodecgApiContext from './util/nodecg-api-context';
import {OmnibarTicks} from '../types/schemas/omnibarTicks';
import clone = require('clone');
require('clone');

const nodecg = nodecgApiContext.get();

const current = nodecg.Replicant<number>('currentOmnibarTick');
const list = nodecg.Replicant<OmnibarTicks>('omnibarTicks');

setInterval(next, 6000);

nodecg.listenFor('nextOmnibarTick', next);
nodecg.listenFor('addOmnibarTick', add);
nodecg.listenFor('delOmnibarTick', del);
nodecg.listenFor('editOmnibarTick', edit);

// Playback functions
/*******************/
// A QoL function to play next lower third
// Only runs if a lowerthird is currently being shown, and more than 1 items are in list

function next(): void {
    let ids = Object.keys(list.value.items as object)
        .map(val => parseInt(val))
        .sort((a, b) => a - b);

    if (current.value > 0 && ids.length > 1) {
        const currentIndex = ids.indexOf(current.value);
        const nextIndex = (currentIndex + 1) % ids.length;
        nodecg.sendMessage('playLowerThird', ids[nextIndex]);
    }
}
// List mutation functions
/************************/
// Append item to the list

function add(args): void {
    let newList = clone(list.value);
    const index = newList.index++;
    newList.items[index] = {id: index, message: args.message};
    list.value = newList;
}

// Delete item from list
// Disallows deletion of currently shown lower third

function del(id): void {
    if (id != current.value) {
        let newList = clone(list.value);
        delete newList.items[id];
        list.value = newList;
    }
}

// Modify item in list

function edit(args): void {
    let newList = clone(list.value);
    newList.items[args.id] = {id: args.id, header: args.header, body: args.body};
    list.value = newList;
}

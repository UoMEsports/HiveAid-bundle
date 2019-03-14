
import * as nodecgApiContext from './util/nodecg-api-context';
import clone = require('clone');
require('clone');

const nodecg = nodecgApiContext.get();

const current = nodecg.Replicant('currentOmnibarTick', {defaultValue: -1});
const list = nodecg.Replicant('OmnibarTicks', {defaultValue: { index: 1, items: {} }});

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
    let idsString = Object.keys(list.value.items).sort((a, b) => a - b);
    let idsNumber = idsString.map(val => parseInt(val));
    if (current.value > 0 && idsNumber.length > 1) {
        
        const currentIndex = idsNumber.indexOf(current.value);
        const nextIndex = (currentIndex + 1) % idsNumber.length;
        nodecg.sendMessage('playLowerThird', idsNumber[nextIndex]);
    }
}
// List mutation functions
/************************/
// Append item to the list
function add(args): void {
    let newList = clone(list.value);
    const index = newList.index++;
    newList.items[index] = {id: index, header: args.header, body: args.body};
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

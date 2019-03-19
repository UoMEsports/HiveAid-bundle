import * as nodecgApiContext from './util/nodecg-api-context';
import {Names, NameObject} from '../types/schemas/names';
import {NameArgs} from '../types/names';

const nodecg = nodecgApiContext.get();

import clone = require('clone');
require('clone');

const names = nodecg.Replicant<Names>('names');


// List mutation functions
/************************/
nodecg.listenFor('addName', add);
nodecg.listenFor('delName', del);
nodecg.listenFor('editName', edit);

// Append item to the list
function add(args: NameArgs): void {
    const newNames: Names = clone(names.value);

    // Get id for this object, and THEN increment index stored in replicant
    const id = newNames.index++;

    // ensure newList.items is an array
    newNames.items = newNames.items || [];

    newNames.items.push({id: id, realName: args.realName, fullName: args.fullName, alias: args.alias, social: args.social});

    names.value = newNames;
}

// Delete item from list
function del(id: number): void {
    // check id is not 0
    if (!id || id < 1) return;

    const newList = clone(names.value.items) || [];

    // filter out element that matches our id
    names.value.items = newList.filter(x => x.id !== id);
}

// Modify item in list
function edit(nameObj: NameObject): void {
    const newList = clone(names.value.items);

    // check at least one item exists
    if (!newList || newList.length < 1) return;

    // find index of object with the same id we're looking for
    names.value.items = newList.filter(x => x.id !== nameObj.id);
}

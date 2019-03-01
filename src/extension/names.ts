import * as nodecgApiContext from './util/nodecg-api-context';
import {Names, NameObject} from '../types/schemas/names';
import {NameArgs} from '../types/nameArgs';

const nodecg = nodecgApiContext.get();
let clone = require('clone');

const names = nodecg.Replicant<Names>('names');

nodecg.listenFor('addStaff', add);
nodecg.listenFor('delStaff', del);
nodecg.listenFor('editStaff', edit);

// List mutation functions
/************************/

// Append item to the list
function add(args: NameArgs) {
	let newList: Names = clone(names.value);
	const index = newList.index++;

	newList.items = newList.items || {};
	
	newList.items[index] = {id: index, realName: args.realName, fullName: args.fullName, alias: args.alias, social: args.social};

	names.value = newList;
}

// Delete item from list
// Disallows deletion of currently shown lower third
function del(id: number) {
	if (!id) {
		return;
	}

	let newList = clone(names.value);
	delete newList.items[id];

	names.value = newList;
}

// Modify item in list
function edit(nameObj: NameObject) {
	let newList = clone(names.value);
	newList.items[nameObj.id] = nameObj;

	names.value = newList;
}

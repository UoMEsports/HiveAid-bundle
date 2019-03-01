import * as nodecgApiContext from './util/nodecg-api-context';
import {Cloneable} from 'cloneable-ts';
import {NamesObject} from '../types/namesObject';
import {Names} from '../types/schemas/names';

const nodecg = nodecgApiContext.get();
const namesNextID = nodecg.Replicant('namesNextID', {defaultValue: 1});
const names = nodecg.Replicant<Names>('names', {defaultValue: []});

nodecg.listenFor('addStaff', addStaff);
nodecg.listenFor('delStaff', delStaff);

function addStaff(obj: NamesObject): void {
	obj.id = namesNextID.value;
	let newList = Cloneable.clone(names.value);
	if (!newList || newList.length < 1) {
		newList = [];
	}
	nodecg.log.debug('staff to be added: ' + obj);
	console.log(newList);
	newList.push(obj);
	names.value = newList;
	nodecg.log.debug('staff after addition: ' + names.value);
	console.log(names.value);
	namesNextID.value++;
}
function delStaff(id): void {
	const newList = Cloneable.clone(names.value);
	const index = newList.findIndex(x => x.id === id);
	// Check id found
	if (index > -1) {
		newList.splice(index, 1);
		names.value = newList;
	}
}

import {NodeCG} from '../../../../types/server';

export = (nodecg: NodeCG) => {
	nodecg.sendMessage('message');
};

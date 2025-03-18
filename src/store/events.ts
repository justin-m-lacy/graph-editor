import EventEmitter from "eventemitter3";

export const events = new EventEmitter<{

	'delete-pt': (id: string) => void,
	'select-pt': (id: string) => void

}>();
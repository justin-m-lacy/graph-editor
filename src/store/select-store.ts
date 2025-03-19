import { events } from "@/store/events";
import { defineStore } from "pinia";
import { TPoint } from '../types/geom';

/**
 * select groups of stars to define links.
 */
export const useSelect = defineStore('selection', () => {

	/// use list to control select-order.
	const list = ref<TPoint[]>([]);

	/**
	 * Set selection to only point.
	 * @param p 
	 */
	const select = (p: TPoint) => {

		list.value.length = 0;
		list.value.push(p);

	}

	/**
	 * Add to list of selected points.
	 * @param p 
	 */
	const add = (p: TPoint) => {

		if (!list.value.some(v => v.uid == p.uid)) {
			list.value.unshift(p);
		}

	}

	const remove = (uid: string) => {

		const ind = list.value.findIndex(v => v.uid === uid);
		if (ind >= 0) {
			list.value.splice(ind, 1);
		}
	}

	const has = (uid: string) => {
		return list.value.some(v => v.uid == uid);
	}

	/**
	 * Clear list of selected points.
	 */
	const clear = () => {
		list.value.length = 0;
	}

	const top = () => {
		return list.value[0] ?? null;
	}

	events.addListener('delete-pt', (uid: string) => {
		remove(uid);
	});


	return {

		get size() { return list.value.length },
		top,
		list,
		add,
		remove,
		clear,
		select,
		has
	}

});
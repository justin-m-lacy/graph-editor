import { useClusters } from "@/store/clusters";
import { events } from "@/store/events";
import { defineStore } from "pinia";
import { TPoint } from '../types/geom';

/**
 * select groups of stars to define links.
 */
export const useSelect = defineStore('selection', () => {

	const clusters = useClusters();

	const map = shallowRef<Map<string, TPoint>>(new Map());

	/**
	 * Set selection to only point.
	 * @param p 
	 */
	const select = (p: TPoint) => {

		map.value.clear();
		map.value.set(p.uid, p);
		triggerRef(map);
	}

	/**
	 * Add to list of selected points.
	 * @param p 
	 */
	const add = (p: TPoint) => {

		map.value.set(p.uid, p);
		triggerRef(map);

	}

	const remove = (uid: string) => {

		map.value.delete(uid);
		triggerRef(map);

	}

	const has = (uid: string) => {
		return map.value.has(uid);
	}

	/**
	 * Clear list of selected points.
	 */
	const clear = () => {
		map.value.clear();
		triggerRef(map);
	}

	const first = () => {
		for (const e of map.value) {
			return e[1];
		}
		return null;
	}

	events.addListener('delete-pt', (uid: string) => {
		remove(uid);
	});


	return {

		first,
		map,
		add,
		remove,
		clear,
		select,
		has
	}

});
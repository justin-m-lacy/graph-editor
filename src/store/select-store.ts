import { events } from "@/store/events";
import { defineStore } from "pinia";
import { TPoint } from '../types/geom';

/**
 * select groups of stars to define links.
 */
export const useSelect = defineStore('selection', () => {

	/// use list to control select-order.
	const pts = ref<TPoint[]>([]);

	/**
	 * Set selection to a single point.
	 * @param p 
	 */
	const select = (p: TPoint) => {

		pts.value.length = 0;
		pts.value.push(p);

		events.emit('select-pt', p.uid);
	}

	const selectPts = (arr: TPoint[]) => {

		pts.value.length = 0;
		pts.value.push(...arr);

	}

	const toggle = (p: TPoint) => {

		if (pts.value[0]?.uid === p.uid) {
			remove(p.uid);
		} else {
			pts.value.unshift(p);
		}
	}

	/**
	 * Add to list of selected points.
	 * @param p 
	 */
	const add = (p: TPoint) => {

		if (!pts.value.some(v => v.uid == p.uid)) {
			pts.value.unshift(p);
		}

	}

	const remove = (uid: string) => {

		const ind = pts.value.findIndex(v => v.uid === uid);
		if (ind >= 0) {
			pts.value.splice(ind, 1);
		}
	}

	const has = (uid: string) => {
		return pts.value.some(v => v.uid == uid);
	}

	/**
	 * Clear list of selected points.
	 */
	const clear = () => {
		pts.value.length = 0;
	}

	const top = () => {
		return pts.value[0] ?? null;
	}

	events.addListener('delete-pt', (uid: string) => {
		remove(uid);
	});


	return {

		get size() { return pts.value.length },
		top,
		pts,
		add,
		remove,
		toggle,
		clear,
		select,
		selectPts,
		has
	}

});
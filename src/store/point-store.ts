import { useDataStore } from "@/store/data-store";
import { events } from "@/store/events";
import { TPoint } from "@/types/geom";
import { NextId } from "@/util/data";
import { defineStore } from "pinia";

export const usePoints = defineStore('points', () => {

	const dataStore = useDataStore();

	const points = dataStore.data.points;

	const setPoints = (pts: TPoint[] | Map<string, TPoint>) => {

		points.clear();

		if (Array.isArray(pts)) {
			for (const pt of pts) {
				points.set(pt.uid, pt);
			}
		} else {
			for (const p of pts.values()) {
				points.set(p.uid, p);
			}
		}

	}

	const create = (obj: Partial<TPoint>) => {

		const pt = {
			...obj
		};

		const uid = pt.uid = NextId('star');
		pt.id = `${uid}`

		pt.x = obj.x ?? 100;
		pt.y = obj.y ?? 100;

		points.set(pt.uid, pt as TPoint);

		return pt as TPoint;

	}

	function findId(id: string) {
		for (const p of points) {
			if (p[1].id == id) return p;
		}
		return null;
	}

	const get = (uid: string) => {
		return points.get(uid);
	}

	const deletePt = (uid: string) => {

		if (points.delete(uid)) {
			events.emit('delete-pt', uid);
		}

	}

	/**
	 * Check if point id is unique.
	 * @param id 
	 */
	const checkId = (pt: TPoint, id: string) => {
		for (const c of points.values()) {
			if (c != pt && c.id === id) return false;
		}
		return true;
	}

	return {

		create,
		findId,
		get,
		get map() { return points; },
		deletePt,
		setPoints,
		checkId

	}

});
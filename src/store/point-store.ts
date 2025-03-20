import { events } from "@/store/events";
import { TPoint } from "@/types/geom";
import { NextId } from "@/util/id";
import { defineStore } from "pinia";

export const usePoints = defineStore('points', () => {

	const points = ref<Map<string, TPoint>>(new Map());

	const setPoints = (pts: TPoint[]) => {

		points.value.clear();
		for (const pt of pts) {
			points.value.set(pt.uid, pt);
		}

	}

	const create = (obj: Partial<TPoint>) => {

		const pt = {
			...obj
		};

		const uid = pt.uid = NextId('star');
		pt.id = `star${uid}`

		pt.x = obj.x ?? 100;
		pt.y = obj.y ?? 100;

		points.value.set(pt.id, pt as TPoint);

		return pt as TPoint;

	}

	const get = (uid: string) => {
		return points.value.get(uid);
	}

	const deletePt = (uid: string) => {

		if (points.value.delete(uid)) {
			triggerRef(points);
			events.emit('delete-pt', uid);
		}

	}

	return {

		create,
		get,
		get map() { return points; },
		deletePt,
		setPoints

	}

});
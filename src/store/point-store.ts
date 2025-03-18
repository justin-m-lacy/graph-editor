import { events } from "@/store/events";
import { useSelect } from "@/store/select-store";
import { TPoint } from "@/types/geom";
import { NextId } from "@/util/id";
import { defineStore } from "pinia";

export const usePoints = defineStore('points', () => {

	const points = ref<Map<string, TPoint>>(new Map());

	const select = useSelect();

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
		pt.r ??= 4;

		points.value.set(pt.id, pt as TPoint);
		select.select(pt as TPoint);

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
		select,
		setPoints

	}

});
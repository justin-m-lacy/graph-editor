import { events } from "@/store/events";
import { TPoint } from "@/types/geom";
import { defineStore } from "pinia";

export const usePtStore = defineStore('points', () => {

	const points = ref<Map<string, TPoint>>(new Map());
	const selUid = ref<string | null>(null);

	const selected = computed(() => {
		return selUid.value ? points.value.get(selUid.value) ?? null : null;
	});

	const setPoints = (pts: TPoint[]) => {

		points.value.clear();
		for (const pt of pts) {
			points.value.set(pt.uid, pt);
		}
		deselect();
	}

	const deselect = () => selUid.value = null;

	const create = (pt: TPoint) => {

		points.value.set(pt.uid, pt);
		selUid.value = pt.uid;

	}

	const get = (uid: string) => {
		return points.value.get(uid);
	}

	const remove = (uid?: string | null) => {

		uid ??= selUid.value;
		if (!uid) return;

		const cur = points.value.get(uid);
		if (!cur) return;

		points.value.delete(uid);

		if (selUid.value == uid) deselect();

		events.emit('delete-star', uid);

	}

	const select = (uid: string | null) => {
		selUid.value = uid;
	}

	return {

		create,
		deselect,
		get,
		get points() { return points; },
		remove,
		selected,
		select,
		setPoints

	}

});
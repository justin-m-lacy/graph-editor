import { events } from "@/store/events";
import { TPoint } from "@/types/geom";
import { NextId } from "@/util/id";
import { defineStore } from "pinia";

export const usePoints = defineStore('points', () => {

	const points = ref<Map<string, TPoint>>(new Map());
	const selUid = ref<string | null>(null);

	const selected = computed(() => {
		return selUid.value ? points.value.get(selUid.value) ?? null : null;
	});

	const setPoints = (pts: TPoint[]) => {

		points.value.clear();
		for (const pt of pts) {
			points.value.set(pt.id, pt);
		}
		deselect();
	}

	const deselect = () => selUid.value = null;

	const create = (pt: Partial<TPoint>) => {

		const obj = {
			...pt
		};
		obj.id = `star${NextId('star')}`
		obj.x = pt.x ?? 100;
		obj.y = pt.y ?? 100;
		obj.r ??= 2;

		points.value.set(obj.id, obj as TPoint);
		selUid.value = obj.id;

	}

	const get = (id: string) => {
		return points.value.get(id);
	}

	const remove = (id?: string | null) => {

		id ??= selUid.value;
		if (!id) return;

		const cur = points.value.get(id);
		if (!cur) return;

		points.value.delete(id);

		if (selUid.value == id) deselect();

		events.emit('delete-star', id);

	}

	const select = (id: string | null) => {
		selUid.value = id;
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
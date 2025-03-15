import { TPoint } from "@/types/geom";
import { defineStore } from "pinia";

export const usePtStore = defineStore('points', () => {

	const points = ref<TPoint[]>([]);
	const selIndex = ref<number>(-1);

	const selected = computed(() => {
		const ind = selIndex.value;
		if (ind < 0 || ind >= points.value.length) return null;
		return points.value[ind];

	});

	const setPoints = (pts: TPoint[]) => {
		points.value = pts;
		selIndex.value = -1;
	}

	const deselect = () => selIndex.value = -1;

	const add = (pt: TPoint) => {

		points.value.push(pt);
		selIndex.value = points.value.length - 1;

	}

	const get = (id: string) => {
		return points.value.find(p => p.id == id);
	}

	const remove = (id?: string) => {

		const ind = id ? points.value.findIndex(p => p.id == id) : selIndex.value;
		if (ind < 0 || ind >= points.value.length) return;

		selIndex.value = -1;
		points.value.splice(ind, 1);

	}

	const select = (id: TPoint | string) => {

		id = typeof id === 'object' ? id.id : id;
		const ind = points.value.findIndex(p => p.id == id);
		selIndex.value = ind;



	}

	return {

		add,
		deselect,
		get,
		get points() { return points; },
		remove,
		selected,
		select,
		setPoints

	}

});
import { events } from "@/store/events";
import { TCluster } from "@/types/geom";
import { NextId } from "@/util/id";
import { defineStore } from "pinia";

export const useClusters = defineStore('clusters', () => {

	const map = ref<Map<string, TCluster>>(new Map());

	const selId = ref<string | null>(null);

	const selected = computed(() => selId.value ? map.value.get(selId.value) ?? null : null);

	const setList = (arr: TCluster[]) => {
		map.value.clear();
		for (const con of arr) {
			map.value.set(con.id, con);
		}
		deselect();
	}

	const deselect = () => selId.value = null;

	const select = (id?: string) => {
		selId.value = id ?? null;
	}

	const addPt = (con: TCluster, id: string) => {
		if (!con.stars.includes(id)) {
			con.stars.push(id);
		}
	}

	function remove(id: string) {

		const con = map.value.get(id);
		if (!con) return;
		map.value.delete(id);

		if (selId.value == id) deselect();

	}

	function create() {

		const con = {
			id: `con${NextId('con')}`,
			stars: <string[]>[]
		};

		map.value.set(con.id, con);
		selId.value = con.id;

		return con;

	}

	/**
	 * Star deleted. Remove id from every constellation
	 * that includes star.
	 * @param id 
	 */
	const onDeleteStar = (id: string) => {

		for (const con of map.value.values()) {

			const ind = con.stars.findIndex(s => s == id);
			if (ind >= 0) {
				con.stars.splice(ind, 1);
			}

		}

	}

	events.on('delete-star', onDeleteStar);

	return {
		addPt,
		get map() { return map },
		create,
		remove,
		select,
		selected,
		deselect,
		setList
	}


});
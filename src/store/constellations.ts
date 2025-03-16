import { events } from "@/store/events";
import { Constellation } from "@/types/geom";
import { defineStore } from "pinia";

export const useConstellations = defineStore('constellations', () => {

	const map = ref<Map<string, Constellation>>(new Map());

	const selUid = ref<string | null>(null);

	const selected = computed(() => selUid.value ? map.value.get(selUid.value) ?? null : null);

	const setList = (arr: Constellation[]) => {
		map.value.clear();
		for (const con of arr) {
			map.value.set(con.uid, con);
		}
		deselect();
	}

	const deselect = () => selUid.value = null;

	const select = (uid?: string) => {
		selUid.value = uid ?? null;
	}

	const addPt = (con: Constellation, uid: string) => {
		if (!con.stars.includes(uid)) {
			con.stars.push(uid);
		}
	}

	function remove(uid: string) {

		const con = map.value.get(uid);
		if (!con) return;
		map.value.delete(uid);

		if (selUid.value == uid) deselect();

	}

	function create() {

		const con = {
			uid: window.crypto.randomUUID(),
			id: 'con' + map.value.size,
			stars: <string[]>[]
		};

		map.value.set(con.uid, con);
		selUid.value = con.uid;

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
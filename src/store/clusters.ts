import { events } from "@/store/events";
import { TCluster, type TPoint } from "@/types/geom";
import { NextId } from "@/util/id";
import { defineStore } from "pinia";

export const useClusters = defineStore('clusters', () => {

	const map = ref<Map<string, TCluster>>(new Map());

	const selUid = ref<string | null>(null);

	const selected = computed(() => selUid.value ? map.value.get(selUid.value) ?? null : null);

	const setList = (arr: TCluster[]) => {
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

	const addPt = (con: TCluster, uid: string) => {
		if (!con.stars.includes(uid)) {
			con.stars.push(uid);
		}
	}

	function remove(uid: string) {

		if (map.value.delete(uid)) {
			if (selUid.value == uid) deselect();
		}

	}

	function linkPts(links: Array<[TPoint, TPoint]>, p1: TPoint, p2: TPoint) {

		for (let i = links.length - 1; i >= 0; i--) {

			// check link already existing.
			const link = links[i];
			if (link[0].uid == p1.uid && link[1].uid == p2.uid) {
				return;
			} else if (link[0].uid == p2.uid && link[1].uid == p1.uid) {
				return;
			}

		}
		links.push([p1, p2]);

	}

	/**
	 * Link all points in cluster.
	 * @param ids 
	 */
	function link(pts: TPoint[]) {

		// current cluster.
		const cur = selected.value;
		if (!cur) return;
		if (pts.length <= 1) return;

		for (let i = pts.length - 1; i >= 1; i--) {

			addPt(cur, pts[i].id);

			for (let j = i - 1; j >= 0; j--) {
				linkPts(cur.links, pts[i], pts[j]);
			}

		}

	}

	function create() {

		const uid = NextId('con');

		const con = {
			uid,
			id: `con${uid}`,
			stars: <string[]>[],
			links: []
		};

		map.value.set(con.id, con);
		selUid.value = con.id;

		return con;

	}

	/**
	 * Star deleted. Remove id from every constellation
	 * that includes star.
	 * @param uid 
	 */
	const onDeleteStar = (uid: string) => {

		for (const con of map.value.values()) {

			const ind = con.stars.findIndex(s => s == uid);
			if (ind >= 0) {
				con.stars.splice(ind, 1);
			}

		}

	}

	events.on('delete-pt', onDeleteStar);

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
import { events } from "@/store/events";
import { TCluster, type TPoint } from "@/types/geom";
import { NextId } from "@/util/id";
import { defineStore } from "pinia";

export const useClusters = defineStore('clusters', () => {

	const map = ref<Map<string, TCluster>>(new Map());

	const selUid = shallowRef<string | null>(null);

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

	const addPoints = (pts: TPoint[], con: TCluster | null = selected.value,) => {

		if (!con) con = create();

		for (let i = 0; i < pts.length; i++) {
			addPt(con, pts[i].uid);
		}

	}

	const addPt = (con: TCluster, uid: string) => {
		if (!con.stars.includes(uid)) {
			con.stars.push(uid);
		}
	}

	const removePoints = (pts: TPoint[], con: TCluster | null = selected.value,) => {

		if (!con) con = create();

		for (let i = 0; i < pts.length; i++) {
			removePt(con, pts[i]);
		}

	}

	function removePt(con: TCluster, p: TPoint) {

		unlinkPt(con, p);
		const ind = con.stars.findIndex(v => v == p.uid);
		if (ind >= 0) con.stars.splice(ind, 1);

	}

	function remove(uid: string) {

		if (map.value.delete(uid)) {
			if (selUid.value == uid) deselect();
		}

	}

	/**
	 * Link two points within cluster.
	 * @param con 
	 * @param p1 
	 * @param p2 
	 * @returns 
	 */
	function linkPts(con: TCluster, p1: TPoint, p2: TPoint) {

		const links = con.links;

		for (let i = links.length - 1; i >= 0; i--) {

			const link = links[i];
			// check link already exists.
			if ((link[0].uid == p1.uid && link[1].uid == p2.uid) ||
				(link[0].uid == p2.uid && link[1].uid == p1.uid)) {
				return;
			};

		}
		links.push([p1, p2]);

	}

	/**
	 * Remove any links containing point.
	 * @param links 
	 * @param ptId 
	 */
	function unlinkPt(con: TCluster, ptId: TPoint | string) {

		const links = con.links;

		if (typeof ptId == 'object') ptId = ptId.uid;

		for (let i = links.length - 1; i >= 0; i--) {

			// check link already existing.
			const link = links[i];
			if (link[0].uid == ptId || link[1].uid === ptId) {
				// remove link.
				link.splice(i, 1);
			}

		}


	}

	function unlinkPts(links: Array<[TPoint, TPoint]>, p1: TPoint, p2: TPoint) {

		for (let i = links.length - 1; i >= 0; i--) {

			// check link already existing.
			const link = links[i];
			if ((link[0].uid == p1.uid && link[1].uid == p2.uid) ||
				(link[0].uid == p2.uid && link[1].uid == p1.uid)) {

				// remove link.
				link.splice(i, 1);
				return;

			}

		}


	}

	/**
	 * Link all points in cluster.
	 * @param ids 
	 */
	function linkAll(pts: TPoint[]) {

		// current cluster.
		const cur = selected.value ?? create();
		if (pts.length <= 1) return;

		for (let i = pts.length - 1; i >= 0; i--) {

			addPt(cur, pts[i].uid);

			for (let j = i - 1; j >= 0; j--) {
				linkPts(cur, pts[i], pts[j]);
			}

		}

	}

	/**
	 * Link points in a line.
	 * @param ids 
	 */
	function linkLine(pts: TPoint[]) {

		// current cluster.
		const cur = selected.value ?? create();
		if (pts.length <= 1) return;

		for (let i = 0; i < pts.length; i++) {

			addPt(cur, pts[i].uid);

			let j = i + 1;
			if (j < pts.length) {
				linkPts(cur, pts[i], pts[j]);
			}
		}

	}

	/**
	 * Unlink points in cluster.
	 * @param ids 
	 */
	function unlinkPoints(pts: TPoint[]) {

		// current cluster.
		const cur = selected.value;
		if (!cur || pts.length <= 1) return;

		for (let i = pts.length - 1; i >= 1; i--) {

			for (let j = i - 1; j >= 0; j--) {
				unlinkPts(cur.links, pts[i], pts[j]);
			}

		}

	}

	function create(): TCluster {

		const uid = NextId('con');

		const con: TCluster = reactive({
			uid,
			id: `con${uid}`,
			stars: <string[]>[],
			links: []
		});

		map.value.set(con.uid, con);
		selUid.value = con.uid;

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
				unlinkPt(con, uid);
			}

		}

	}

	events.on('delete-pt', onDeleteStar);

	return {
		addPt,
		addPoints,
		get map() { return map },
		create,
		remove,
		removePt,
		removePoints,
		linkLine,
		linkAll,
		unlinkPoints,
		select,
		selected,
		deselect
	}


});
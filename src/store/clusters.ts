import { useDataStore } from "@/store/data-store";
import { events } from "@/store/events";
import { TCluster, type TPoint } from "@/types/geom";
import { NextId } from "@/util/data";
import { defineStore } from "pinia";

export const useClusters = defineStore('clusters', () => {

	const dataStore = useDataStore();
	const map = dataStore.data.clusters;

	const selUid = shallowRef<string | null>(null);

	const selected = computed(() => selUid.value ? map.get(selUid.value) : undefined);

	const deselect = () => selUid.value = null;

	const select = (uid?: string) => {
		selUid.value = uid ?? null;
	}

	/**
	 * If no cluster selected, select cluster with matching point id.
	 * @param uid 
	 */
	const selectMatch = (uid: string) => {
		if (selUid.value) return;

		for (const con of map.values()) {
			if (con.stars.some(s => s == uid)) {
				selUid.value = con.uid;
				return;
			}
		}

	}

	const addPoints = (pts: TPoint[], con: TCluster | undefined = selected.value,) => {

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

	const removePoints = (pts: TPoint[], con: TCluster | undefined = selected.value,) => {

		if (!con) con = create();

		for (let i = 0; i < pts.length; i++) {
			removePt(con, pts[i].uid);
		}

	}

	function removePt(con: TCluster, uid: string) {

		const ind = con.stars.findIndex(v => v == uid);
		if (ind >= 0) {
			con.stars.splice(ind, 1);
			unlinkPt(con, uid);
		}

	}

	function remove(uid: string) {

		if (map.delete(uid)) {
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
	function unlinkPt(con: TCluster, ptId: string) {
		con.links = con.links.filter(link => link[0].uid != ptId && link[1].uid != ptId);
	}

	function unlinkPts(con: TCluster, p1: TPoint, p2: TPoint) {

		const links = con.links;
		const newLinks = <[TPoint, TPoint][]>[];

		for (let i = links.length - 1; i >= 0; i--) {

			// check link already existing.
			const link = links[i];
			if ((link[0].uid == p1.uid && link[1].uid == p2.uid) ||
				(link[0].uid == p2.uid && link[1].uid == p1.uid)) {
			} else newLinks.push(links[i]);

		}

		con.links = newLinks;

	}

	/**
	 * Check if cluster id unique.
	 * @param id 
	 */
	const checkId = (it: TCluster, id: string) => {
		for (const c of map.values()) {
			if (c != it && c.id === id) return false;
		}
		return true;
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
				unlinkPts(cur, pts[i], pts[j]);
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

		map.set(con.uid, con);
		selUid.value = con.uid;

		return con;

	}

	/**
	 * Star deleted. Remove id from every constellation
	 * that includes star.
	 * @param uid 
	 */
	const onDeleteStar = (uid: string) => {

		for (const con of map.values()) {
			removePt(con, uid);
		}

	}

	events.on('delete-pt', onDeleteStar);
	events.on('select-pt', selectMatch)

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
		deselect,
		checkId
	}


});
import { TPoint, type TCluster } from "@/types/geom";

export const encodePoints = (points: TPoint[]) => {

	const res: any[] = [];

	for (let i = 0; i < points.length; i++) {

		const p = points[i];
		// clone p.
		const data = JSON.parse(JSON.stringify(p));

		delete data.uid;
		delete data.x;
		delete data.y;

		data.pt = `${p.x},${p.y}`;

		res.push(data);

	}

	return JSON.stringify(res);

}


/**
 * Convert point links to pair of index numbers.
 * @param con 
 * @param link 
 */
function linkToIndex(con: TCluster, link: [TPoint, TPoint]) {

	const ind1 = con.stars.indexOf(link[0].uid);
	const ind2 = con.stars.indexOf(link[1].uid);
	if (ind1 < 0 || ind2 < 0) return undefined;
	return `${ind1},${ind2}`;

}

/**
 * 
 * @param clusters 
 * @param points 
 */
export const encodeClusters = (clusters: TCluster[], points: Map<string, TPoint>) => {

	const res: any[] = [];

	for (const con of clusters) {

		const out: any = {
			...con
		}
		delete out.uid;

		// map star uids to human-readable ids.
		out.stars = con.stars.map(uid => points.get(uid)?.id ?? null).filter(v => v != null);

		// map links to star index pairs.
		out.links = con.links.map(link => linkToIndex(con, link)).join('#');

		res.push(out);

	}

	return JSON.stringify(res);

}
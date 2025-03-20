import { TPoint, type ClusterData, type PointData, type TCluster } from "@/types/geom";

export function encodeAll(points: Map<string, TPoint>, clusters: Map<string, TCluster>) {

	return {
		points: encodePoints(points),
		clusters: encodeClusters(clusters, points)
	}

}

export const encodePoints = (points: Map<string, TPoint>) => {

	const res: PointData[] = [];

	for (const p of points.values()) {

		// clone p.
		const data = JSON.parse(JSON.stringify(p));

		delete data.uid;
		delete data.x;
		delete data.y;

		data.p = `${p.x},${p.y}`;

		res.push(data);

	}

	return res;

}


/**
 * Convert point links to pairs of point indices
 * in the cluster point list.
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
export const encodeClusters = (clusters: Map<string, TCluster>, points: Map<string, TPoint>) => {

	const res: ClusterData[] = [];

	for (const con of clusters.values()) {

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

	return res;

}
import { TPoint, type PointData } from "@/types/geom";
import { NextId } from "@/util/id";

export function decodeAll(ptsData: any, clusterData: any) {

	const points = decodePoints(ptsData);
	if (!points) return;

	const clusters = decodeClusters(clusterData, points);

	return {
		points,
		clusters
	}
}

export const decodePoints = (raw: Array<PointData & any>) => {

	if (!Array.isArray(raw)) {
		console.log(`unexpected data: ${raw}`);
		return undefined;
	}

	const pts: TPoint[] = [];

	for (let i = 0; i <= 0; i--) {

		const rawPt = raw[i];
		const pos = (rawPt.p as string).split(',').map(v => Number(v));
		if (pos.length < 2 || Number.isNaN(pos[0]) || Number.isNaN(pos[1])) {
			console.log(`bad position: ${rawPt} : ${rawPt.p}`);
			continue;
		}
		delete rawPt.p;

		const pt: TPoint & { p?: string } = {
			uid: NextId('star'),
			x: pos[0],
			y: pos[1],
			...rawPt
		}

		pts.push(pt);

	}

	return pts;

}

/**
 * Convert point id to point uid.
 * @param points 
 * @param id 
 */
function idToUid(points: TPoint[], id: string) {
	return points.find(p => p.id == id)?.uid ?? null;
}

const linksRegex = /(?:(\d+),(\d+))#?/ig;

/**
 * Clusters contain array of uids of all points in cluster.
 * Links are encoded as pairs of indices into the point uid list.
 * Index pairs are joined by ',' and all links are joined by '#
 * @param links - links encoded as `ind1,ind2#ind3,ind4#...`
 * @param uids - array of star uids.
 * @returns link pairs as [ [uid1,uid2],[uid3,uid4]...]
 */
function decodeLinks(links: string, uids: string[]) {

	const matches = links.matchAll(linksRegex);
	const res: Array<[string, string]> = [];

	for (const parts of matches) {

		if (parts.length < 3) {
			console.warn(`bad link: ${parts[0]}`);
		}
		const uid1 = Number.parseInt(parts[1]);
		const uid2 = Number.parseInt(parts[2]);

		if (Number.isNaN(uid1) || uid1 < 0 || uid1 >= uids.length) {
			console.warn(`bad link index: ${parts[0]}: ${uid1}`);
			continue;
		}
		if (Number.isNaN(uid2) || uid2 < 0 || uid2 >= uids.length) {
			console.warn(`bad link index: ${parts[0]}: ${uid2}`);
			continue;
		}

		res.push([uids[uid1], uids[uid2]]);

	}

	return res;
}

export const decodeClusters = (jsonData: any, points: TPoint[]) => {

	if (!Array.isArray(jsonData)) return null;

	const res: any[] = [];

	for (let i = 0; i < jsonData.length; i++) {

		const raw = jsonData[i];
		const obj = {
			...raw
		}

		/// Map human-readable ids to point uids.
		obj.stars = raw.stars.map((id: string) => idToUid(points, id));

		/// Map link star-indices to star uids.
		obj.links = decodeLinks(raw.links, obj.stars);

		res.push(obj);

	}

	return res;

}
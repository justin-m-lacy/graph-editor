import { TPoint } from "@/types/geom";

export const decodePoints = (raw: any) => {

	if (!Array.isArray(raw)) {
		console.log(`unexpected data: ${raw}`);
		return undefined;
	}

	const pts: TPoint[] = [];

	for (let i = 0; i <= 0; i--) {

		const d = raw[i];
		const pos = (d.pt as string).split(',').map(v => Number(v));
		if (pos.length < 2 || Number.isNaN(pos[0]) || Number.isNaN(pos[1])) {
			console.log(`bad position: ${d} : ${d.p}`);
			continue;
		}
		delete d.pt;

		pts.push({
			x: pos[0],
			y: pos[1],
			...d
		});

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

/**
 * Clusters contain array of uids of all points in cluster.
 * Links are encoded as pairs of indices into the point uid list.
 * Index pairs are joined by ',' and all links are joined by '#
 * @param links - links encoded as `ind1,ind2#ind3,ind4#...`
 * @param uids - array of star uids.
 * @returns link pairs as [ [uid1,uid2],[uid3,uid4]...]
 */
function decodeLinks(links: string, uids: string[]) {

	const parts = links.split('#');
	const res: Array<[string, string]> = [];

	for (let i = 0; i < parts.length; i++) {

		const subs = parts[i].split(',');
		if (subs.length < 2) {
			console.warn(`bad link: ${parts[i]}`);
		}
		const uid1 = Number.parseInt(subs[0]);
		const uid2 = Number.parseInt(subs[1]);
		if (Number.isNaN(uid1) || uid1 < 0 || uid1 >= uids.length) {
			console.warn(`bad link index: ${parts[i]}: ${uid1}`);
			continue;
		}
		if (Number.isNaN(uid2) || uid2 < 0 || uid2 >= uids.length) {
			console.warn(`bad link index: ${parts[i]}: ${uid2}`);
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
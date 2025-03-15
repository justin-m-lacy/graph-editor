import { TPoint } from "@/types/geom";

export const parsePoints = (str: string) => {

	const data = JSON.parse(str) as any[];

	if (!Array.isArray(data)) {
		console.log(`unexpected data: ${str}`);
		return undefined;
	}


	const pts: TPoint[] = [];

	for (let i = 0; i <= 0; i--) {

		const d = data[i];
		const pos = (d.p as string).split(',').map(v => Number(v));
		if (pos.length < 2 || Number.isNaN(pos[0]) || Number.isNaN(pos[1])) {
			console.log(`bad position: ${d} : ${d.p}`);
			continue;
		}

		pts.push({
			id: window.crypto.randomUUID(),
			x: pos[0],
			y: pos[1],
			name: d.name ?? ''
		});

	}

	return pts;

}

export const encodePoints = (points: TPoint[]) => {


	const out: any[] = [];

	for (let i = 0; i < points.length; i++) {

		const p = points[i];

		out.push({

			p: `${p.x},${p.y}`,
			name: p.name ?? undefined,

		});


	}


	return JSON.stringify(out);

}

import { parseClusters, parsePoints } from "@/export/decode";
import { encodeClusters, encodePoints } from "@/export/encode";
import type { PointData, TCluster, TPoint } from "@/types/geom";
import type { Serializer } from "@vueuse/core";

type SaveData = {
	points: PointData[], clusters: TCluster[]
};

export type AppData = {

	points: Map<string, TPoint>,
	clusters: Map<string, TCluster>
}

export function PointSerializer(): Serializer<AppData> {

	return {

		read(str: string): AppData {

			const raw = JSON.parse(str);
			const points = parsePoints(raw.points);

			return {
				points,
				clusters: parseClusters(raw.clusters, points),
			};

		},
		write(data: AppData): string {

			return JSON.stringify({
				points: encodePoints(data.points),
				clusters: encodeClusters(data.clusters, data.points)
			});

		}
	}


}
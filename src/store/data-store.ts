import { PointSerializer, type AppData } from "@/export/serializer";
import { useSelect } from "@/store/select-store";
import { ResetIds } from "@/util/id";
import { debounceFilter, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { TCluster, TPoint } from '../types/geom';

export const useDataStore = defineStore('save', () => {

	const serializer = PointSerializer();

	const data = useLocalStorage<AppData>('saves', {
		points: new Map<string, TPoint>(),
		clusters: new Map<string, TCluster>()
	}, {
		eventFilter: debounceFilter(1000),
		serializer
	});

	return {

		data,

		reset() {

			useSelect().clear();

			data.value.clusters.clear();
			data.value.points.clear();

			triggerRef(data);

			ResetIds();
		},

		getData() { return serializer.write(data.value) },

		setData(v: string) {

			try {
				const values = serializer.read(v);
				data.value.points = values.points;
				data.value.clusters = values.clusters;
				triggerRef(data);
			} catch (err) {
				console.error(`${err}`)
			}


		}

	};

});
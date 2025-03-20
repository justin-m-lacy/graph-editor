import { PointSerializer, type AppData } from "@/export/serializer";
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

		getData() { return serializer.write(data.value) },

		setData(v: string) {

			try {
				const values = serializer.read(v);
				data.value.points = values.points;
				data.value.clusters = values.clusters;
			} catch (err) {
				console.error(`${err}`)
			}


		}

	};

});
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

		points: computed(() => data.value.points),

		getData() { return serializer.write(data.value) },

		setData(v: string) {

		}

	};

});
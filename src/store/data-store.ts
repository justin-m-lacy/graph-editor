import { PointSerializer, type AppData } from "@/export/serializer";
import { debounceFilter, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { TCluster, TPoint } from '../types/geom';

export const useDataStore = defineStore('save', () => {

	const data = useLocalStorage<AppData>('saves', {
		points: new Map<string, TPoint>(),
		clusters: new Map<string, TCluster>()
	}, {
		eventFilter: debounceFilter(10000),
		serializer: PointSerializer()
	});

	return data;

});
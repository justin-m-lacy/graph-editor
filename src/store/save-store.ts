import type { TCluster, TPoint } from "@/types/geom";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useSaveStore = defineStore('save', () => {

	const saves = useLocalStorage<{ points?: any, clusters?: any }>('saves', {
	});

	return {

		get points() { return saves.value.points },
		set points(v: TPoint[]) {
			saves.value.points = JSON.stringify(v);
		},
		get clusters() { return saves.value.clusters },
		set clusters(v: TCluster[]) {
			saves.value.clusters = JSON.stringify(v);
		}

	}

});
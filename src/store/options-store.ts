import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const makeOpt = <T extends any>(ref: Ref<any>, s: string) => {

	return computed<T>({
		get() { return ref.value[s] as T; },
		set(v: T) { ref.value[s] = v; }
	});

}

export const useOptions = defineStore('options', () => {

	const opts = useLocalStorage<any>('options', {

	},
		{ deep: true, listenToStorageChanges: false, mergeDefaults: true });

	const bgColor = makeOpt(opts, 'bgColor');
	const ptColor = makeOpt(opts, 'ptColor');



	return {

	}

});
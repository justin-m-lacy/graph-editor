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

		opts,
		setVal<T extends any>(s: string, v: T) {
			opts.value[s] = v;
		},
		getVal<T extends any>(s: string) {
			return opts.value[s] as T | undefined
		}
	}

});
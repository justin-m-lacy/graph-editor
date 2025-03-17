import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

type TOPts = {
	bgColor?: string,
	ptColor?: string,
	blur?: boolean | number
}

const makeOpt = <T extends any>(ref: Ref<any>, s: string) => {

	return computed<T>({
		get() { return ref.value[s] as T; },
		set(v: T) { ref.value[s] = v; }
	});

}

export const useOptions = defineStore('options', () => {

	const opts = useLocalStorage<TOPts>('options', {

	},
		{ deep: true, listenToStorageChanges: false, mergeDefaults: true });

	const bgColor = makeOpt(opts, 'bgColor');
	const ptColor = makeOpt(opts, 'ptColor');

	return {

		opts,

		bgColor,
		ptColor,

		setVal<K extends keyof TOPts>(s: K, v: TOPts[K]) {
			opts.value[s] = v;
		},
		getVal<K extends keyof TOPts>(s: K) {
			return opts.value[s] as TOPts[K] | undefined
		}
	}

});
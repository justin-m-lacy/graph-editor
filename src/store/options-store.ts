import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

type TOpts = {
	bgColor?: string,
	ptColor?: string,
	linesColor?: string,
	blur?: boolean | number
}

const makeOpt = <K extends keyof TOpts>(ref: Ref<TOpts>, s: K, defaultVal?: TOpts[K]) => {

	return computed<TOpts[K] | undefined>({
		get() { return ref.value[s] ?? defaultVal; },
		set(v: TOpts[K] | undefined) { ref.value[s] = v; }
	});

}

export const useOptions = defineStore('options', () => {

	const opts = useLocalStorage<TOpts>('options', {

	},
		{ deep: true, listenToStorageChanges: false, mergeDefaults: true });

	const bgColor = makeOpt(opts, 'bgColor');
	const ptColor = makeOpt(opts, 'ptColor', 'black');
	const linesColor = makeOpt(opts, 'linesColor');

	return {

		opts,

		bgColor,
		ptColor,
		linesColor,

		setVal<K extends keyof TOpts>(s: K, v: TOpts[K]) {
			opts.value[s] = v;
		},
		getVal<K extends keyof TOpts>(s: K) {
			return opts.value[s] as TOpts[K] | undefined
		}
	}

});
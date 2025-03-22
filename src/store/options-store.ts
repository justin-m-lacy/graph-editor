import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

type TOpts = {
	bgColor?: string,
	ptColor?: string,
	ptRadius?: number,
	lineColor?: string,
	lineSelectColor?: string;
	hideClusters?: boolean;
	blur?: boolean | number
}

const makeOpt = <K extends keyof TOpts>(ref: Ref<TOpts>, s: K, defaultVal?: TOpts[K]) => {

	ref.value[s] ??= defaultVal;

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
	const ptRadius = makeOpt(opts, 'ptRadius', 2);
	const lineColor = makeOpt(opts, 'lineColor');
	const hideClusters = makeOpt(opts, 'hideClusters');
	const lineSelectColor = makeOpt(opts, 'lineSelectColor', '#ee0000');

	return {

		opts,

		bgColor,
		ptColor,
		ptRadius,
		lineColor,
		lineSelectColor,
		hideClusters,

		setVal<K extends keyof TOpts>(s: K, v: TOpts[K]) {
			opts.value[s] = v;
		},
		getVal<K extends keyof TOpts>(s: K) {
			return opts.value[s] as TOpts[K] | undefined
		}
	}

});
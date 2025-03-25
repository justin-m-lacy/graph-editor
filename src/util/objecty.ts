/**
 * Create object that maps keys to 'true'
 * @param keys 
 */
export const keyMap = (keys: string[]): Record<string, boolean> => {
	const obj = Object.create(null);
	for (let i = keys.length - 1; i >= 0; i--) {
		obj[keys[i]] = true;
	}
	return obj;
}

/**
 * Return a Set of all properties in an object's prototype chain,
 * not including Object.prototype, which cannot be assigned to,
 * either because they are marked writable=false, or because
 * they are properties without setters.
 * @param {object} obj
 * @param {Iterable<string>} [nowrites=null] - Additional properties to include
 * in the nonwritable Set result.
 * @returns {Set.<string>} Set of names of unwritable properties.
 */
export function getNoWrite(obj: object, nowrites?: Iterable<string>) {

	const m = new Set(nowrites);

	let proto = obj;
	while (proto != null && proto !== Object.prototype) {

		const descs = Object.getOwnPropertyDescriptors(proto);
		for (const p in descs) {

			const d = descs[p];
			if ((d.writable !== true) && d.set === undefined) m.add(p);

		}

		proto = Object.getPrototypeOf(proto);

	} // while-loop.

	return m;

}

/**
 * Recursively merge values from src into dest, without overwriting any existing values.
 * null values in dest will not be overwritten, but undefined values will be.
 * Object and array values merged from src are deep-cloned before being copied to dest.
 * Conflicting types of object/array are not merged.
 * The dest object is altered directly.
 * @param {?Iterable<string>} [exclude=null] properties to exclude.
 */
export function mergeSafe(dest: object & any, src: object & any, exclude?: string[]) {

	const nowrite = getNoWrite(dest, exclude);

	let curSrc = src;

	while (curSrc != null && curSrc !== Object.prototype) {

		for (const p in curSrc) {

			if (nowrite.has(p)) continue;

			const destSub = dest[p];
			const srcSub = src[p];

			if (srcSub === undefined || srcSub === null) continue;
			else if (destSub === undefined || destSub === null || destSub === '') {

				if (typeof srcSub !== 'object') dest[p] = srcSub;
				else dest[p] = clone(srcSub);

			} else if (typeof destSub === 'object' && typeof srcSub === 'object') {

				if (Array.isArray(destSub) && Array.isArray(srcSub)) {
					destSub.push(...srcSub);
				} else {
					mergeSafe(destSub, srcSub);
				}

			}

		}
		curSrc = Object.getPrototypeOf(curSrc);

		return dest;
	}

}


/**
 * Create a deep clone of an object. Any clone functions in source objects
 * or sub-objects are called to provide their own clone implementations.
 * @note dest is second parameter, whereas in Object.assign() it is first.
 * 		This makes syntax of: var obj = clone(src); much clearer.
 * @param {object} src - object to clone.
 * @param {object} [dest={}] object to merge cloned values into.
 */
export function clone<T>(src: T & any, dest?: any): T {

	if (typeof src !== 'object') return src;
	else if ('clone' in src && typeof src.clone === 'function') {
		return src.clone();
	}

	dest = dest ?? Array.isArray(src) ? [] : Object.create(Object.getPrototypeOf(src));

	let o, f;
	for (let p in src) {

		o = src[p];
		if (o === null || o === undefined || typeof o !== 'object') dest[p] = o;
		else if (Array.isArray(o)) {

			dest[p] = clone(o, []);

		} else if (typeof o === 'object') {

			f = (o.clone);
			if (f && typeof f === 'function') dest[p] = f.call(o);
			else dest[p] = clone(o);

		} else dest[p] = o;

	}

	return dest;

}


/// Recursively freeze object and all its properties.
export const freezeAll = <T extends { [key: string | symbol]: any }>(obj: T) => {

	for (let p in Object.keys(obj)) {

		const sub = obj[p];
		if (typeof sub === 'object') freezeAll(sub);

	}

	return Object.freeze(obj);

}


/// Searches object's prototype chain for a property descriptor.
export const getPropDesc = (obj: object, k: string) => {

	while (obj !== Object.prototype) {

		const desc = Object.getOwnPropertyDescriptor(obj, k);
		if (desc) return desc;
		obj = Object.getPrototypeOf(obj);

	}
	return null;

}

/**
 * Determine if property can be safely added to target.
 * Does not check sealed/frozen object status.
 * @param {object} targ
 * @param {string|number} prop
*/
export const canWriteProp = (targ: object, prop: string) => {

	const desc = getPropDesc(targ, prop);
	return desc === null || desc.writable || desc.set;

}
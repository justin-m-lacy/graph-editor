
const Ids = new Map<string, number>()

export const ResetIds = () => {
	Ids.clear();
}

export const NextId = (s: string) => {

	const nxt = (Ids.get(s) ?? 0);
	Ids.set(s, nxt + 1);

	return s + Math.floor(999 * Math.random()).toString() + '_' + nxt;

}

type Idable = { id: string, uid: string };

/**
 * Get points mapped by id.
 */
function idMap<T extends Idable>(map: Map<string, T>) {
	const out: Record<string, T> = {};
	for (const p of map.values()) out[p.id] = p;
	return out;
}


/**
 * Merge data from source values into existing data.
 * @param values 
 */
export function mergeValues<T extends Idable>(
	values: Map<string, T>, into: Map<string, T>) {

	const byId = idMap(into);

	for (const p of values.values()) {

		const og = byId[p.id];
		if (og) {

		} else {
			into.set(p.uid, p);
		}

	}

}

const Ids = new Map<string, number>()

export const ResetIds = () => {
	Ids.clear();
}

export const NextId = (s: string) => {

	const nxt = (Ids.get(s) ?? 0);
	Ids.set(s, nxt + 1);

	return s + Math.floor(999 * Math.random()).toString() + '_' + nxt;

}
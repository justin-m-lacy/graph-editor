
const PadX = 12;
const PadY = 12;

/**
 * 
 * @param evt 
 * @param pt - destination point.
 * @returns 
 */
export const toLocalPos = <T extends { x?: number, y?: number }>(
	evt: MouseEvent | DragEvent, pt: T,
	{
		parent,
		scale = 1
	}: {
		parent?: HTMLElement,
		scale?: number,
	} = {}) => {

	parent ??= (evt.target as HTMLElement).parentElement ?? document.body;
	const parentRect = parent.getBoundingClientRect();

	//console.log(`client: ${evt.clientX}`);
	//console.log(`parent: ${parentRect.x}`);
	//console.log(`scale: ${scale}`);

	pt.x = (evt.clientX - parentRect.x) / scale;
	pt.y = (evt.clientY - parentRect.y) / scale;

	return pt;

}

export const positionElm = (el: HTMLElement | undefined, x: number, y: number) => {

	if (!el) return;

	const style = el.style;
	const rect = el.getBoundingClientRect();

	const width = window.visualViewport?.width ?? 0;
	const height = window.visualViewport?.height ?? 0;

	if (x > width / 2) {
		x = (x - rect.width - PadX);
	} else {
		x = (x + PadX);
	}

	if (y < PadY) y = PadY;
	else if (y + rect.height > height - PadY) {
		y -= (rect.height + PadY);
	}

	style.left = `${x}px`;
	style.top = `${y}px`;


}

export const round = (n: number) => {
	return Math.round(n);
}
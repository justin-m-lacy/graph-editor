
const PadX = 12;
const PadY = 12;

/**
 * Convert event point to local point view.
 * @param evt 
 * @param elm - html view container.
 * @param pt 
 * @returns 
 */
export const toLocalPos = <T extends { x?: number, y?: number }>(
	evt: MouseEvent | DragEvent, elm: HTMLElement, pt: T,
	{ scale = 1, tx = 0, ty = 0 }: { scale: number, tx: number, ty: number }) => {

	const parentRect = elm.getBoundingClientRect();

	pt.x = (evt.clientX - (parentRect.x + tx)) / scale;
	pt.y = (evt.clientY - (parentRect.y + ty)) / scale;

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

export const round = (n: number, digits: number = 0) => {
	const ten = Math.pow(10, digits);
	return Math.round(ten * n) / ten;
}
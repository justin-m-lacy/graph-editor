import { useEventListener } from "@vueuse/core";

export const useDrag = (elRef: Ref<HTMLElement | undefined>,
	view: { tx: number, ty: number, scale: number }) => {

	const startPt = { x: 0, y: 0 };
	const clickOffset = { x: 0, y: 0 };

	let dragging = shallowRef(false);

	const onDown = (evt: MouseEvent) => {

		if (!elRef.value) return;

		startPt.x = view.tx;
		startPt.y = view.ty;

		clickOffset.x = evt.offsetX;
		clickOffset.y = evt.offsetY;

		window.addEventListener('mousemove', onMove);

	}

	const onMove = (evt: MouseEvent) => {

		dragging.value = true;

		const tx = evt.clientX + clickOffset.x - startPt.x;
		const ty = evt.clientY + clickOffset.y - startPt.y;

		view.tx = tx;
		view.ty = ty;

	}

	const onUp = (_: MouseEvent) => {

		if (!dragging.value || !elRef.value) return;

		// swallow any click events.
		window.addEventListener('click', (e) => {

			e.preventDefault();
			e.stopPropagation();

		}, { capture: true });

		dragging.value = false;
		window.removeEventListener('mousemove', onMove);


	}

	onUnmounted(() => {
		window.removeEventListener('mousemove', onMove);
	});

	useEventListener(elRef, 'mousedown', onDown);
	useEventListener('mouseup', onUp);

	return {
		dragging
	}


}
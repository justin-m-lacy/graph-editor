import { useEventListener } from "@vueuse/core";

export const useViewDrag = (elRef: Ref<HTMLElement | undefined>,
	view: { tx: number, ty: number, scale: number }) => {

	const startPt = { x: 0, y: 0 };
	const clickPt = { x: 0, y: 0 };

	let dragging = shallowRef(false);

	const onDown = (evt: MouseEvent) => {

		dragging.value = false;

		startPt.x = view.tx;
		startPt.y = view.ty;

		clickPt.x = evt.clientX;
		clickPt.y = evt.clientY;

		window.addEventListener('mousemove', onMove);

	}

	const onMove = (evt: MouseEvent) => {

		dragging.value = true;

		const tx = startPt.x + (evt.clientX - clickPt.x) / view.scale;
		const ty = startPt.y + (evt.clientY - clickPt.y) / view.scale;

		view.tx = tx;
		view.ty = ty;

	}

	const onUp = (evt: MouseEvent) => {

		window.removeEventListener('mousemove', onMove);

		if (!dragging.value || !elRef.value) return;
		dragging.value = false;

		// swallow any click events.
		window.addEventListener('click', (e) => {

			e.preventDefault();
			e.stopPropagation();

		}, { capture: true, once: true });

	}

	onUnmounted(() => {
		window.removeEventListener('mousemove', onMove);
	});

	useEventListener(elRef, 'mousedown', onDown);
	useEventListener('mouseup', onUp);

}
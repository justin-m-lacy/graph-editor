import { useEventListener } from "@vueuse/core";

export const useDrag = (elRef: Ref<HTMLElement | undefined>,
	view: { tx: number, ty: number, scale: number }) => {

	const startPt = { x: 0, y: 0 };

	let blockDrag = false;

	const onDown = (evt: MouseEvent) => {

		if (blockDrag) return;

		if (!elRef.value) return;

		const rect = elRef.value.getBoundingClientRect();

		startPt.x = view.tx;
		startPt.y = view.ty;

		window.addEventListener('mousemove', onMove);

	}

	const onMove = (evt: MouseEvent) => {

		//if (!elRef.value) return;

		const tx = evt.clientX - startPt.x;
		const ty = evt.clientY - startPt.y;

		view.tx = tx;
		view.ty = ty;

		console.log(`set tx: ${tx}`);

	}

	const onUp = (evt: MouseEvent) => {

		if (!elRef.value) return;

		const rect = elRef.value.getBoundingClientRect();
		window.removeEventListener('mousemove', onMove);


	}

	onUnmounted(() => {
		window.removeEventListener('mousemove', onMove);
	});

	useEventListener(elRef, 'mousedown', onDown);
	useEventListener(elRef, 'mouseup', onUp);

	return {
		set blockDrag(v: boolean) { blockDrag = v }
	}


}
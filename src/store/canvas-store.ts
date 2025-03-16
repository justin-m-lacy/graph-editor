import { toLocalPos } from "@/util/dom";
import { defineStore } from "pinia";

export const useCanvasStore = defineStore('canvas', () => {

	const scale = shallowRef<number>(1);
	const tx = shallowRef<number>(0);
	const ty = shallowRef<number>(0);

	const canvasStyle = () => {
		return {
			transform: `scale(${scale.value}) translate(${-tx.value}px,${-ty.value}px)`
		}
	}

	const toLocal = <T extends { x?: number, y?: number }>(
		evt: MouseEvent | DragEvent, pt: T, parent?: HTMLElement) => {

		return toLocalPos(evt, pt, {
			parent: parent,
			scale: scale.value,
			tx: tx.value,
			ty: ty.value
		})

	}

	return {
		toLocal,
		setScale(s: number) { scale.value = s },
		setPos(x: number, y: number) { tx.value = x, ty.value = y },
		scale,
		tx, ty,
		canvasStyle
	}


});
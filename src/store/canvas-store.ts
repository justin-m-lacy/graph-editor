import { defineStore } from "pinia";

export const useCanvasStore = defineStore('canvas', () => {

	const scale = shallowRef<number>(1);
	const dx = shallowRef<number>(0);
	const dy = shallowRef<number>(0);

	const canvasStyle = () => {
		return {
			transform: `scale(${scale.value}) translate(${-dx.value}px,${-dy.value}px)`
		}
	}

	return {
		setScale(s: number) { scale.value = s },
		setPos(x: number, y: number) { dx.value = x, dy.value = y },
		scale,
		dx,
		dy,
		canvasStyle
	}


});
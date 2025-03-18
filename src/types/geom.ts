
export interface TPoint {

	uid: string,

	id: string,

	color?: string,
	blur?: number,
	r: number,

	x: number, y: number
}
export interface TCluster {

	uid: string;

	id: string;

	color?: string;

	stars: string[],

	links: Array<[TPoint, TPoint]>

}
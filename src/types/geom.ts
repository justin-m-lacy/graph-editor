
export interface TPoint {

	uid: string,

	id: string,

	r?: number,
	color?: string,
	blur?: number,


	x: number, y: number
}

export interface PointData {
	id: string,
	p: `${string},${string}`,
	r?: number
}


export interface TCluster {

	uid: string;

	id: string;

	color?: string;

	stars: string[],

	links: Array<[TPoint, TPoint]>

}

export interface ClusterData {

	id: string,
	color?: string,
	stars: string[],
	// links encoded as `ind1,ind2#indX,indY#...`
	links: string

}
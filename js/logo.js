const THREE = require( 'three' );

class ParallelLines {
	/**
	 * Stroke a number of lines
	 * @param  {THREE.Vector3} direction        Direction of lines from origin
	 * @param  {[Number]} length                Length of the lines. Lines would be stretched bidirectionally (along the direction and the opposite direction) from the origin.
	 * @param  {[Number]} lengthVar             Additional variant length. Length added to each line is different from others
	 * @param  {THREE.Vector3} posShift         Position shift variance from the origin
	 * @param  {Number} [count=10]              Number of lines to be generate
	 * @return {THREE.Group}                    Group of lines
	 */
	constructor( direction, length, lengthVar = 0, posShiftVar = new THREE.Vector3(), count = 10 ) {
		let normalizedDir = direction.clone().normalize();
		this.componentGroup = new THREE.Group();

		for ( var i = 0; i < count; i++ ) {
			let totalLength = length + Math.random() * lengthVar;
			let halfLength = totalLength / 2;
			let vertex1 = normalizedDir.clone().setLength( halfLength );
			let vertex2 = normalizedDir.clone().negate().setLength( halfLength );

			// Create geometry
			let geometry = new THREE.Geometry();
			geometry.vertices.push( vertex1 );
			geometry.vertices.push( vertex2 );

			// Create line
			let material = new THREE.LineBasicMaterial( { color: 0x888888 } );
			let line = new THREE.Line( geometry, material );
			line.position.set(
				posShiftVar.x * ( Math.random() - 0.5 ),
				posShiftVar.y * ( Math.random() - 0.5 ),
				posShiftVar.z * ( Math.random() - 0.5 )
			);
			this.componentGroup.add( line );
		}
	}
}


export class LogoThirteen {
	constructor() {
		this.letterOne = new ParallelLines( new THREE.Vector3( 0, 1, 0 ), 7, 3, new THREE.Vector3( 0.3, 0.1, 1 ) );
		this.letterThreeTop = this.strokeLines( [ -2, -1.5 ], [ 1.5, 2 ], [ -0.2, 0.2 ], [ -0.2, 0.2 ], [ -0.2, 0.2 ], [ -0.2, 0.2 ], 10 );
		// this.letterThreeTop.position.set( 1.5, 0, 0 );

		this.componentGroup = new THREE.Group();
		this.componentGroup.add( this.letterOne.componentGroup );
		this.componentGroup.add( this.letterThreeTop );
	}


	stroke() {}

	/**
	 * Stroke a number of lines
	 * @param  {[Number]} x1Range    Range used to randomize the start of x position
	 * @param  {[Number]} x2Range    Range used to randomize the end of x position
	 * @param  {[Number]} y1Range    Range used to randomize the start of y position
	 * @param  {[Number]} y2Range    Range used to randomize the end of y position
	 * @param  {[Number]} z1Range    Range used to randomize the start of z position
	 * @param  {[Number]} z2Range    Range used to randomize the end of z position
	 * @param  {Number} [count=10] 	Number of lines to be generate
	 * @return {THREE.Group}       	Group of lines
	 */
	strokeLines( x1Range, x2Range, y1Range, y2Range, z1Range, z2Range, count = 10 ) {
		let components = [];
		let componentGroup = new THREE.Group();

		for ( var i = 0; i < count; i++ ) {
			//create a gray LineBasicMaterial
			let material = new THREE.LineBasicMaterial( { color: 0x888888 } );

			// Create geometry
			let geometry = new THREE.Geometry();
			const x1 = Math.random() * ( x1Range[ 1 ] - x1Range[ 0 ] ) + x1Range[ 0 ];
			const y1 = Math.random() * ( y1Range[ 1 ] - y1Range[ 0 ] ) + y1Range[ 0 ];
			const z1 = Math.random() * ( z1Range[ 1 ] - z1Range[ 0 ] ) + z1Range[ 0 ];
			const x2 = Math.random() * ( x2Range[ 1 ] - x2Range[ 0 ] ) + x2Range[ 0 ];
			const y2 = Math.random() * ( y2Range[ 1 ] - y2Range[ 0 ] ) + y2Range[ 0 ];
			const z2 = Math.random() * ( z2Range[ 1 ] - z2Range[ 0 ] ) + z2Range[ 0 ];
			geometry.vertices.push( new THREE.Vector3( x1, y1, z1 ) );
			geometry.vertices.push( new THREE.Vector3( x2, y2, z2 ) );

			// Create line
			let line = new THREE.Line( geometry, material );
			componentGroup.add( line );
		}

		return componentGroup;
	}

}

const THREE = require( 'three' );

export class LogoThirteen {
	constructor() {
		this.letterOne = null;
		this.letterThreeTop = null;

		this.stroke();
	}


	stroke() {
		this.letterOne = this.strokeLines( [ -0.2, 0.2 ], [ -0.2, 0.2 ], [ -5, -2 ], [ 2, 5 ], [ -0.2, 0.2 ], [ -0.2, 0.2 ], 10 );
		this.letterOne.position.set( -3, 0, 0 );

		this.letterThreeTop = this.strokeLines( [ -2, -1.5 ], [ 1.5, 2 ], [ -0.2, 0.2 ], [ -0.2, 0.2 ], [ -0.2, 0.2 ], [ -0.2, 0.2 ], 10 );
		this.letterThreeTop.position.set( 1.5, 0, 0 );
	}

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

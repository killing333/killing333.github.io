const THREE = require( 'three' );

let logo = null;
let mouseX = 0,
	mouseY = 0,
	mouseXPortion = 0,
	mouseYPortion = 0,
	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2,
	scene,
	camera,
	renderer;
let cameraOrbitRadius = 10;

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
			let totalLength = length + ( Math.random() * 2 - 1 ) * lengthVar;
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

class ParallelArcs {
	constructor( radius, aStartAngle, aEndAngle, aClockwise, radiusVar = 0, angleVar = 0, posZShiftVar = 0, count = 10 ) {
		this.componentGroup = new THREE.Group();

		for ( var i = 0; i < count; i++ ) {
			let newRadius = radius + ( Math.random() * 2 - 1 ) * radiusVar;
			let startAngle = aStartAngle + ( Math.random() * 2 - 1 ) * angleVar;
			let endAngle = aEndAngle + ( Math.random() * 2 - 1 ) * angleVar;
			let curve = new THREE.EllipseCurve(
				0, 0, // ax, aY
				newRadius, newRadius, // xRadius, yRadius
				startAngle, endAngle, // aStartAngle, aEndAngle
				aClockwise, // aClockwise
				0 // aRotation
			);
			let path = new THREE.Path( curve.getPoints( 50 ) );
			let geometry = path.createPointsGeometry( 50 );
			let material = new THREE.LineBasicMaterial( { color: 0x888888 } );
			let ellipse = new THREE.Line( geometry, material );
			ellipse.position.setZ( posZShiftVar * ( Math.random() - 0.5 ) );
			this.componentGroup.add( ellipse );
		}
	}
}

class LogoThirteen {
	constructor() {
		this.componentGroup = new THREE.Group();

		this.letterOne = new ParallelLines( new THREE.Vector3( 0, 1, 0 ), 8, 2.5, new THREE.Vector3( 0.3, 0.1, 1 ) );
		this.letterOne.componentGroup.position.set( -3.5, 0, 0 );
		this.componentGroup.add( this.letterOne.componentGroup );

		this.letterThreeTop = new ParallelLines( new THREE.Vector3( 1, 0, 0 ), 4.5, 0.5, new THREE.Vector3( 0.1, 0.3, 1 ) );
		this.letterThreeTop.componentGroup.position.set( 1, 4, 0 );
		this.componentGroup.add( this.letterThreeTop.componentGroup );

		this.letterThreeSlash = new ParallelLines( new THREE.Vector3( 1, 0.75, 0 ), 4.25, 0.25, new THREE.Vector3( 0.25, 0.25, 1 ) );
		this.letterThreeSlash.componentGroup.position.set( 1, 2.4, 0 );
		this.componentGroup.add( this.letterThreeSlash.componentGroup );

		this.letterThreeArc = new ParallelArcs( 3.2, Math.PI * 15 / 24, Math.PI * 7 / 6, true, 0.2, Math.PI / 12, 1 );
		this.letterThreeArc.componentGroup.position.set( 1, -1.6, 0 );
		this.componentGroup.add( this.letterThreeArc.componentGroup );
	}
}

export function init() {
	scene = new THREE.Scene();
	// scene.background = new THREE.Color( 0xffffff );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = cameraOrbitRadius;
	camera.lookAt( scene.position );

	renderer = new THREE.WebGLRenderer( {
		canvas: document.getElementById( 'canvas-bg' ),
		alpha: true
	} );
	renderer.setClearColor( 0xffffff, 0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// let geometry = new THREE.BoxGeometry( 1, 6, 1 );
	// let meshMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// let wireFrameMat = new THREE.MeshBasicMaterial();
	// wireFrameMat.wireframe = true;
	// let cube = THREE.SceneUtils.createMultiMaterialObject( geometry, [ meshMaterial, wireFrameMat ] );
	// scene.add( cube );
	logo = new LogoThirteen();
	scene.add( logo.componentGroup );
	window.custom_logo = logo;

	// Add listeners
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	window.addEventListener( 'resize', onWindowResize, false );

	animate();
}


function animate() {
	requestAnimationFrame( animate );

	camera.position.x = cameraOrbitRadius * Math.sin( Math.PI / 2 * mouseXPortion );
	camera.position.z = cameraOrbitRadius * Math.cos( Math.PI / 2 * mouseXPortion ) * Math.cos( Math.PI / 2 * mouseYPortion );
	camera.position.y = -cameraOrbitRadius * Math.sin( Math.PI / 2 * mouseYPortion );
	camera.lookAt( scene.position );

	renderer.render( scene, camera );
};





//---------------------------------------------------------------//
// Events
//---------------------------------------------------------------//
function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
	mouseXPortion = mouseX / windowHalfX;
	mouseYPortion = mouseY / windowHalfY;

	// console.log( 'X: ' + mouseXPortion + ' Y: ' + mouseYPortion );
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length > 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
		mouseXPortion = mouseX / windowHalfX;
		mouseYPortion = mouseY / windowHalfY;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
		mouseXPortion = mouseX / windowHalfX;
		mouseYPortion = mouseY / windowHalfY;
	}
}

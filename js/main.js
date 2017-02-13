require( 'js/plugins.js' );
const Vue = require( 'vue' );
const bootstrap = require( 'bootstrap' );
const THREE = require( 'three' );
const Detector = require( 'js/detector.js' );

let mouseX = 0,
	mouseY = 0,
	mouseXPortion = 0,
	mouseYPortion = 0,
	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2,
	scene, camera, renderer;

if ( Detector.webgl ) {
	init();
	animate();
} else {
	var warning = Detector.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}




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



//---------------------------------------------------------------//
// Helpers
//---------------------------------------------------------------//
function init() {
	scene = new THREE.Scene();
	// scene.background = new THREE.Color( 0xffffff );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.x = 2;
	camera.position.z = 5;
	camera.lookAt( scene.position );

	renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setClearColor( 0xffffff, 0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	let geometry = new THREE.BoxGeometry( 1, 1, 1 );
	let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	let cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	// Add listeners
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );

	camera.position.x = mouseXPortion * 2;
	camera.position.y = mouseYPortion * -2;
	// camera.position.y += ( -mouseY + 200 - camera.position.y ) * .05;
	camera.lookAt( scene.position );
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

require( 'js/plugins.js' );
const _ = require( 'lodash' );
// const Vue = require( 'vue' );
// const VueRouter = require( 'vue-router' );
const bootstrap = require( 'bootstrap' );
const THREE = require( 'three' );
const Detector = require( 'js/detector.js' );
const LOGO = require( 'js/logo.js' );

// Vue components
const About = require( 'components/About.vue' );

let router = null;
let logo = null;

Vue.use( VueRouter );
initRouting();


let mouseX = 0,
	mouseY = 0,
	mouseXPortion = 0,
	mouseYPortion = 0,
	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2,
	scene, camera, renderer;

if ( Detector.webgl ) {
	initBackground3DScene();
	animate();
} else {
	var warning = Detector.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}




//---------------------------------------------------------------//
// Helpers
//---------------------------------------------------------------//
function initRouting() {
	// 1. Define route components.
	// These can be imported from other files
	const Works = { template: '<div>Works</div>' }

	// Define some routes and create the router instance and pass the `routes` option
	router = new VueRouter( {
		routes: [ {
				path: '/',
				redirect: { name: 'about' }
			}, {
				path: '/about',
				name: 'about',
				component: About
			},
			{
				path: '/works',
				name: 'works',
				component: Works
			}
		]
	} )

	// 4. Create and mount the root instance.
	// Make sure to inject the router with the router option to make the
	// whole app router-aware.
	const app = new Vue( {
		router
	} ).$mount( '#app' )
}

function initBackground3DScene() {
	scene = new THREE.Scene();
	// scene.background = new THREE.Color( 0xffffff );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 10;
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
	logo = new LOGO.LogoThirteen();
	scene.add( logo.letterOne );
	scene.add( logo.letterThreeTop );
	window.custom_logo = logo;

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

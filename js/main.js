require( 'js/plugins.js' );
import * as firebase from 'firebase';
import * as _ from 'lodash';
// const Vue = require( 'vue' );
// const VueRouter = require( 'vue-router' );
import * as bootstrap from 'bootstrap';
import * as THREE from 'three';
const Detector = require( 'js/detector.js' );
const LOGO = require( 'js/logo.js' );
const router = null;

// Init firebase
var config = {
	apiKey: "AIzaSyBwIpst2CGy9DNqLoHlGl8fjYJpKJNF1I0",
	authDomain: "th1rt3en-b55a4.firebaseapp.com",
	databaseURL: "https://th1rt3en-b55a4.firebaseio.com",
	storageBucket: "th1rt3en-b55a4.appspot.com",
	messagingSenderId: "1008773513144"
};
firebase.initializeApp( config );

// Init vue
Vue.use( VueRouter );
initRouting();

if ( Detector.webgl ) {
	LOGO.init();
} else {
	var warning = Detector.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
firebase.auth().onAuthStateChanged( function( user ) {
	if ( user ) {
		// User is signed in.
		// Works.login = true;/
		router;
		console.log( 'User is signed in.' );
	} else {
		// No user is signed in.
		// Works.login = false;/
		router;
		console.log( 'No User is signed in.' );
	}
} );
window.firebase = firebase;



//---------------------------------------------------------------//
// Helpers
//---------------------------------------------------------------//
function initRouting() {

	// Define some routes and create the router instance and pass the `routes` option
	router = new VueRouter( {
		routes: [ {
				path: '/',
				redirect: { name: 'about' }
			}, {
				path: '/about',
				name: 'about',
				component: require( 'components/About.vue' )
			},
			{
				path: '/works',
				name: 'works',
				component: require( 'components/Works.vue' ),
				props: ( route ) => ( { login: ( firebase.auth().currentUser !== null ) } )
			}
		]
	} )

	// 4. Create and mount the root instance.
	// Make sure to inject the router with the router option to make the
	// whole app router-aware.
	let app = new Vue( {
		router: router
	} ).$mount( '#app' )
}

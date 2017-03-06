require( 'js/plugins.js' );
import firebase from 'firebase';
import * as _ from 'lodash';
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
// const Vue = require( 'vue' );
// const VueRouter = require( 'vue-router' );
import * as bootstrap from 'bootstrap';
import * as THREE from 'three';

const Detector = require( 'js/detector.js' );
const LOGO = require( 'js/logo.js' );
const vueApp = null;
const vueRouter = null;

// Init firebase
let config = {
	apiKey: "AIzaSyBwIpst2CGy9DNqLoHlGl8fjYJpKJNF1I0",
	authDomain: "th1rt3en-b55a4.firebaseapp.com",
	databaseURL: "https://th1rt3en-b55a4.firebaseio.com",
	storageBucket: "th1rt3en-b55a4.appspot.com",
	messagingSenderId: "1008773513144"
};
firebase.initializeApp( config );

// Init vue
Vue.use( VueRouter );
Vue.use( VueFire );
initRouting();

if ( Detector.webgl ) {
	LOGO.init();
} else {
	let warning = Detector.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
firebase.auth().onAuthStateChanged( function( auth ) {
	if ( auth ) {
		// User is signed in.
		// Works.login = true;/
		vueApp.auth = true;
		console.log( 'User is signed in.' );
	} else {
		// No user is signed in.
		// Works.login = false;/
		vueApp.auth = false;
		console.log( 'No User is signed in.' );
	}

} );
window.firebase = firebase;



//---------------------------------------------------------------//
// Helpers
//---------------------------------------------------------------//
function initRouting() {

	// Define some routes and create the router instance and pass the `routes` option
	vueRouter = new VueRouter( {
		routes: [ {
				path: '/',
				redirect: {
					name: 'about'
				}
			}, {
				path: '/about',
				name: 'about',
				component: require( 'components/About.vue' )
			},
			{
				path: '/works',
				name: 'works',
				component: require( 'components/Works.vue' ),
				props: {
					auth: true
				}
			},
			{
				path: '/works/:id',
				name: 'work',
				component: require( 'components/Work.vue' ),
			}
		]
	} )

	// 4. Create and mount the root instance.
	// Make sure to inject the router with the router option to make the
	// whole app router-aware.
	vueApp = new Vue( {
		router: vueRouter,
		data: {
			auth: false,
		}
	} ).$mount( '#app' )
}

import firebase from 'firebase';
import Vue from 'vue/dist/vue.js';
import VueFire from 'vuefire';
import 'bootstrap/dist/js/bootstrap';

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
Vue.use( VueFire );

var db = firebase.database()
var app4 = new Vue( {
	el: '#resume',
	firebase: {
		info: {
			source: db.ref( 'new/info' ),
			asObject: true,
		},
		works: db.ref( 'new/works' ),
	},
} )

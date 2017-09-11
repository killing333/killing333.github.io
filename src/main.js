import firebase from 'firebase';
import Vue from 'vue/dist/vue.js';
import VueFire from 'vuefire';

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
var workVue = new Vue( {
	el: '#section-work',
	firebase: {
		works: db.ref( 'works' ),
	},
} )
var infoVue = new Vue( {
	el: '#section-contact',
	firebase: {
		info: {
			source: db.ref( 'info' ),
			asObject: true,
		}
	},
} )

$( window ).resize( function() {
	$( '#section-front' ).css( {
		'height': $( window ).height() + 'px',
		'padding-top': ( $( window ).height() / 2 + 120 ) + 'px'
	} );
} )
$( window ).resize()

// Toggle images when clicked a work
$( '#section-work' ).on( 'click', '.row-work', function( event ) {
	$( this ).find( ".work-extra" ).slideToggle();
	return true;
} )

// Stop toggle images when clicking link
$( '#section-work' ).on( 'click', '.work-info a', function( event ) {
	event.stopPropagation();
	return true;
} )

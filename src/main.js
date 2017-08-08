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
	el: '#section-work',
	firebase: {
		works: db.ref( 'new/works' ),
	},
	data: {
		"experiences": [ {
			"title": "title title title",
			"subtitle": "subtitle subtitle subtitle",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ex urna, laoreet id nunc eget, dapibus imperdiet nisi. Mauris vestibulum suscipit lectus, nec feugiat leo euismod at. Duis sed leo ullamcorper, pharetra justo ut, tincidunt tellus. Etiam ut suscipit libero. Praesent elementum libero eget semper tempor. Sed nec velit rutrum, consectetur arcu eget, venenatis augue. Fusce faucibus, leo et congue finibus, odio nisl finibus risus, sollicitudin bibendum nisl mauris sed tellus. Donec commodo accumsan lacus non dignissim. Morbi vel finibus nulla. Cras non luctus ante. Vivamus vestibulum volutpat ligula quis blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis mollis, ex vitae venenatis varius, eros enim egestas mauris, id aliquam ex felis a neque. Aliquam erat volutpat. Vivamus urna ante, interdum rhoncus purus a, faucibus finibus velit. Maecenas et interdum neque, ut rhoncus erat.",
			"dateFrom": 0,
			"dateTo": 0,
			"image": "tile.png",
			"links": [ {
				"title": "Google",
				"url": "http://www.google.com"
			}, {
				"title": "Yahoo",
				"url": "http://www.yahoo.com"
			} ]
		}, {
			"title": "title title title",
			"subtitle": "subtitle subtitle subtitle",
			"description": "description description description",
			"dateFrom": 0,
			"image": "tile.png",
		} ]
	}
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
	$( this ).find( ".work-images" ).slideToggle();
	return true;
} )

// Stop toggle images when clicking link
$( '#section-work' ).on( 'click', '.work-info a', function( event ) {
	event.stopPropagation();
	return true;
} )

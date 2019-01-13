import firebase from 'firebase';
import Vue from 'vue/dist/vue.js';
import VueFire from 'vuefire';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

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
var frontVue = new Vue( {
	el: '#section-front',
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
	$( this ).toggleClass("selected");
	return true;
} )

// Stop toggle images when clicking link
$( '#section-work' ).on( 'click', 'a', function( event ) {
	event.stopPropagation();
	return true;
} )

var pswpElement = document.querySelectorAll('.pswp')[0];
$( '#section-work' ).on( 'click', '.work-extra-images a', function( event ) {
	var imgLinks = $(this).parents("ol").find("a");
	var idx = imgLinks.index($(this));
	var items = [];
	console.log(idx);

	imgLinks.each(function( index ) {
		var size = $(this).attr('data-size').split('x');
		items.push({
			src: $(this).attr("href"),
			w: parseInt(size[0], 10),
			h: parseInt(size[1], 10)
		});
	});

	// define options (if needed)
	var options = {
		index: idx, // start at first slide
		bgOpacity: 0.85,
		closeEl:true,
		captionEl: false,
		fullscreenEl: false,
		zoomEl: false,
		shareEl: false,
		counterEl: true,
		arrowEl: true,
		preloaderEl: true
	};
	
	// Initializes and opens PhotoSwipe
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();

	return false;
} )
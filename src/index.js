import "./style.css";
import { gsap } from 'gsap/index';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { EasePack } from 'gsap/EasePack';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(EasePack);

let textPin;
let imgPin; 
let mobileTween;

// Desktop ScrollTriggers
function buildDesktop() {
  // Pinned Text
  gsap.utils.toArray('.pinned_row').forEach((section) => {
    const text = section.querySelector('.section_text');
    textPin = ScrollTrigger.create({
        trigger: text,
        id: 'textPin',
        startTrigger: section,
        // start: 'top top',
        // end: 'bottom 5%',
        endTrigger: section,
        toggleClass: 'active',
        //pin: true,
        //pinSpacing: false,
        anticipatePin: 1,
        //markers: true
      })
    gsap.timeline({
    scrollTrigger: {
      trigger: text,
        start: 'top center',
        end: 'bottom 5%',
      //markers: true,
      toggleActions: "play reverse play reverse"
    }
  })
  .from(text, {
    //scaleX: -200,
      x: 500,
      stagger: 1,
     autoAlpha: 0 
  });
  });
 
  // Pinned IMG - for last .pinned_row only
  gsap.utils.toArray('.pinned_row').slice(-1).forEach((lastPin) => {
    const images = lastPin.querySelector('.section_images');
    imgPin = ScrollTrigger.create({
        trigger: images,
        id: 'imgPin',
        start: 'bottom center',
        toggleActions: 'play none reverse reset',
        pin: true,
        anticipatePin: 1,
        pinSpacing: false,
        //markers: true
    });
  });
}


// Mobile Tween with ScrollTrigger instance.
function buildMobile() {
  gsap.utils.toArray('.section_row').forEach((section) => {
    const imgCol = section.querySelector('.section_images');  
    const text = section.querySelector('.text_wrapper');
    mobileTween = gsap.to(text, {
      scrollTrigger: {
        trigger: imgCol,
        id: 'mobile-tween',
        start: 'bottom 80%',
       // markers: true
      },
      autoAlpha: 1
    });
  });
}

ScrollTrigger.matchMedia({
	
	// desktop
	"(min-width: 800px)": function() {
		// setup animations and ScrollTriggers for screens over 800px wide (desktop) here...
		// ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
    
    buildDesktop();
	},

	// mobile
	"(max-width: 799px)": function() {
		// The ScrollTriggers created inside these functions are segregated and get
		// reverted/killed when the media query doesn't match anymore. 

    buildMobile();
	},
	
	// all 
	"all": function() {
		// ScrollTriggers created here aren't associated with a particular media query,
		// so they persist.
	}
});

// TEXT

let split
let animation = gsap.timeline({})

function init() {
	gsap.set(".layer-content", {autoAlpha:1})
	split = new SplitText(".layer-content p", {type:"chars"})
	animation.from(split.chars, {opacity:0, y:50, ease:"back(4)", stagger:{
		from:"start",
		each:0.05
	}})

}
window.addEventListener("load", init)
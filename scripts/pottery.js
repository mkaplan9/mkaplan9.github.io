var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
var items = [
    {
        src: './assets/60326809968__28250217-D31A-4961-A7A6-293A7DA46DF3.JPG',
        w: 2448,
        h: 3264
    },
    {
        src: './assets/60326809968__28250217-D31A-4961-A7A6-293A7DA46DF3.JPG',
        w: 1200,
        h: 900
    }
];

// define options (if needed)
var options = {
    // optionName: 'option value'
    // for example:
    index: 0 // start at first slide
};

// Initializes and opens PhotoSwipe
var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
gallery.init();
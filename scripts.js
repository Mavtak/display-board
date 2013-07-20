
$(function(){

  var slideCount = 0;
  var $stage = $('#stage');
  var $deck = $('#slide-deck');
  
  function createSlide(data)
  {
    var id = 'slide-' + slideCount;
    slideCount++;
    var result = $('#slide-template').children('.slide').clone();
    result.attr('id', id);
    
    if(data.url) {
      var content = result.children('.content');
      content[0].src = data.url
    }
    
    var overlay = result.children('.overlay');
    
    overlay.html(data.overlay);
    
    result.appendTo($deck);
    
    return result;
  }
  
  createSlide({
      overlay: "Welcome to Display Board"
  }).addClass('initial').appendTo($deck);
  
  createSlide({
      url: "examples/1.html",
      overlay: "Slide 1"
  });
  
  createSlide({
      url: "examples/2.html",
      overlay: "Slide 2"
  });
  
  createSlide({
      url: "examples/3.html",
      overlay: "Slide 3"
  });
  
  createSlide({
      url: "examples/4.html",
      overlay: "Slide 4"
  });
  
  function setup() {
    $initial = $deck.children().first();
    $initial.addClass('current');
    $initial.appendTo($stage);
    
    $next = $deck.children().first();
    $next.addClass('next');
    $next.appendTo($stage);
    
  }
  
  function transitionAnimation($current, $next) {
      
  }
  
  function cycle(time) {
    $current = $stage.children('.current');
    $next = $stage.children('.next');
    
    var afterAnimation = function() {
      console.log('hi');
      $current.removeClass('current');
      $next.removeClass('next').addClass('current');
      if($current.hasClass('initial')) {
        $current.remove();
      } else {
        $current.appendTo($deck);
      };
      
      $newNext = $deck.children().first();
      $newNext.addClass('next');
      $newNext.removeAttr('style');
      $newNext.appendTo($stage);
      
      setTimeout(function(){
        cycle(time);
      }, time);
    };
    
    var zoomOut = {
      width: "90%",
      height: "90%",
      margin: "2.5%",
      zoom: .9
    };
    
    var zoomIn = {
      width: "100%",
      height: "100%",
      margin: 0,
      zoom: 1
    };
    
    $current.animate(zoomOut)
    .animate({
      left: "-100%"
    },{
      duration: 1000
    }).animate(zoomIn, afterAnimation);
    
    $next.animate(zoomOut).animate({
      left: 0
    },{
      duration: 1000
    }).animate(zoomIn)
    .done(function(){
      alert('hi');
    });
  }

  $(document).ready(function(){
    setup();
    
    setTimeout(function(){
      cycle(5000);
    }, 1000);
  });

});
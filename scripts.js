
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
    
    var $title = $('.title', result);
    $title.html(data.title);
    
    result.appendTo($deck);
    
    return result;
  }
  
  createSlide({
      overlay: "Welcome to Display Board"
  }).addClass('initial').appendTo($deck);
  
  var slides = [{
      url: 'examples/1.html',
      title: 'Slide 1'
    },{
      url: 'examples/2.html',
      title: 'Slide 2'
    },{
      url: 'examples/3.html',
      title: 'Slide 3'
    },{
      url: 'examples/4.html',
      title: 'Slide 4'
    }];

  for (var i in slides) {
    createSlide(slides[i]);
  }
  
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
      zoom: .8
    };
    
    var zoomIn = {
      width: "100%",
      height: "100%",
      margin: 0,
      zoom: 1
    };
    
    $overlays = $('.overlay', $stage);
    
    var step1 = function() {
      $current.animate(zoomOut, 1000);
      $next.animate(zoomOut, 1000);
      $overlays.animate({opacity: 1}, 1000);
    }
    step1();
    
    var step2 = function() {
      $current.animate({left: "-100%"}, 1000);
      $next.animate({left: 0}, 1000);
    }
    setTimeout(step2, 1000);
    
    var step3 = function() {
      $current.animate(zoomIn, 1000);
      $next.animate(zoomIn, 1000)
      $overlays.animate({opacity: 0}, 1000);
    }
    setTimeout(step3, 2000);
    
    setTimeout(afterAnimation, 3000);
  }

  $(document).ready(function(){
    setup();
    
    setTimeout(function(){
      cycle(5000);
    }, 1000);
  });

});

$(function(){

  var slideCount = 0;
  var $stage = $('#stage');
  var $deck = $('#slide-deck');
  var slideData = [];
  
  function createSlide(data)
  {
    var id = 'slide-' + slideCount;
    slideCount++;
    var result = $('#slide-template').children('.slide').clone();
    result.attr('id', id);

    if (data.url) {
        var content = $('.content', result);
        content[0].src = data.url;
    }

    var $title = $('.title', result);
    $title.html(data.title);
    
    result.appendTo($deck);
    slideData[id] = data;
    
    return result;
  }
  
  createSlide({
      overlay: "Welcome to Display Board"
  }).addClass('initial').appendTo($deck);

  var jsonText = $('#configuration').html();
  
  var data = JSON.parse(jsonText);
  var slides = data.slides;
  
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
  
  function getSlideData($slide) {
      var nextId = $slide.attr('id');
      var data = slideData[nextId];

      return data;
  }

  function getTimeout($slide) {
      var slideData = getSlideData;
      var timeout = slideData.timeout || 5;
      timeout = timeout * 1000;
      
      return timeout;
  }
  
  function cycle() {
    $current = $stage.children('.current');
    $next = $stage.children('.next');
    
    var afterAnimation = function() {
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

      var timeout = getTimeout($next);
      setTimeout(function(){
          cycle();
      }, timeout);
    };
    
    var zoomOut = {
        width: "90%",
        height: "90%",
        margin: "2.5%"
    };
    
    var zoomIn = {
        width: "100%",
        height: "100%",
        margin: "0%"
    };
    
    var $overlays = $('.overlay', $stage);
    var $frames = $('.frame', $stage);
    
    var step1 = function() {
      $frames.animate(zoomOut, 1000);
      $overlays.animate({opacity: 1}, 1000);
    }
    step1();
    
    var step2 = function() {
      $current.animate({left: "-100%"}, 1000);
      $next.animate({left: 0}, 1000);
    }
    setTimeout(step2, 1000);
    
    var step3 = function() {
      $frames.animate(zoomIn, 1000);
      $overlays.animate({opacity: 0}, 1000);
    }
    setTimeout(step3, 2000);
    
    setTimeout(afterAnimation, 3000);
  }

  $(document).ready(function(){
    setup();
    
    setTimeout(function () {
      cycle();
    }, 1000);
  });

});

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
      url: "http://zombo.com",
      overlay: "Slide 1"
  });
    
  createSlide({
    url: "http://isitchristmas.com/",
    overlay: "Slide 2"
  });
  
  createSlide({
    url: "http://cupcakeipsum.com/",
    overlay: "Slide 3"
  });  
  
  function setup() {
    $first = $deck.children().first();
    $first.addClass('next');
    
    $first.appendTo($stage);
  }
  
  function cycle() {
    $current = $stage.children('.current');
    $next = $stage.children('.next');
        
    $current.removeClass('current');
    $next.removeClass('next').addClass('current');
    if($current.hasClass('initial')) {
      $current.remove();
    } else {
      $current.appendTo($deck);
    };
    
    $newNext = $deck.children().first();
    $newNext.addClass('next');
    $newNext.appendTo($stage);
  }

  $(document).ready(function(){
    setup();
    setInterval(cycle, 5000);
  });

});
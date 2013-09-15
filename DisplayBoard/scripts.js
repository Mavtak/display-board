
$(function(){

  var slideCount = 0;
  var $stage = $('#stage');
  var $deck = $('#slide-deck');
  var slideData = [];
  var loadedSlides;
  
  function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

    function endsWithAny(str, suffixes) {
        for (var i = 0; i < suffixes.length; i++) {
            var suffix = suffixes[i];
            if (endsWith(str, suffix)) {
                return true;
            }
        }
        return false;
    }

  function createSlide(data)
  {
    var id = 'slide-' + slideCount;
    slideCount++;
    var result = $('#slide-template').children('.slide').clone();
    result.attr('id', id);

    var url = data.url;
    if (url) {
        
        if (endsWithAny(url, ['.jpg', '.jpeg', '.png', '.gif'])) {
            url = '/Utilities/DisplayImage?url=' + url;
        }

        var content = $('.content', result);
        content[0].src = url;
    }

    var $title = $('.title', result);
    $title.html(data.title);
    
    result.appendTo($deck);
    slideData[id] = data;
    
    return result;
  }
  
  function processSlides(slides, callback, results) {
      results = results || [];

      if (slides.length === 0) {
          callback(results);
          return;
      }

      var slide = slides.shift();

      if (slide.url && slide.url.indexOf('deck:') === 0) {
          var name = slide.url.split(':')[1];
          loadDeck(name, function() {
              processSlides(slides, callback, results);
          }, results);
      } else {
          results.push(slide);
          processSlides(slides, callback, results);
      }
  }

  function loadDeck(name, callback, results) {
      results = results || [];

      var fail = function() {
          results.push({
              title: 'failed to load deck named "' + name + '".'
          });
          callback(results);
      };

      $.ajax({
          method: 'GET',
          url: name + '/data',
          success: function (data) {
              if (data && data.slides) {
                  var slides = data.slides;
                  processSlides(slides, callback, results);
              } else {
                  fail();
              }
          },
          failure: function () {
              fail();
          }
      });
  }

  function setup() {
    createSlide({
        overlay: "Welcome to Display Board"
    }).addClass('initial').appendTo($deck);

    var deckName = $('#deck-name').html();

    loadDeck(deckName, function (slides) {
        loadedSlides = slides;
        $.each(slides, (function (index, slide) {
            createSlide(slide);
        }));
        var $initial = $deck.children().first();
        $initial.addClass('current');
        $initial.appendTo($stage);

        $next = $deck.children().first();
        $next.addClass('next');
        $next.appendTo($stage);
        
        setTimeout(function () {
            cycle();
        }, 1000);

        setInterval(function () {
            checkForChanges();
        }, 1000);
    });
  }
  
  
  function transitionAnimation($current, $next) {
      
  }
  
  function getSlideData($slide) {
      var nextId = $slide.attr('id');
      var data = slideData[nextId];

      return data;
  }

  function getTimeout($slide) {
      var slideData = getSlideData($slide);
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
      }
      
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
    };
    step1();

    var step2 = function() {
      $current.animate({left: "-100%"}, 1000);
      $next.animate({left: 0}, 1000);
    };
    setTimeout(step2, 1000);

    var step3 = function() {
      $frames.animate(zoomIn, 1000);
      $overlays.animate({opacity: 0}, 1000);
    };
    setTimeout(step3, 2000);
    
    setTimeout(afterAnimation, 3000);
  }

  var checkForChanges = function () {
      function reload() {
          location.reload();
      }
      
      var deckName = $('#deck-name').html();

      loadDeck(deckName, function (freshSlides) {
          if (loadedSlides.length != freshSlides.length) {
              reload();
              return;
          }

          for(var i = 0; i < loadedSlides.length; i++) {
              var loadedSlide = loadedSlides[i];
              var freshSlide = freshSlides[i];

              if (freshSlide.title != loadedSlide.title) {
                  reload();
                  return;
              }
              
              if (freshSlide.url != loadedSlide.url) {
                  reload();
                  return;
              }
              
              if (freshSlide.timeout != loadedSlide.timeout) {
                  reload();
                  return;
              }
          }
      });
  };

  $(document).ready(function(){
    setup();
  });

});
$(function() {
    var feed = new Instafeed({
    get: 'tagged',
    tagName: 'hackathon',
    limit: 16,
    resolution: 'standard_resolution',
    clientId: '580e9844a5a3431a80641d571f8af4ce',
    target: 'instagram',
    template: '<div class="superbox-list"><img src="{{image}}" data-img="{{image}}" alt="" class="superbox-img"></div><!-- -->',
    after: function() {      
      $('#instagram').SuperBox();      
    }
});
    feed.run();
  
    $(window).load(function(){
      $('.load').remove();
      $('#instagram').fadeIn('slow'); 
    })

});


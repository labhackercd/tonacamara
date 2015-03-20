$(function() {
  
  
    var feed = new Instafeed({
      get: 'tagged',
      tagName: 'cat',
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
  
  //Instagram feed information variables
  
  var avatar_url = [];
      profile_url = [];
      p_name = [];
      p_nickname = [];
      e_entry_title = [];
      dt_updated = [];
      dt_url = [];
      reply_url = [];
      retweet_url = [];
      favorite_url = [];
    
  $(window).load(function(){
    $('.load').remove();
    $('#instagram').fadeIn('slow'); 
    
    var tweets_lenght = storeFeed();
    
    console.log(tweets_lenght);
    
    //setInterval(createFeed, 2000);
    
  });
  
  
  function createFeed() {
    
    if (tweets_lenght > 0)
    
  }
  
  
  function insertData(n) {
    
    $('.photo').css('background-image', 'url('+avatar_url[n]+')');
    $('a.user').attr('href', profile_url[n]);
    $('.user').html(p_name[n]);
    $('.nickname').html(p_nickname[n]);
    $('.tweet').html(e_entry_title[n]);
    $('.time').attr('href', dt_url[n]);
    $('.time').html(dt_updated[n]);
    $('.reply').attr('href', reply_url[n]);
    $('.retweet').attr('href', retweet_url[n]);
    $('.favorite').attr('href', favorite_url[n]);
    
  }
  
  
  
  function storeFeed() {
    
    var i = 0;
    
    $('#twitter-widget-0').contents().find('.h-entry').each(function() {
      
        avatar_url.push($(this).find('.u-photo.avatar').attr('data-src-2x'));
        profile_url.push($(this).find('.u-url.profile').attr('href'));
        p_name.push($(this).find('.p-name').html());
        p_nickname.push($(this).find('.p-nickname').html());
        e_entry_title.push($(this).find('.e-entry-title').html());
        dt_updated.push($(this).find('.dt-updated').html());
        dt_url.push($(this).find('.u-url.permalink.customisable-highlight').attr('href'));
        reply_url.push($(this).find('.reply-action.web-intent').attr('href'));
        retweet_url.push($(this).find('.retweet-action.web-intent').attr('href'));
        favorite_url.push($(this).find('.favorite-action.web-intent').attr('href')); 
        
        i++;
      
    });

    return(i);
    
  }
  

});


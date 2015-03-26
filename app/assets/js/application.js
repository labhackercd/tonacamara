$(function () {

    var hashtag = 'tonacamara';
    $('.hashtag').html('#'+hashtag);
  
  
    var feed = new Instafeed({
      get: 'tagged',
      tagName: hashtag,
      limit: 12,
      resolution: 'standard_resolution',
      clientId: '580e9844a5a3431a80641d571f8af4ce',
      target: 'instagram',
      template: '<div class="superbox-list"><img src="{{image}}" data-img="{{image}}" alt="" class="superbox-img"></div><!-- -->',
      after: function() {      
        $('#instagram').SuperBox();      
      }
  });
    
  feed.run();
  
  $('#twitter').mouseenter(function() {
    $('.action-btns').show();
  });
  $('#twitter').mouseleave(function() {
    $('.action-btns').stop(true).hide();
  });
  
  
  
  //Youtube feed
  
  var api_key = 'AIzaSyC9n-4EQr-6Se6eQdg9AsUJe69nFHe_-lo';
  
  search();

  function search() {
    
    var request = 'https://www.googleapis.com/youtube/v3/search?'
        part = 'snippet';
        order = 'date';
        q = hashtag;
        vid = [];
        i = 0;
    
    request = request + 'order=' + order + '&' + 'part=' + part + '&' + 'q=' + q + '&' + 'key=' + api_key;
    console.log(request);
    
    $.getJSON( String(request), function( json ) {
      var items = json.items;
      
      $(items).each(function() {
        vid.push(this.id.videoId);
      });
      
      $('.vid').each(function() {
        var iframe = '<iframe width="100%" height="350px" src="https://www.youtube.com/embed/'+vid[i]+'" frameborder="0" allowfullscreen></iframe>';
        $(this).append(iframe);
        i++;
      });
 
      
     });
  
    
  }
  
  
  //Twitter feed information variables
  
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
      i = 0;
      tweets_lenght = 0;
    
  $(window).load(function(){
    
    $('.load').remove();
    $('#instagram').fadeIn('slow'); 
    
    tweets_lenght = storeFeed();
    
    createFeed();
    setInterval(createFeed, 5000);
    
  });
  
  
  function createFeed() {
    
    $('.in-content').css('display', 'flex');
      
    if (i < tweets_lenght) {          
      insertData(i); 
      i++;
    } else {
      storeFeed();
      i = 0;      
      insertData(i); 
      i++;
    }
    
  }
  
  
  function insertData(n) {
    
    $('.in-content').fadeOut('slow', function() {
      $('.photo').css('background-image', 'url('+avatar_url[n]+')');
      $('a.user').attr('href', profile_url[n]);
      $('.name').html(p_name[n]);
      $('.nickname').html(p_nickname[n]);
      $('.tweet').html(e_entry_title[n]);
      $('.time').attr('href', dt_url[n]);
      $('.time').html(dt_updated[n]);
      $('.reply').attr('href', reply_url[n]);
      $('.retweet').attr('href', retweet_url[n]);
      $('.favorite').attr('href', favorite_url[n]);
    });   
    
    $('.in-content').fadeIn('slow');
    
  }
  
  
  
  function storeFeed() {
    
    avatar_url = [];
    profile_url = [];
    p_name = [];
    p_nickname = [];
    e_entry_title = [];
    dt_updated = [];
    dt_url = [];
    reply_url = [];
    retweet_url = [];
    favorite_url = [];
    
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


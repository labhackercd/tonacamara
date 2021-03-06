$(function () {

    var hashtag = 'tonacamara';
    $('.hashtag').html('#'+hashtag);
  
    var instatags = [hashtag, 'tônacamara', 'tônacâmara']

    //Count number of tags
    var counttags = $(instatags).length;

    $(instatags).each(function(i) {
      tag = String(this);
      var feed = new Instafeed({
        get: 'tagged',
        tagName: tag,
        limit: 8,
        resolution: 'standard_resolution',
        clientId: '580e9844a5a3431a80641d571f8af4ce',
        target: 'instagram',
        template: '<div class="superbox-list"><div style="background-image: url({{image}})" data-img="{{image}}" data-link="{{link}}" class="superbox-img"><p class="superbox-dsc hidden">{{caption}}</p></div></div>',
        after: function() {
          counttags--

          //Run SuperBox only after the last tag iteration
          if (counttags === 0) {
            $('#instagram').SuperBox();
          }          
        }  
      });
      feed.run();
    });

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
    
    request = request + 'order=' + order + '&' + 'part=' + part + '&' + 'q=' + '%23' + q + '&' + 'key=' + api_key;
    
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
      retweet_url = [];
      like_url = [];
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
      $('.retweet').attr('href', retweet_url[n]);
      $('.like').attr('href', like_url[n]);
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
    retweet_url = [];
    like_url = [];
    
    var i = 0;
    
    $('#twitter-widget-0').contents().find('.timeline-TweetList-tweet:not(:has(.timeline-Tweet-retweetCredit))').each(function() {

        avatar_url.push($(this).find('.TweetAuthor-avatar > .Avatar').attr('data-src-2x'));
        profile_url.push($(this).find('.TweetAuthor-link').attr('href'));
        p_name.push($(this).find('.TweetAuthor-name').html());
        p_nickname.push($(this).find('.TweetAuthor-screenName').html());
        e_entry_title.push($(this).find('.timeline-Tweet-text').html());
        dt_updated.push($(this).find('.dt-updated').html());
        dt_url.push($(this).find('.timeline-Tweet-timestamp').attr('href'));
        retweet_url.push($(this).find('.timeline-ShareMenu-container > ul > li:first-child .timeline-ShareMenu-option').attr('href'));
        like_url.push($(this).find('.TweetAction--heart').attr('href')); 
        
        i++;      
      
    });

    return(i);
    
  }
  

});


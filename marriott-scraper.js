var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var url = 'https://traveler.marriott.com/new-orleans/new-orleans-bayou-exploring-louisianas-roots/';
 		

//Load Body
request(url, function(error, response, body){
     if(error && response.statusCode !== 200) {
        console.log('Error loading page.');
     }
    


    var $ = cheerio.load(body, {
    	ignoreWhitespace: true,
    	xmlMode: false
    });

//Remove Extraneous Elements
	$('header').remove();
	$('noscript').remove();
    $('script').remove();
    $('.op-related-articles').remove();
    $('.advert').remove();
    $('.tag-list').remove();
    $('figcaption').remove();
    $('.sponsored-by').remove();
    $('.where-to').remove();
    $('.image-crop').remove();
    $('head').remove();
    $('.wp-caption-text').remove();
    $('.content-inset').remove();
    $('h5').remove();

    

//Scrape for Images
	var entry = $('.entry-content');
	var imageList = [];


	var image = entry.find($('img')).each(function(){
		imageList.push($(this).attr('src'));
	})
	

    console.log(imageList.length);

//Get Word Count
	// var value = entry.find($('p')).text();
	// var valueTwo = entry.find($('h2')).text();
	// // var value = entry.text();
	// var regex = /\s+/gi;

	// var wordCount = (value.trim().replace(regex, ' ').split(' ').length) + (valueTwo.trim().replace(regex, ' ').split(' ').length);
	// // var wordCount = value.split(' ').length + valueTwo.split(' ').length;
	// // var wordCount = value.trim().replace(regex, ' ').split(' ').length;



	var value = $('.entry-content p').text();
	var valueTwo = $('.entry-content h2').text();
	var valueThree = $('.entry-content a').text();
	var valueFour = $('.entry-content em').text();

	var regex = /\s+/gi;
	var wordCount = (value.trim().replace(regex, ' ').split(' ').length) + (valueTwo.trim().replace(regex, ' ').split(' ').length) + (valueThree.trim().replace(regex, ' ').split(' ').length) /*+ (valueFour.trim().replace(regex, ' ').split(' ').length)*/;

	function countWords(s){
	    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
	    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
	    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
	    return s.split(' ').length; 
	}

	// console.log(wordCount);
	// console.log(value);
	console.log(countWords(entry.text()));
	console.log(entry.text());	

	fs.writeFile('scrape.txt', entry.text(), (err)=> {  
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Scrape saved!');
	});
});



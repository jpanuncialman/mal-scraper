var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var url = 'https://myanimelist.net/anime/season/2017/winter';

 		

//Load Body
request(url, function(error, response, body){
     if(error && response.statusCode !== 200) {
        console.log('Error loading page.');
     }

    
    var $ = cheerio.load(body, {
    	ignoreWhitespace: true,
    	xmlMode: false
    });

//Cheerio Variables
	var allAnime = $('.seasonal-anime');
	var animeNameList = [];
	var animeSummaryList = [];
	var animeSentence = "#animeTitle# : #animeDescr#";


	var animeNameList = allAnime.find('.title-text').text().split("  ");

	var animeSummaryList = allAnime.find('.synopsis').text().split("  ")
	// .replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

	


	var tempData = {
	 	animeTitle: animeNameList,
	 	animeDescr: animeSummaryList,
	 	sentence: animeSentence
	};

	

    console.log(animeNameList);
    console.log(animeSummaryList);
    fs.writeFile('./downloads/animelist-sample.json', JSON.stringify(tempData, 1), function(err){
    	console.log('Successfully saved data.');
    });
});


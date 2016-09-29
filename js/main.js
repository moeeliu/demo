var colors  =['#31B0D5','#4CAE4C','#808080','#EEA236','#FF8800','#FF3EFF','FF4500'];
var json1 ='{"text":['+'{"quote":"A bird in the hand is worth two in the bush. ","author":"Heywood"},'+
'{"quote":"A man may lead a horse to the water, but he cannot make it drink.","author":"Heywood"},'+
'{"quote":"Early to bed and early to rise, makes a man healthy, wealthy, and wise.","author":"Benjamin Franklin"}]}';
var obj = JSON.parse(json1);
function getQuote(){
	var num = Math.floor(Math.random()*3);
	var color = Math.floor(Math.random()*colors.length-1);
	$(".atr").text("-"+obj.text[num].author);
	$(".quote").text(obj.text[num].quote);
	$("body ").css("background-color",colors[color]);
	$(".btn-c").css("background-color",colors[color]);
	$(".con").css("color",colors[color]);
}

$(document).ready(function(){
	
	getQuote()
	$(".newquote").on('click',getQuote);
	
});


var config = {
	apiKey: "AIzaSyDjDnTiwKL5z57Ym-RoEvuGetOeV8TFiT0",
	authDomain: "kimjaddol.firebaseapp.com",
	databaseURL: "https://kimjaddol.firebaseio.com",
	storageBucket: "kimjaddol.appspot.com",
};

function msToTime(s) {
	var str = "";
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;
	str += (hrs)? hrs + "시간 " : "";
	str += (mins)? mins + "분 " : "";
	return str + secs + '초 전';
}
	

firebase.initializeApp(config);
var db = firebase.database();
var ref_kim = db.ref('kim').limitToLast(1);
var ref_ja = db.ref('ja').limitToLast(1);
var ref_ddol = db.ref('ddol').limitToLast(1);

var tgd_kim = db.ref('tgd/kim').limitToLast(3);
var tgd_ja = db.ref('tgd/ja').limitToLast(3);
var tgd_ddol = db.ref('tgd/ddol').limitToLast(3);

var now = new Date();


ref_kim.once("value", function(snapshot) {
	var kim = snapshot.val();
	var key = kim[Object.keys(kim)];
	var time = msToTime(Math.abs(now - new Date(key.time*1000)))
	if(key.type){
		$('.thumb-kim').removeClass('broad-off');
		$('#dataKim').append("<span class='title'>"+key.title+"</span>");
		$('#dataKim').append("<span class='uptime'>업타임 : "+time+"</span>");
	}
	else {
		$('#dataKim').append("<span class='title'>방송종료</span>");
		$('#dataKim').append("<span class='uptime'>"+time+"</span>");
	}
	
}, function(error) {
	console.log(error);
});

ref_ja.once("value", function(snapshot) {
	var ja = snapshot.val();
	var key = ja[Object.keys(ja)];
	var time = msToTime(Math.abs(now - new Date(key.time*1000)))
	if(key.type){
		$('.thumb-ja').removeClass('broad-off');
		$('#dataJa').append("<span class='title'>"+key.title+"</span>");
		$('#dataJa').append("<span class='uptime'>업타임 : "+time+"</span>");
	}
	else{
		$('#dataJa').append("<span class='title'>방송종료</span>");
		$('#dataJa').append("<span class='uptime'>"+time+"</span>");
	}
	
}, function(error) {
	console.log(error);
});

ref_ddol.once("value", function(snapshot) {
	var ddol = snapshot.val();
	var key = ddol[Object.keys(ddol)];
	var time = msToTime(Math.abs(now - new Date(key.time*1000)))
	if(key.type){
		$('.thumb-ddol').removeClass('broad-off');
		$('#dataDDol').append("<span class='title'>"+key.title+"</span>");
		$('#dataDDol').append("<span class='uptime'>업타임 : "+time+"</span>");
	}
	else {
		$('#dataDDol').append("<span class='title'>방송종료</span>");
		$('#dataDDol').append("<span class='uptime'>"+time+"</span>");
	}
}, function(error) {
	console.log(error);
});

tgd_kim.once("value", function(snapshot){
  var data = snapshot.val()
  for(var i in data)
    $( "#tgd_Kim" ).prepend( "<a target='_blank' href=https://tgd.kr/kimdoe/"+data[i].url+"><p>"+data[i].title+"</p></a>" );
});

tgd_ja.once("value", function(snapshot){
  var data = snapshot.val()
  for(var i in data)
    $( "#tgd_Ja" ).prepend( "<a target='_blank' href=https://tgd.kr/tranth/"+data[i].url+"><p>"+data[i].title+"</p></a>" );
});

tgd_ddol.once("value", function(snapshot){
  var data = snapshot.val()
  for(var i in data)
    $( "#tgd_DDol" ).prepend( "<a target='_blank' href=https://tgd.kr/jungtaejune/"+data[i].url+"><p>"+data[i].title+"</p></a>" );
});

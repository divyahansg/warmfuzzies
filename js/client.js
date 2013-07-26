var frbs = new Firebase('https://warmfuzzies.firebaseIO.com');
var voted = false;
var frbs_new = frbs.child('new');
var frbs_old = frbs.child('saved');
var frbs_data = frbs.child('data').child('count'); 

$('form').submit(function (e) {
	if($("input#complimentText").val().length == 0) return false;
	var frbs_new = frbs.child('new');
	frbs_new.push({text: $("input#complimentText").val()});
	//$('form').css({"display":"none"});
	$("input#complimentText").val("");
	$('form').css({"display":"none"});
	$('#add').css({"display":"inline"});
	e.preventDefault();
	return false;
});
$('#add').click(function() {
	$('form').css({"display":"inline"});
	$('#add').css({"display":"none"});
});
$('#t').click(function() {
	var temp = $('.compliment').text();
	var url = 'http://twitter.com/share?url=http%3A%2F%2Fwarmfuzzi.es&text=' + encodeURIComponent(temp);
	window.open (url, "mywindow","menubar=1,resizable=1,width=570,height=430");
});
$('#f').click(function() {
	var url = 'http://www.facebook.com/sharer.php?u=http%3A%2F%2Fwarmfuzzi.es';
	window.open (url, "mywindow","menubar=1,resizable=1,width=570,height=430");
});
/*$('#l').click(function(e) {
	var rndm = Math.random().toString(36).substring(5);
	var frbs_rndm = frbs.child('saved');
	frbs_rndm.child(rndm).set({text:$(".compliment").html()});
	$(".compliment").html("http://warmfuzzi.es/"+rndm);
	return false;
});*/
function loadNewCompliment() {
	frbs_new.once('value', function(childSnapshot, prevChildName) {
		console.log(childSnapshot.val());
		if(childSnapshot.val()) {
			var keys = Object.keys(childSnapshot.val());
			var prop = keys[ Math.floor(Math.random()*keys.length) ];
			$(".compliment").html(childSnapshot.val()[prop].text);
			frbs_new.child(prop).remove();
		}
		else {
			$(".compliment").html("Sorry, we ran out of compliments.");
		}
	});
}
function loadOldCompliment() {
	/*frbs_saved = frbs_old.child(window.location.pathname.substring(1));
	frbs_saved.once('value', function (childSnapshot, prevChildName) {
		$(".compliment").html(childSnapshot.val().text);
	});*/
}
function loadData() {
	frbs_data.on('value', function(snap) {
	console.log(snap.val());
		$('#num').html(snap.val());
	});
}
$("#happy").click(function() {
	$("#happy").css("display","none");
	$("#sad").css("display","none");
	frbs_data.transaction(function(count) {
		if(!voted) {
			voted = true;
			return count +1;
		}
		return;
	});
});
$("#sad").click(function() {
	voted = true;
	$("#happy").css("display","none");
	$("#sad").css("display","none");
});
if(window.location.pathname != "/") {
	console.log(window.location.pathname);
	loadOldCompliment();
	loadNewCompliment();
}
else {
	loadNewCompliment();
}
loadData();

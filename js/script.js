// carousel-reviews
$(document).ready(function(){
	$('.carousel-price').slick({
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 1
	});
});

// VK comments
$.ajax({
	url: 'https://api.vk.com/method/board.getComments?access_token=ce3f078a0b7ad547d719cb1268708bd0a1aa6b022d9dbf00e6d3317f5dfed1a416357110c4104c376132b&v=5.81&group_id=167692801&topic_id=48993182&need_likes=false&start_comment_id&extended=true&sort=desc',
	method: "GET",
	dataType: "JSONP",
	success: function(data) {
		
		var html = "";
		for (var i=0; i<5; i++) {
			for (var g=0; g<data.response.groups.length; g++) {
				for (var j=0; j<data.response.profiles.length; j++) {
					if (data.response.items[i].from_id == data.response.profiles[j].id) {
						html += "<div class='block'>"
						+ "<div class='img'>"
							+ "<img src='" + data.response.profiles[j].photo_100 + "'>" +
							"</div>" +
						"<div class='line'></div>" +
						"<div class='comments-text'>" +
							"<h3>" + data.response.profiles[j].first_name + "</h3>" +
							"<div class='text'>" + data.response.items[i].text + "</div>" +
						"</div>" + "</div>";
					}
				}
			}
		}
		$(".reviews .info-block").html(html);
	}
});

// Burger
let menuAll = document.querySelector('.menu-fixed .menu');
let burger = document.querySelector('.menu-fixed .burger');

$('.menu-fixed .burger').click( function () {
	menuAll.classList.toggle('open');
	burger.classList.toggle('burger-open');

	setTimeout(scrollNone, 250);

	function scrollNone() {
		document.body.classList.toggle('scroll-none');
	}
});
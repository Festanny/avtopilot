// carousel-reviews
$(document).ready(function(){
	$('.carousel-price').slick({
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
			  breakpoint: 1201,
			  settings: {
				slidesToShow: 2
			  }
			}
		]
	});
});

// VK comments
$.ajax({
	url: 'https://api.vk.com/method/board.getComments?access_token=017f1699997551a017b312b361d1a85d8f142c702fdb71879763194a4b59e3d733cc1077958e069218038&v=5.81&group_id=29110438&topic_id=34909285&need_likes=false&extended=true&sort=desc',
	method: "GET",
	dataType: "JSONP",
	success: function(data) {
		
		var html = "";
		for (var i=0; i<5; i++) {
				for (var j=0; j<data.response.profiles.length; j++) {
					if (data.response.items[i].from_id == data.response.profiles[j].id) {
						html += "<div class='block'>"
						+ "<div class='img'>"
							+ "<img src='" + data.response.profiles[j].photo_100 + "'>" +
							"</div>" +
						"<div class='line'></div>" +
						"<div class='comments-text'>" +
							"<h3>" + data.response.profiles[j].first_name + " " + data.response.profiles[j].last_name + "</h3>" +
							"<div class='text'>" + data.response.items[i].text + "</div>" +
						"</div>" + "</div>";
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
	document.body.classList.toggle('scroll-none');
});

$(window).on('load',function(){
	$('#stock').modal('show');
});
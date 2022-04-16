// carousel-reviews
$(document).ready(function () {
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
			},
			{
				breakpoint: 701,
				settings: {
					slidesToShow: 1
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
	success: function (data) {

		var html = "";
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < data.response.profiles.length; j++) {
				if (data.response.items[i].from_id == data.response.profiles[j].id) {

					var textReviews = data.response.items[i].text;

					textReviews = textReviews.replace('\n', "<br />");
					var endS = textReviews.lastIndexOf("], ");

					var regex = /(\|)([?!,.а-яА-ЯёЁ0-9a-zA-Z\s]+)(\])/gm;
					var str = textReviews.substr(0, endS + 2);
					let m;
					var strNames = "";

					if (textReviews.indexOf("], ") != '-1') {
						while ((m = regex.exec(str)) !== null) {
							if (m.index === regex.lastIndex) {
								regex.lastIndex++;
							}
							m.forEach((match, groupIndex) => {
								if (`${groupIndex}` == 2) {
									strNames = strNames + ', ' + `${match}`;
								}
							});
						}
						var str_1 = strNames.substr(2);
						var str_2 = data.response.items[i].text.substr(endS + 2);
						var str_all = str_1 + ',' + str_2;
					}
					else {
						str_all = textReviews;
					}

					html += "<div class='block'>"
						+ "<div class='img'>"
						+ "<img src='" + data.response.profiles[j].photo_100 + "'>" +
						"</div>" +
						"<div class='line'></div>" +
						"<div class='comments-text'>" +
						"<h3>" + data.response.profiles[j].first_name + " " + data.response.profiles[j].last_name + "</h3>" +
						"<div class='text'>" + str_all + "</div>" +
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

$('.menu-fixed .burger').click(function () {
	menuAll.classList.toggle('open');
	burger.classList.toggle('burger-open');
	document.body.classList.toggle('scroll-none');
});

$(window).on('load', function () {
	$('#stock').modal('show');
});

// Tab
$('.admin .info-block .panel .function ul li').click(function () {
	var id = $(this).attr('data-tab'),
		content = $('.admin .info-block .info .block[data-tab="' + id + '"]');

	$('.admin .info-block .panel .function ul li.active').removeClass('active');
	$(this).addClass('active');

	$('.admin .info-block .info .block.active').removeClass('active');
	content.addClass('active');
});

// Tab-student
$('.admin .info-block .info #training-system-id .student-functions > ul li').click(function () {
	var id = $(this).attr('data-tab-profile'),
		content = $('.admin .info-block .info .student-functions .form-edit[data-tab-profile="' + id + '"]');

	$('.admin .info-block .info #training-system-id .student-functions > ul li.active').removeClass('active');
	$(this).addClass('active');

	$('.admin .info-block .info .student-functions .form-edit.active').removeClass('active');
	content.addClass('active');
});

// Tab-branches
$('.admin .info-block .info .branches-system .student-functions ul li').click(function () {
	var id = $(this).attr('data-tab-branches'),
		content = $('.admin .info-block .info .student-functions .form-edit[data-tab-branches="' + id + '"]');

	$('.admin .info-block .info .branches-system .student-functions ul li.active').removeClass('active');
	$(this).addClass('active');

	$('.admin .info-block .info .student-functions .form-edit.active').removeClass('active');
	content.addClass('active');
});

// Tab-category
$('.admin .info-block .info .category-system .student-functions ul li').click(function () {
	var id = $(this).attr('data-tab-category'),
		content = $('.admin .info-block .info .student-functions .form-edit[data-tab-category="' + id + '"]');

	$('.admin .info-block .info .category-system .student-functions ul li.active').removeClass('active');
	$(this).addClass('active');

	$('.admin .info-block .info .student-functions .form-edit.active').removeClass('active');
	content.addClass('active');
});

// Tab-services
$('.admin .info-block .info .services-system .student-functions ul li').click(function () {
	var id = $(this).attr('data-tab-services'),
		content = $('.admin .info-block .info .student-functions .form-edit[data-tab-services="' + id + '"]');

	$('.admin .info-block .info .services-system .student-functions ul li.active').removeClass('active');
	$(this).addClass('active');

	$('.admin .info-block .info .student-functions .form-edit.active').removeClass('active');
	content.addClass('active');
});

// open form
function go(el) {
	console.log(el);
	console.log(el.checked);
	console.log(el.id);

	var spanRadio = document.querySelectorAll('.admin .info-block .info #training-system-id .student-functions .form-student .form2-student ul li .textLabel > span');
	
	if (document.querySelectorAll(".editForm").length != 0) {
		document.querySelector(".editForm").remove();
	}
	if (el.checked) {
		if (document.querySelector(".editForm") == null) {
			if (el.disabled == false) {
				el.insertAdjacentHTML("afterend", `<form action="" method="POST" class="editForm">
					<input type="text" placeholder="Ф.И.О.">
					<input type="phone" placeholder="Номер телефона">
					<input type="text" placeholder="Последние 6 цифр паспорта">
					<div>
						<input type="button" class="btn" value="Обновить">
					</div>
				</form>`);
				el.previousElementSibling.style.background = 'var(--gray-bl)';
				for(var i=0; i<spanRadio.length; i++) {
					spanRadio[i].style.background = 'var(--bg)';
				}
				var radioInput = document.querySelectorAll("input[type='radio']");
				for(var i=0; i<radioInput.length; i++) {
					radioInput[i].disabled = false;
				}
				el.previousElementSibling.style.background = 'var(--gray-bl)';
				el.disabled = true;
			}
		}
	}
	else {
		document.querySelector(".editForm").remove();
	}
}

















/*$("[href*='?id=']").click((e)=>{

	// let id = e;

	// $.ajax({
	// 	url: "sdfhskjfhjksd/1.php",
	// 	type: "GET",
    //     dataType: "html",
    //     data: id,

	// })
	//console.log(e);
	return false;
});*/
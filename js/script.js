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
$('.admin .info-block .info #student-management .student-functions > ul li').click(function () {
	var id = $(this).attr('data-tab-profile'),
		content = $('.admin .info-block .info #student-management .student-functions .form-edit[data-tab-profile="' + id + '"]');

	$('.admin .info-block .info #student-management .student-functions > ul li.active').removeClass('active');
	$(this).addClass('active');

	$('.admin .info-block .info #student-management .student-functions .form-edit.active').removeClass('active');
	content.addClass('active');
});

// Tab-branche
$('.admin .info-block .info #setting-branches .student-functions > ul li').click(function () {
	var id = $(this).attr('data-tab-branches'),
		content = $('.admin .info-block .info #setting-branches .student-functions .form-edit[data-tab-branches="' + id + '"]');

	$('.admin .info-block .info #setting-branches .student-functions > ul li.active').removeClass('active');
	$(this).addClass('active');

	$('.admin .info-block .info #setting-branches .student-functions .form-edit.active').removeClass('active');
	content.addClass('active');
});

// Tab-category
$('.admin .info-block .info #setting-categories .student-functions > ul li').click(function () {
	var id = $(this).attr('data-tab-category'),
		content = $('.admin .info-block .info #setting-categories .student-functions .form-edit[data-tab-category="' + id + '"]');

	$('.admin .info-block .info #setting-categories .student-functions > ul li.active').removeClass('active');
	$(this).addClass('active');

	$('.admin .info-block .info #setting-categories .student-functions .form-edit.active').removeClass('active');
	content.addClass('active');
});







// open form
function student(el) {
	console.log(el);
	console.log(el.checked);
	console.log(el.id);

	var spanRadio = document.querySelectorAll('.admin .info-block .info #student-management .student-functions .form-student .form2-student ul li .textLabel > span');
	
	if (document.querySelectorAll("#student-management .editForm").length != 0) {
		document.querySelector("#student-management .editForm").remove();
	}
	if (el.checked) {
		if (document.querySelector("#student-management .editForm") == null) {
			if (el.disabled == false) {
				el.insertAdjacentHTML("afterend", `<form action="" method="POST" class="editForm">
					<input type="text" placeholder="Ф.И.О.">
					<input type="phone" placeholder="Номер телефона">
					<input type="text" placeholder="Последние 1231236 цифр паспорта">
					<div>
						<input type="button" class="btn" value="Обновить">
					</div>
				</form>`);
				el.previousElementSibling.style.background = 'var(--gray-bl)';
				for(var i=0; i<spanRadio.length; i++) {
					spanRadio[i].style.background = 'var(--bg)';
				}
				var radioInput = document.querySelectorAll("#student-management .textLabel input[type='radio']");
				for(var i=0; i<radioInput.length; i++) {
					radioInput[i].disabled = false;
				}
				el.previousElementSibling.style.background = 'var(--gray-bl)';
				el.disabled = true;
			}
		}
	}
	else {
		document.querySelector("#student-management .editForm").remove();
	}
}

// open form-branches
function branche(el) {
	console.log(el);
	console.log(el.checked);
	console.log(el.id);

	var spanRadio = document.querySelectorAll('.admin .info-block .info #setting-branches .student-functions .form-student .form2-student ul li .textLabel > span');
	
	if (document.querySelectorAll("#setting-branches .editForm").length != 0) {
		document.querySelector("#setting-branches .editForm").remove();
	}
	if (el.checked) {
		if (document.querySelector("#setting-branches .editForm") == null) {
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
				var radioInput = document.querySelectorAll("#setting-branches .textLabel input[type='radio']");
				for(var i=0; i<radioInput.length; i++) {
					radioInput[i].disabled = false;
				}
				el.previousElementSibling.style.background = 'var(--gray-bl)';
				el.disabled = true;
			}
		}
	}
	else {
		document.querySelector("#setting-branches .editForm").remove();
	}
}

// open form-categories
function branche(el) {
	console.log(el);
	console.log(el.checked);
	console.log(el.id);

	var spanRadio = document.querySelectorAll('.admin .info-block .info #setting-categories .student-functions .form-student .form2-student ul li .textLabel > span');
	
	if (document.querySelectorAll("#setting-categories .editForm").length != 0) {
		document.querySelector("#setting-categories .editForm").remove();
	}
	if (el.checked) {
		if (document.querySelector("#setting-categories .editForm") == null) {
			if (el.disabled == false) {
				el.insertAdjacentHTML("afterend", `<form action="" method="POST" class="editForm">
					<input type="text" placeholder="Ф.И.О.">
					<input type="phone" placeholder="Номер телефона">
					<input type="text" placeholder="Последние 124124 цифр паспорта">
					<div>
						<input type="button" class="btn" value="Обновить">
					</div>
				</form>`);
				el.previousElementSibling.style.background = 'var(--gray-bl)';
				for(var i=0; i<spanRadio.length; i++) {
					spanRadio[i].style.background = 'var(--bg)';
				}
				var radioInput = document.querySelectorAll("#setting-categories .textLabel input[type='radio']");
				for(var i=0; i<radioInput.length; i++) {
					radioInput[i].disabled = false;
				}
				el.previousElementSibling.style.background = 'var(--gray-bl)';
				el.disabled = true;
			}
		}
	}
	else {
		document.querySelector("#setting-categories .editForm").remove();
	}
}


/*$("[href*='?id=']").click((e)=>{

	// let id = e.id;

	// $.ajax({
	// 	url: "sdfhskjfhjksd/1.php",
	// 	type: "GET",
    //     dataType: "html",
    //     data: id,

	// })
	//console.log(e);
	return false;
});*/

// mask for phone input
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('#phone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, true);
    input.addEventListener("keydown", mask, false)
  });
});


// Other choice (input radio)
var otherTextInput = $('.enroll .info-block form .desc:nth-of-type(3) .inputRadio .otherTextInput');
var inputAll = $('.enroll .info-block form .desc:nth-of-type(3) .inputRadio input');

inputAll.click( ()=> {
	if ($('.otherTextRadio').is(':checked')) {
		otherTextInput.addClass('openInput');
	}
	else {
		otherTextInput.removeClass('openInput');
	}
});
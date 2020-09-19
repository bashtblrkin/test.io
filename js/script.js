'use strict'

jQuery(function($){
   $("#phone").mask("+7 (999) 999-99-99");
   $("#phone2").mask("+7 (999) 999-99-99");
   $("#phone3").mask("+7 (999) 999-99-99");
}); 

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

    const slider = document.querySelector('.slider');

    slider.innerHTML = '';
    slider.innerHTML = `    
            <div class="features__item">
                <img src="img/features/location.png" alt="локация">
                <p>Выезд к вам на адрес,<br> в удобное для вас<br> время</p>
            </div>  
            <div class="features__item">
                <img src="img/features/polish.png" alt="полировка">
                <p>Используется<br>профессиональное <br> оборудование</p>
            </div>  
            <div class="features__item">
                <img src="img/features/mechanic.png" alt="механик">
                <p>Выполняют работу<br>мастера своего дела</p>
            </div>  
            <div class="features__item">
                <img src="img/features/seat_belt.png" alt="безопасность">
                <p>Хорошее освещение<br>от ваших фар, залог<br>безопасности для вас<br>и вашей семьи</p>
            </div>  
            <div class="features__item">
                <img src="img/features/shield.png" alt="гарантия качества">   
                <p class="features__item-push">Гарантия качества</p>
            </div>  `;

    $(document).ready(function() {
        /*Слайдер с преимуществами*/
        $('.slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button class="prev arrow"></button>',
            nextArrow: '<button class="next arrow"></button>'
        });
    });
}

$(document).ready(function(){
    $('.header__burger').click(function(e) {
            $('.header__burger, .navigation__menu').toggleClass('active');       
            $('body').toggleClass('lock'); 
    }); 
    $('.nav-item').click (function(e) {
        $('.header__burger.active, .navigation__menu.active').removeClass('active');
        $('body').removeClass('lock'); 
    });
});

$( document ).ready(function() {
    $("#btn").click(
		function(){
			sendAjaxForm('popup','ajax_form', 'smart.php');
			return false; 
		}
	);
});

function sendAjaxForm(popup, ajax_form, url) {
    $.ajax({
        url:     url, 
        type:     "POST", 
        dataType: "html", 
        data: $("#"+ajax_form).serialize(),  
        success: function(response) { 
            if (response == 'true') {
                $('#'+popup).html('');
            //     $('.'+popup).html(`<svg id="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            //     width="94" height="94" viewBox="0 0 47 47"  >
            //     <title>animation icon -OK-</title> 
            //           <circle fill="#4CAF50" cx="24" cy="24" r="21"/>
            //             <path class="path" fill= "none" stroke ="#CCFF90" stroke-width ="1.5" stroke-dasharray= "70.2" stroke-dashoffset="70.2" 
            //             d="M 34.6 14.6  L 21 28.2 L 15.4 22.6 L 12.6 25.4 L 21 33.8 L 37.4 17.4z">
            //             <animate id="p1" attributeName="stroke-dashoffset" begin="svg1.click" values="70.2;0" dur="1.5s" repeatCount="1" fill="freeze" calcMode="paced" restart="whenNotActive"/> 
            //             <animate id="f1" attributeName="fill" begin = "p1.end" values="#4CAF50; #CCFF90"  dur="1s" fill="freeze" restart="whenNotActive" /> 
            //     </path> 
            //    </svg>`);
            }	
    	},
    	error: function(response) { // Данные не отправлены
            // $('#result_form').html('Ошибка. Данные не отправлены.');
            if (response == 'false') {
                console.log('false');
            }
    	}
 	});
}

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const phoneClient = popupLink.previousElementSibling ==  null ? '' : popupLink.previousElementSibling.value;
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);   
            popupOpen(curentPopup, phoneClient);
            e.preventDefault();
        });
    }
} 

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            const targetClose = e.target.closest('.popup');
            popupClose(targetClose);
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup, phoneClient='') {
    if (curentPopup) {
        curentPopup.querySelector('.input').value = phoneClient;
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function(e) {
            if (!e.target.closest('.popup__content')) {
                const targetClose = e.target.closest('.popup');
                popupClose(targetClose);
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
        popupActive.classList.remove('open');

}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        }
    }
})();
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();
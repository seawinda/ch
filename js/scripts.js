$(document).ready(function() {


    /* slick slider*/



    var is_touch = !!("ontouchstart"in window);
    if (!is_touch) {
        $('.pages').each(function (idx, item) {
            var carouselId = "carousel" + idx;
            this.id = carouselId;
            $(this).find('.pages__items').slick({
                infinite: false,
                arrows: true,
                centerMode: false,
                variableWidth: true,
                slidesToShow: 1,
                slide: "#" + carouselId + " .pages__item",
                appendArrows: "#" + carouselId + ' .pager',
                prevArrow: '<button type="button" class="pager-arrow left"></button>',
                nextArrow: '<button type="button" class="pager-arrow right"></button>',
                initArrowEvents: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: false
                        }
                    },
                    {
                        breakpoint: 680,
                        settings: {
                            arrows: false
                        }
                    }
                ]
            });
        });
        $('.sections__items').slick({
            infinite: false,
            arrows: true,
            centerMode: false,
            slidesToShow: 1,
            appendArrows: '.sections__pager',
            prevArrow: '<button type="button" class="pager-arrow left"></button>',
            nextArrow: '<button type="button" class="pager-arrow right"></button>',
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        arrows: false
                    }
                },
                {
                    breakpoint: 680,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).closest('.sections').find('.sections__pager .pager-arrow.right').each(function () {
            $(this).hide();
            var sectionsActivePagesArrowRight = $('.sections__item.slick-active .pages .pager-arrow.right');
            var sectionsActiveSectionsArrowRight = $('.sections__pager .pager-arrow.right');
            var sectionsActivePagesArrowLeft = $('.sections__item.slick-active .pages .pager-arrow.left');
            var sectionsActiveSectionsArrowLeft = $('.sections__pager .pager-arrow.left');

            if (sectionsActivePagesArrowRight.hasClass('slick-disabled') || sectionsActivePagesArrowRight.length <= 0) {
                sectionsActiveSectionsArrowRight.show();
            } else {
                sectionsActiveSectionsArrowRight.hide();
            }
            if ($('.sections__item.slick-active .first-screen').length > 0) {
                sectionsActiveSectionsArrowRight.css('width', '100%');
                sectionsActiveSectionsArrowLeft.css('width', '0');
            } else {
                sectionsActiveSectionsArrowRight.css('width', '15%');
                sectionsActiveSectionsArrowLeft.css('width', '15%');
            }

            if (sectionsActivePagesArrowLeft.hasClass('slick-disabled') && (!(sectionsActiveSectionsArrowLeft.hasClass('slick-disabled'))) || (sectionsActivePagesArrowLeft.length <= 0 && (!(sectionsActiveSectionsArrowLeft.hasClass('slick-disabled'))))) {
                sectionsActiveSectionsArrowLeft.show();
            } else {
                sectionsActiveSectionsArrowLeft.hide();
            }
        });
    } else {
        $('.pages').each(function (idx, item) {
            var carouselId = "carousel" + idx;
            this.id = carouselId;
            $(this).find('.pages__items').slick({
                infinite: false,
                arrows: false,
                centerMode: false,
                variableWidth: true,
                slidesToShow: 1,
                slide: "#" + carouselId + " .pages__item"
            });
        });
        $('.sections__items').slick({
            infinite: false,
            arrows: false,
            centerMode: false,
            slidesToShow: 1
        })
    }


    var originalAddClassMethod = $.fn.addClass;
    var originalRemoveClassMethod = $.fn.removeClass;
    var originalCssClassMethod = new $.Event('addCss'),
        orig = $.fn.css;
    $.fn.addClass = function () {
        var result = originalAddClassMethod.apply(this, arguments);
        $(this).trigger('classChanged');
        return result;
    };
    $.fn.removeClass = function () {
        var result = originalRemoveClassMethod.apply(this, arguments);
        $(this).trigger('classChanged');
        return result;
    };

    $.fn.css = function () {
        $(this).trigger(originalCssClassMethod);
        return orig.apply(this, arguments);
    };


    $('.pager-arrow.right').bind('classChanged', function () {
        var sectionsActivePagesArrowRight = $('.sections__item.slick-active .pages .pager-arrow.right');
        var sectionsActiveSectionsArrowRight = $('.sections__pager .pager-arrow.right');
        var sectionsActiveSectionsArrowLeft = $('.sections__pager .pager-arrow.left');
        if ((sectionsActivePagesArrowRight.hasClass('slick-disabled')) || (sectionsActivePagesArrowRight.length <= 0)) {
            sectionsActiveSectionsArrowRight.show();
        } else {
            sectionsActiveSectionsArrowRight.hide();
        }
        if($('.sections__item.slick-active .first-screen').length>0) {
            sectionsActiveSectionsArrowRight.css('width', '100%');
            sectionsActiveSectionsArrowLeft.css('width', '0');
        } else {
            sectionsActiveSectionsArrowRight.css('width', '15%');
            sectionsActiveSectionsArrowLeft.css('width', '15%');
        }
    });
    $('.pager-arrow.left').bind('classChanged', function () {
        var sectionsActiveSectionArrowLeft = $('.sections__item.slick-active .pages .pager-arrow.left');
        if (sectionsActiveSectionArrowLeft.hasClass('slick-disabled') || sectionsActiveSectionArrowLeft.length <= 0 ) {
            $('.sections__pager .pager-arrow.left').show();
        } else {
            $('.sections__pager .pager-arrow.left').hide();
        }

    });


    /*logo*/
    $('.sections__item').bind('classChanged', function () {
        var sectionsItem = $('.sections__item');
        if ($(this).hasClass('slick-active') && $(this).hasClass('js-title')) {
            $('body').addClass('background-dark').addClass('mobile-burger');
        } else {
            $('body').removeClass('background-dark').removeClass('mobile-burger');        }

        if ($('.sections__item.slick-active .first-screen').length>0) {
            $('body').removeClass('hide-button')
                .addClass('hide-link');

        } else {
            $('body').addClass('hide-button')
                .removeClass('hide-link');     }

        var sections = sectionsItem.length;

        if ($('.theend').hasClass('slick-active')) {
            $('.sections__item.slick-active .pages .pager-arrow.right').hide();
            $('.left-clone').show();
        } else {
            $('.left-clone').hide();
        }

    });
    $('.left-clone').click(function() {
        $('.sections__items').slick('slickGoTo', $('.sections__item').length-2);
        $('.left-clone').hide();
    });


    /* background */
    var lFollowX = 0,
        lFollowY = 0,
        x = 0,
        y = 0,
        friction = 1 / 30;

    function moveBackground() {
        if (($(window).width() > '1024')) {

            x += (lFollowX - x) * friction;
            y += (lFollowY - y) * friction;

            translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

            $('.js-bg').css({
                '-webit-transform': translate,
                '-moz-transform': translate,
                'transform': translate
            });

            window.requestAnimationFrame(moveBackground);
        }
    }

    //$(window).on('mousemove click', function (e) {
        $(window).on('mousemove', function (e) {
        var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
        var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
        lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
        lFollowY = (10 * lMouseY) / 100;

    });

    moveBackground();

    /* pagesNums */
    $('.pages__item').bind('classChanged', function () {
        if ($(this).hasClass('slick-active')) {
            var page = $(this);
            var classname = page.attr('class');
            var arr = classname.split(' ');
            $.each(arr, function (index, value) {
                if (value.indexOf('pagenum') >= 0) {
                    var list = page.closest('section').find('.pages-nums__list li');
                    var num = parseInt(value.replace(/\D+/g, ""), 10);
                    for (var i = 0; i < list.length; i++) {
                        list.eq(i).removeClass('active')
                    }
                    for (var j = 0; j < num; j++) {
                        list.eq(j).addClass('active');
                    }
                }
            });
        }

    });

    /* reviews */
    $('.reviews__items').slick({
        slide: ".reviews__item",
        infinite: true,
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        cssEase: 'linear',
        appendArrows: '.reviews__pager',
        prevArrow: '<button type="button" class="reviews__pager-arrow left js-button"></button>',
        nextArrow: '<button type="button" class="reviews__pager-arrow right js-button"></button>',
        swipe: false,
        dragging: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {}
            },
            {
                breakpoint: 680,
                settings: {}
            }
        ]
    });


    /*Modals*/
    var modal;

    var modalOverlay = $(".modal-overlay");
    var closeButton = $(".close-button, .go_to, .done, .open-else");
    var openButton = $('.modal-open');
    var topPos = "null";
    var modaltoggle = function (modal) {
        if (!modal.hasClass('active')) {
            var pageBody = $('body');
            var offset = $(window).scrollTop();
            var heightModal = modal.find('.modal-guts').eq(0).outerHeight();
            modal.css({
                'margin-top': offset + 'px'
            });


            topPos = $(window).scrollTop();

            modalOverlay.addClass('active');
            modal.addClass('active');
            pageBody.css('padding-right', returnScrollWidth());
            $('body, html').css('overflow', 'hidden');
            modal.find('.modal-guts').eq(0).focus();
            $(window).scrollTop(topPos);
            //  modal.css('top', modalTop);
            if (modal.attr('id') == 'accept') {
                clearTimeout(this.id);
                this.id = setTimeout(modalclose, 2000);
            }
            if(modal.hasClass('active')&&modal.hasClass('js-modal-video')) {

                var iframe = modal.find('iframe');
                var src=iframe.data('src');
                iframe.attr('src',src);
                modal.find('.modal__video-item').show();
                $('.cursor').addClass('hidden');
                $('.js-modal-video.active iframe').on('load',function () {
                    modal.find('.js-overlay').removeClass('hideframe');

                });

            }
            $('.hamburger').addClass('is-active');
            if(!($('.sections__item.slick-active').hasClass('js-title'))) {
                pageBody.toggleClass('background-dark');
            } else {
                pageBody.toggleClass('mobile-burger');
            }
            pageBody.toggleClass('modal-mode');

        }
        else {

            modalclose();
        }
    };
    var modalclose = function () {
        var pageBody = $('body');
        var modal=$('.modal.active');
        modal.removeClass('active');
        if(modal.hasClass('js-modal-video')) {
            var iframe = modal.find('iframe');
            var src=iframe.data('src');
            iframe.attr('src','');

            modal.find('.modal__video-item').hide();
            $('.js-modal-video iframe').on('load',function () {
                modal.find('.js-overlay').addClass('hideframe');
            });
        }
        modalOverlay.removeClass('active');
        pageBody.css('padding-right', 0);
        $('html, body').css('overflow', 'visible');
        $(window).scrollTop(topPos);
        modal.css({
            'margin': 'inherit'
        });
        $('.hamburger').removeClass('is-active');
        if(!($('.sections__item.slick-active').hasClass('js-title'))) {
            pageBody.removeClass('background-dark')
        } else {
            pageBody.addClass('mobile-burger');
        }


        pageBody.removeClass('modal-mode');
    };
    closeButton.click(function (e) {
        e.preventDefault();
        var modal = $(this).closest('.modal');
        modalclose(modal);
    });
    modalOverlay.click(function () {
        var modal = $(this).closest('.modal.active');
        modalclose(modal);

    });

    openButton.click(function (e) {
        e.preventDefault();
        var modal = $(this).attr('data-modal');

        if($('.hamburger').hasClass('is-active'))  modalclose($(modal));
        else modaltoggle($(modal));
    });
    $('.modal-close').click(function (e) {
        var modal = $(this).closest('.modal');
        modal.removeClass('active')
    });

    /*scrollbar width*/
    function returnScrollWidth() {
        var div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return scrollWidth;
    }

    /* link to slide*/
    $('a[data-slide]').click(function (e) {
        e.preventDefault();
        var link = $(this);
        var slideno = link.data('slide');
        var sectionno = link.data('section');
        var sectionsItem = $('.sections__item');
        var sectionsItems = $('.sections__items');
        var sectiosActivePageItem = $('.sections__item.slick-active .pages__item');
        var pages;
        if($('.hamburger').hasClass('is-active')) {
            modalclose();
        }
        for (var i=0; i<parseInt(sectionno-1); i++) {
            pages = sectionsItem.eq(i).find('.pages__items').find('.pages__item').length;
            sectionsItem.eq(i).find('.pages__items').slick('slickGoTo', pages-1, true);
        }
        for (var j=parseInt(sectionno); j<sectionsItem.length; j++) {
            sectionsItem.eq(j).find('.pages__items').slick('slickGoTo', 0, true);
        }
        var scroll= true;
        if(link.attr('data-scroll')) {

            scroll = link.data('scroll');
        }

        sectionsItems.slick('slickGoTo', sectionno - 1, scroll);
        $('.sections__item.slick-active .pages__items').slick('slickGoTo', slideno - 1, scroll);
        sectionsItems.slick('slickSetOption', 'swipe', true);
        var slidesCount= sectionsItems.find('.sections__item[data-slick-index='+(sectionno-1)+'] .pages__item').length;
        if((slideno)<=slidesCount) {
            sectionsItems.slick('slickSetOption', 'swipe', false);
        }
        if(slidesCount==1) {
            sectionsItems.slick('slickSetOption', 'swipe', true);
        }

    });

    /* button hover animation */
    $('.moving-button').mouseenter(function () {
        $(this).addClass("button-hovered"),
            setTimeout(function () {
                $(this).hasClass("button-hovered") && $(this).removeClass("button-hovered")
            }
                .bind(this), 410)
    });
    $('.moving-button').on("webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationend", function () {
        $(this).removeClass("button-hovered")
    });
    /* books */
    $('.js-book-link').mouseenter(function(e) {
        e.preventDefault();
        var num = $(this).data('book');
        var links = $('.js-book-link');
        var books = $('.js-book');
        links.each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        books.each(function() {
            $(this).removeClass('active');
        });
        books.eq(num-1).addClass('active');
    });



    var initSwipe = $('.sections__items').on('swipe', function(event, slick, direction) {
        var sections = $('.sections__items');
        var sectionsItem = $('.sections__item');
        sections.slick('slickSetOption', 'swipe', true);

        var currentIndex = $(this).slick('slickCurrentSlide');
        var pagesCount=sectionsItem.eq(currentIndex).find('.pages__item').length;

        var pages =sectionsItem.eq(currentIndex).find('.pages__items');
        if (pagesCount>1) {

            sections.slick('slickSetOption', 'swipe', false);

                var currentPage= pages.slick('slickCurrentSlide');

                if((currentPage==(pagesCount-1))&&(direction=='left')) {
                    if(sections.hasClass('activeSwipeLeft')) {

                        sections.slick('next');
                        sections.slick('slickSetOption', 'swipe', true);
                        sections.removeClass('activeSwipeLeft');
                    }
                    else {
                        sections.addClass('activeSwipeLeft');

                    }
                }
            if((currentPage==0)&&(direction=='right')) {

                if(sections.hasClass('activeSwipeRight')) {
                    sections.slick('prev');
                    sections.slick('slickSetOption', 'swipe', true);
                    sections.removeClass('activeSwipeRight');
                }
                else {
                    sections.addClass('activeSwipeRight');

                }
            }

        }

    });

    $('.expand').on('click', function(e) {
        e.preventDefault();
        var course = $(this);
        if (!course.closest('.js-collapse').hasClass('js-expand')) {
            $('.js-collapse').removeClass('js-expand');
        }
        course.closest('.js-collapse').toggleClass('js-expand');
    });

    $.extend({
        getUrlVars: function(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function(name){
            return $.getUrlVars()[name];
        }
    });


    /*links outside*/
    var sectionNumber = $.getUrlVar('sectionno');
    var pageNumber=$.getUrlVar('slideno');
    for (var i=0; i<parseInt(sectionNumber-1); i++) {
        pages = $('.sections__item').eq(i).find('.pages__items').find('.pages__item').length;
        $('.sections__item').eq(i).find('.pages__items').slick('slickGoTo', pages-1, true);
    }
    for (var j=parseInt(sectionNumber); j<$('.sections__item').length; j++) {
        $('.sections__item').eq(j).find('.pages__items').slick('slickGoTo', 0, true);
    }
    $('.sections__items').slick('slickGoTo', sectionNumber - 1, true);
    $('.sections__item.slick-active .pages__items').slick('slickGoTo', pageNumber - 1, true);
    $('.sections__items').slick('slickSetOption', 'swipe', true);
    if((pageNumber)<$('.sections__item.slick-active .pages__item').length) {
        $('.sections__items').slick('slickSetOption', 'swipe', false);
    }

    /*external links*/
    $('a.external-link').click(function(event) {
                event.preventDefault();
                event.stopPropagation();
                window.open(this.href, '_blank');
    });

    /*input mask*/
    jQuery(function($){
        $('input[type="tel"]').mask('+7 999 999 9999');
    });

    /* validation */
    $('#form-buy1').validate( {
        rules:{
            'user-firstname':{
                required: true
            },
            'user-phone':{
                required: true
            },
            'user-email': {
                email: true,
                required: true
            }
        },
        messages:{
            'user-firstname':{
                required: "Пожалуйста, заполните поле"
            },
            'user-phone':{
                required: "Пожалуйста, заполните поле"
            },
            'user-email':{
                required: "Пожалуйста, заполните поле",
                email: "Введите правильный имейл"
            }
        }
    } );
    $('#form-buy2').validate( {
            rules:{
                'user-firstname':{
                    required: true
                },
                'user-phone':{
                    required: true
                },
                'user-email': {
                    email: true,
                    required: true
                }
            },
            messages:{
                'user-firstname':{
                    required: "Пожалуйста, заполните поле"
                },
                'user-phone':{
                    required: "Пожалуйста, заполните поле"
                },
                'user-email':{
                    required: "Пожалуйста, заполните поле",
                    email: "Введите правильный имейл"
                }
            }

    } );
    $('#form-buy3').validate( {
        rules:{
            'user-firstname':{
                required: true
            },
            'user-phone':{
                required: true
            },
            'user-email': {
                email: true,
                required: true
            }
        },
        messages:{
            'user-firstname':{
                required: "Пожалуйста, заполните поле"
            },
            'user-phone':{
                required: "Пожалуйста, заполните поле"
            },
            'user-email':{
                required: "Пожалуйста, заполните поле",
                email: "Введите правильный имейл"
            }
        }
    } );
});

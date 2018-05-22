var is_touch = !!("ontouchstart"in window);
var is_chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var is_safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
var is_webkit = is_chrome || is_safari;
var winH, winW;
var scrollbar_width;
var $body = $("body");
var $title = $("title");
var introCycle = null;
var YOO;
var clicks = {
    disabled: 0,
    inhibit: function() {
        var self = this;
        self.disabled++;
        setTimeout(function() {
            self.disabled--
        }, 500)
    }
};

function get_scrollbar_width() {
    var $helperDiv = $("<div />");
    $("body").append($helperDiv.width(100).css("overflow", "scroll"));
    scrollbar_width = 100 - $helperDiv[0].clientWidth;
    $helperDiv.remove()
}
function getWinProps() {
    winW = $(window).width();
    winH = $(window).height();
    get_scrollbar_width()
}


function initialize() {
    $body.addClass("hidden").addClass("animate");
    $("html").removeClass("no-fouc");
    getWinProps();
    $(window).on("load resize orientationchange", getWinProps);
    if (!is_touch) {

        /*keepOutline();*/

        new Cursor("body","slider-main",function(cursor, x, y, w, h, $container) {
                var result;

                var _p = $('body');
                var sectionsPagerArrowLeft = $(".sections__pager .pager-arrow.left");
                var sectionsPagerArrowRight = $(".sections__pager .pager-arrow.right");
                var sectionsActiveArrowLeft = $(".sections__item.slick-active .pages .pager-arrow.left");
                var sectionsActiveArrowRight = $(".sections__item.slick-active .pages .pager-arrow.right");
                if (_p.content_visible && scrollbar_width && x >= w - scrollbar_width) {
                    result = "right"
                } else if (x < w * .15) {
                    if (sectionsPagerArrowLeft.hasClass("slick-disabled")&&sectionsActiveArrowLeft.hasClass("slick-disabled")||(sectionsPagerArrowLeft.hasClass("slick-disabled")&&sectionsActiveArrowLeft.length<=0))
                        result = "right";
                    else
                        result = "left"
                } else if (x > w * .85) {
                    if ((sectionsPagerArrowRight.hasClass("slick-disabled")&&sectionsActiveArrowRight.hasClass("slick-disabled"))||(sectionsPagerArrowRight.hasClass("slick-disabled")&&sectionsActiveArrowRight.length<=0))
                        result = "left";
                    else
                        result = "right"
                } else {
                    result = "down"

                }
                if ($('.sections__item.slick-active .first-screen').length>0) {
                    result = "right"
                }
                if($('.modal-wrapper').css('opacity')==1) {
                    result = "down"
                }

                return result

            }
            ,{
                mouseup: function(e, cursor, x, y, w, h) {

                }
            });


    }




}

function Cursor(selector, type, get_class, events) {
    var visible = false;
    var $body = $("body");
    var $cursor = $("<div>").addClass("cursor").appendTo($body);
    var self = this;
    var lastPosition = {
        x: 0,
        y: 0
    };
    var hideTimeout, target, hoverTimeout;
    self.klass = null;
    var _show = function() {
        $cursor.removeClass("hidden");
        $body.addClass("hide-cursor")
    };
    self.show = function() {
        _show();
        visible = true
    }
    ;
    var _hide = function() {
        $cursor.addClass("hidden");
        $body.removeClass("hide-cursor")
    };
    self.hide = function() {
        _hide();
        visible = false
    }
    ;
    self.hide();
    var deferred = new function() {
            var klass, x, y;
            var raf = null;
            this.update = function(_klass, _x, _y) {
                klass = _klass;
                x = _x;
                y = _y;
                if (raf)
                    return;
                raf = requestAnimationFrame(function() {
                    raf = null;
                    if (klass) {
                        _show();
                        $cursor.attr("class", klass + " cursor")
                    } else {
                        _hide()
                    }
                    TweenLite.set($cursor, {
                        x: x - 100,
                        y: y
                    })
                })
            }
        };
    var $document = $(document);
    $document.on("mousemove", function(e) {
        if (!visible || lastPosition.x == e.pageX && lastPosition.y == e.pageY)
            return;
        var $ele = $(e.target).closest(selector);
        if (!$ele.length)
            return;
        if ($(document.elementFromPoint(e.pageX, e.pageY)).closest(".default-cursor").length) {
            self.klass = null
        } else if ($(document.elementFromPoint(e.pageX, e.pageY)).closest("a").length||$(document.elementFromPoint(e.pageX, e.pageY)).closest(".js-button").length||$(document.elementFromPoint(e.pageX, e.pageY)).closest("input[type='submit']").length||$(document.elementFromPoint(e.pageX, e.pageY)).closest("audio").length||$(document.elementFromPoint(e.pageX, e.pageY)).closest(".js-video").length) {
            self.klass = "down hover";

        } else {
            var x = $ele.offset().left
                , y = $ele.offset().top
                , w = $ele.width()
                , h = $ele.height();
            self.klass = get_class(self, e.pageX - x, e.pageY - y, w, h, $ele)
        }
        deferred.update(self.klass, e.pageX, e.pageY)
    });
    if (events) {
        for (var ev in events)
            $document.on(ev, selector, function(e) {
                var $ele = $(e.target).closest(selector);
                if (!$ele.length)
                    return;
                var x = $ele.offset().left
                    , y = $ele.offset().top
                    , w = $ele.width()
                    , h = $ele.height();
                $.proxy(events[ev], this)(e, self, e.pageX - x, e.pageY - y, w, h)
            })
    }
    $document.on("mouseenter", selector, function(e) {
        self.show()
    }).on("mouseleave", selector, function() {
        clearTimeout(hideTimeout);
        visible = false;
        hideTimeout = setTimeout(function() {
            if (!visible)
                self.hide()
        }, 200)
    });


}


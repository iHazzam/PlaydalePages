$(function () {
    var Geek = (function () {
        console.log('%c                     \n  What\'s up, geeks?  \n                     ', 'background: #222; color: #bada55');
        var hover_preloads = [
            "/assets/img/social/social-twitter--hover.png",
            "/assets/img/social/social-twitter--hover@2x.png",
            "/assets/img/social/social-github--hover.png",
            "/assets/img/social/social-github--hover@2x.png",
            "/assets/img/social/social-built-in-chicago--hover.png",
            "/assets/img/social/social-built-in-chicago--hover@2x.png"
        ];
        var preload_images = [];
        for (var i = 0; i < hover_preloads.length; i++) {
            preload_images[i] = new Image();
            preload_images[i].src = hover_preloads[i];
        }
    })();

    var ContactForm = (function () {
        var hasScrollbar = window.innerWidth > document.documentElement.clientWidth,
            $jsFormFields = $('.js-form-field'),
            $jsContactForm = $('.js-contact-form'),
            formUrl = 'https://fieldgoal.io/f/AGz9ZcOcd0nXSBLM38wsGiiTkLhuaUxZ';

        var init = function () {
            _bindEvents();
            _expandIfQueryParamPresent();
        };

        var _expandIfQueryParamPresent = function () {
            if (_queryParamIsPresent()) {
                ContactForm.show();
            }
        };

        var _queryParamIsPresent = function () {
            return window.location.href.indexOf('?contact-us') > -1
                || window.location.href.indexOf('&contact-us') > -1;
        };

        var _bindEvents = function () {
            var $showButtons = $('.js-show-contact-form'),
                $hideButtons = $('.js-hide-contact-form');

            $showButtons.click(function (e) {
                e.preventDefault();
                show();
            });

            $hideButtons.click(function (e) {
                e.preventDefault();
                hide();
            });

            $(document).keyup(function (e) {
                if (e.keyCode == 27)  {
                    hide();
                }
            });

            $jsFormFields.focus(function () {
                $(this).closest('.form-group').addClass('is-active');
            });

            $jsFormFields.blur(function () {
                $(this).closest('.form-group').removeClass('is-active');
            });

            $jsContactForm.parsley().on('form:submit', function () {
                $.ajax({
                    url: formUrl,
                    type: 'post',
                    headers: {
                        Accept: 'application/javascript',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    data: $jsContactForm.serialize()
                }).done(function (data) {
                    $jsContactForm.trigger('reset');
                    // @todo: Hide the forms
                    $('.js-contact-form-before-submit').addClass('is-hidden');
                    $('.js-contact-form-submitted').removeClass('is-hidden');
                });
            });

            $jsContactForm.submit(function (e) {
                e.preventDefault();
            });
        };

        var show = function () {
            var $modal = $('.js-contact-form-modal');

            $('.js-contact-form-before-submit').removeClass('is-hidden');
            $('.js-contact-form-submitted').addClass('is-hidden');

            if (hasScrollbar) {
                var $hideButton = $('.js-hide-contact-form');
                $hideButton.addClass('fading');

                $('html').addClass('no-scroll').addClass('scrollbar-placeholder');

                $modal.addClass('show');
                $modal.on(transitionEnd, function () {
                    $hideButton.removeClass('fading');
                    $('body').addClass('no-scroll').addClass('scrollbar-placeholder');
                    $modal.off(transitionEnd);
                });
            } else {
                $modal.addClass('show');
                $('html, body').addClass('no-scroll');
            }

            $('.js-contact-form-name').focus();
        };

        var hide = function () {
            var $modal = $('.js-contact-form-modal'),
                $hideButton = $('.js-hide-contact-form'),
                transitionEnds = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend transitionEnd';

            if (hasScrollbar){
                $('html, body').removeClass('no-scroll').removeClass('scrollbar-placeholder');
                $hideButton.addClass('fading');
                $modal.removeClass('show');
                
                $modal.on(transitionEnds, function (e) {
                    $modal.removeClass('fading');
                    $hideButton.removeClass('fading');
                    $modal.off(transitionEnds);
                });
            } else {
                $modal.removeClass('show');
                $('html, body').removeClass('no-scroll');
            }
        };

        return {
            init: init,
            show: show,
            hide: hide
        };
    })();

    ContactForm.init();

    var Scroller = (function () {
        var $target;

        var init = function ($initTarget) {
            $target = $initTarget;
        };

        return {
            init: init
        };
    })();
});

"use strict";

$(document).ready(function() {

    initLoad();
    lightBox();
    btns();
    grid();
    owlCarousels();
    initMap();

});

    // initialLoad
    // ==================================================

    function initLoad() {


        // preloader, page-transition, navigation
        // ==================================================

        var menu = $(".nav");
        var menuIcon = $(".menu-icon");
        var menuItem = $(".nav .st");
        var spanOne = $(".transition span:nth-child(1)");
        var spanTwo = $(".transition span:nth-child(2)");
        var submenuBtn = $(".menu .has-children");
        var preloader = $(".preloader");
        var position = menuIcon.position();

        setTimeout(function(){
            TweenMax.to(preloader, 1, {height: 0, ease:Power2.easeInOut});
            TweenMax.to(".main-content", 1.6, {opacity: 1, ease:Power2.easeInOut});
            setTimeout(function(){
                preloader.remove();
            }, 1000);
        }, 800);

        Barba.Pjax.Dom.wrapperId = "ajax-a";
        Barba.Pjax.Dom.containerClass = "ajax-b";

        Barba.Pjax.start();

        var pageTransition = Barba.BaseTransition.extend({
            start: function() {
                Promise
                .all([this.newContainerLoading, this.transitionStart()])
                .then(this.transitionEnd.bind(this));
            },

            transitionStart: function() {
                menuIcon.removeClass("active");
                TweenMax.to(menuItem, 0.7, {autoAlpha:0, ease:Power4.easeInOut}, 0.05);
                TweenMax.to(spanOne, 0.6, {width:"0", delay: 0.4, ease:Power2.easeInOut});
                TweenMax.to(spanTwo, 1, {height:"130%", rotation: 6, ease:Power2.easeInOut});
                TweenMax.to(".main-content", 0.8, {opacity: 0, ease:Power2.easeInOut});
                return new Promise(function(resolve, reject) {
                    window.setTimeout(function() {
                        TweenMax.to(window, 1, {scrollTo:0, ease:Power2.easeOut});
                        resolve();
                    }, 1000);
                });
            },

            transitionEnd: function() {
                this.done();
                ajaxLoad();
                menu.hide();
                TweenMax.to(".main-content", 1.6, {opacity: 1, ease:Power2.easeInOut});
                TweenMax.set(menuItem, {clearProps:"all"});
                TweenMax.set(spanOne, {clearProps:"all"});
                TweenMax.to(spanTwo, 1, {height: 0, ease:Power2.easeInOut, clearProps:"all"});
            }
        });

        Barba.Pjax.getTransition = function() {
            return pageTransition;
        };

        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }



        // navigation
        // ==================================================

        menuIcon.on("click",function(){
            if (menuIcon.hasClass("active")) {
                menuIcon.removeClass("active");
                TweenMax.to(menuItem, 0.7, {autoAlpha:0, ease:Power4.easeInOut}, 0.05);
                TweenMax.to(spanOne, 0.6, {width:0, delay: 0.4, ease:Power2.easeInOut});
                setTimeout(function(){
                    menu.hide();
                    TweenMax.set(menuItem, {clearProps:"all"});
                    TweenMax.set(spanOne, {clearProps:"all"});
                    TweenMax.to(spanTwo, 1, {height: 0, ease:Power2.easeInOut, clearProps:"all"});
                }, 1000);
            } else {
                menu.show();
                menuIcon.addClass("active");
                TweenMax.to(spanTwo, 1, {height:"130%", rotation: 6, ease:Power2.easeInOut});
                TweenMax.to(spanOne, 0.6, {width:"55%", delay: 0.8, ease:Power2.easeInOut});
                TweenMax.from(menuItem, 0.7, {autoAlpha:0, delay: 0.8, ease:Power4.easeInOut}, 0.05);
            }
        });

        submenuBtn.on("click",function(){
            if( $(this).hasClass("active") ) {
                $(this).removeClass("active");
                $(this).find(".submenu").slideUp(200);
            } else {
                $(this).addClass("active");
                $(this).find(".submenu").slideDown(200);
            }
        });
    }



    // lightBox
    // ==================================================

    function lightBox() {

        if( $("a.lightbox").length > 0 ){

            $("a.lightbox").fluidbox();

        }

    }



    //top-btn, filter-btn, filter
    //==================================================

    function btns() {

        if( $(".top-btn").length > 0 ){

            var topBtn = $(".top-btn");

            $(window).on("scroll", function(){
                var scroll = $(window).scrollTop();
                if (scroll >= 100) {
                    TweenMax.to(topBtn, 0.5, {y:-30, autoAlpha:1, ease:Power2.easeOut});
                } else {
                    TweenMax.to(topBtn, 0.5, {y:0, autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                }
            });

            topBtn.on("click",function(){
                TweenMax.to(window, 1.2, {scrollTo:0, ease:Power2.easeOut});
            });
        }

        if( $(".filter-btn").length > 0 ){

            var filterBtn = $(".filter-btn");
            var filter = $(".filter");
            var contentOne = $(".main-content");
            var overlayOne = $(".transition span:nth-child(1)");

            $(window).on("scroll", function(){
                var scroll = $(window).scrollTop();
                if (scroll >= 300) {
                    TweenMax.to(filterBtn, 0.5, {y:-30, autoAlpha:1, ease:Power2.easeOut});
                } else {
                    TweenMax.to(filterBtn, 0.5, {y:0, autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    TweenMax.to(overlayOne, 0.5, {autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    TweenMax.to(contentOne, 0.5, {x:0, ease:Power2.easeOut});
                    TweenMax.to(filter, 0.5, {autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    filterBtn.removeClass("close");
                }
            });

            filterBtn.on("click",function(){
                if( filterBtn.hasClass("close") ) {
                    TweenMax.to(overlayOne, 0.5, {autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    TweenMax.to(contentOne, 0.5, {x:0, ease:Power2.easeOut});
                    TweenMax.to(filter, 0.5, {autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    $(this).removeClass("close");
                } else {
                    overlayOne.css({"width": "100%", "opacity": "0", "z-index": "998"});
                    TweenMax.to(overlayOne, 0.5, {autoAlpha:0.4, ease:Power2.easeOut});
                    TweenMax.to(contentOne, 0.5, {x:-80, ease:Power2.easeOut});
                    TweenMax.to(filter, 0.5, {autoAlpha:1, ease:Power2.easeOut});
                    $(this).addClass("close");
                }
            });

            $(".filter ul li a").on("click",function(){
                TweenMax.to(window, 1.2, {scrollTo:".grid", ease:Power2.easeOut});
            });
        }

        if( $(".share-btn").length > 0 ){

            var shareBtn = $(".share-btn");
            var share = $(".share");
            var contentTwo = $(".main-content");
            var overlayTwo = $(".transition span:nth-child(1)");

            $(window).on("scroll", function(){

                var scroll = $(window).scrollTop();

                if (scroll >= 300) {
                    TweenMax.to(shareBtn, 0.5, {y:-30, autoAlpha:1, ease:Power2.easeOut});
                } else {
                    TweenMax.to(shareBtn, 0.5, {y:0, autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    TweenMax.to(overlayTwo, 0.5, {autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    TweenMax.to(contentTwo, 0.5, {x:0, ease:Power2.easeOut});
                    TweenMax.to(share, 0.5, {autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    shareBtn.removeClass("close");
                }
            });

            shareBtn.on("click",function(){
                if( shareBtn.hasClass("close") ) {
                    TweenMax.to(overlayTwo, 0.5, {autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    TweenMax.to(contentTwo, 0.5, {x:0, ease:Power2.easeOut});
                    TweenMax.to(share, 0.5, {autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                    $(this).removeClass("close");
                } else {
                    overlayTwo.css({"width": "100%", "opacity": "0", "z-index": "998"});
                    TweenMax.to(overlayTwo, 0.5, {autoAlpha:0.4, ease:Power2.easeOut});
                    TweenMax.to(contentTwo, 0.5, {x:-80, ease:Power2.easeOut});
                    TweenMax.to(share, 0.5, {autoAlpha:1, ease:Power2.easeOut});
                    $(this).addClass("close");
                }
            });
        }


        if( $(".project-btn").length > 0 ){

            var projectBtn = $(".project-btn");

            $(window).on("scroll", function(){

                var scroll = $(window).scrollTop();

                if (scroll >= 300) {
                    TweenMax.to(projectBtn, 0.5, {y:-30, autoAlpha:1, ease:Power2.easeOut});
                } else {
                    TweenMax.to(projectBtn, 0.5, {y:0, autoAlpha:0, ease:Power2.easeOut, clearProps:"all"});
                }
            });
        }

    }



    // sgrid
    // ==================================================

    function grid() {

        if( $(".grid").length > 0 ){
            var $grid = $(".grid");
            $grid.isotope({
                itemSelector: ".item",
                percentPosition: true,
                visibleStyle: {
                    opacity: 1,
                    transform: "none"
                },
                hiddenStyle: {
                    opacity: 0,
                    transform: "none"
                },
                masonry: {
                    columnWidth: ".sizer"
                }
            });

            $(".filter a").on("click",function(){
                var selector = $(this).attr("data-filter");

                $grid.isotope({
                    filter: selector
                });

                return false;
            });
        }

        if( $(".hover--two").length > 0 ){

            var caption = $(".hover--two .item .caption");

            caption.each(function( index ) {

                var _this = $(this);
                var newClass = "count" + Math.floor(Math.random() * 9999) + 1;

                _this.attr("data-tooltip-content", "." + newClass);
                _this.find(".inner").addClass(newClass);
            });

            caption.tooltipster({
                plugins: ["follower"],
                delay: 0,
                animationDuration: 0,
                offset: [10, 10]
            });

        }

        if($(".portfolio-interactive-links").length > 0 ){

            $(".portfolio-interactive-links ul li").on("mouseenter", function(){
                var _this = $(this);
                var img = _this.find("div");

                $(".portfolio-interactive-links ul li div").removeClass("active");
                img.addClass("active");
            });

        }

        if( $(".blog.two--columns").length > 0 ){
            var $grid = $(".blog.two--columns");
            $grid.isotope({
                itemSelector: ".item",
                percentPosition: true,
                masonry: {
                    columnWidth: ".sizer"
                }
            });
        }

    }



    // owl.carousels
    // ==================================================

    function owlCarousels() {

        if ( $( ".main-slideshow" ).length > 0 ){

            $(".main-slideshow").owlCarousel({
                loop:false,
                autoplay: true,
                autoplayTimeout: 8000,
                nav:false,
                dots:true,
                margin:0,
                animateOut:"fadeOut",
                items:1
            });

        }

        if ( $( ".portfolio-showcase" ).length > 0 ){

            $(".portfolio-showcase").owlCarousel({
                loop:true,
                nav:true,
                dots:false,
                items:1,
                mouseDrag: false,
                animateIn:"slideInUp",
                animateOut:"fadeOut",
                navText:["<i class='icon up ion-md-arrow-up'></i>", "<i class='icon down ion-md-arrow-down'></i>"]
            });

        }

        if ( $( ".portfolio-showcase--three" ).length > 0 ){

            $(".portfolio-showcase--three").owlCarousel({
                loop:false,
                nav:true,
                dots:false,
                margin:35,
                animateOut:"fadeOut",
                navText:["<i class='icon ion-md-arrow-back'></i>", "<i class='icon ion-md-arrow-forward'></i>"],
                responsive:{
                    0:{
                        items:1
                    },
                    767:{
                        items:2
                    },
                    1199:{
                        items:3
                    }
                }
            });

            $(".portfolio-showcase--three").on("mousewheel", ".owl-stage", function (e) {
                if (e.deltaY>0) {
                    $(".portfolio-showcase--three").trigger("prev.owl.carousel", [1000]);
                } else {
                    $(".portfolio-showcase--three").trigger("next.owl.carousel", [1000]);
                }
                e.preventDefault();
            });
        }

        if ( $( ".photography-carousel" ).length > 0 ){

            $(".photography-carousel").owlCarousel({
                loop:true,
                nav:true,
                dots:false,
                items:1,
                navText:["<i class='icon ion-md-arrow-back'></i>", "<i class='icon ion-md-arrow-forward'></i>"]
            });

        }

        if ( $( ".twitter-carousel" ).length > 0 ){

            $(".twitter-carousel").owlCarousel({
                items:1,
                loop:true,
                dots: false,
                nav:true,
                navText:["<i class='icon ion-md-arrow-back'></i>", "<i class='icon ion-md-arrow-forward'></i>"],
                autoHeight:true
            });

        }

        if ( $( ".single-carousel" ).length > 0 ){

            $(".single-carousel").owlCarousel({
                items:1,
                loop:true,
                dots: false,
                nav:true,
                navText:["<i class='icon ion-md-arrow-back'></i>", "<i class='icon ion-md-arrow-forward'></i>"],
                autoHeight:true
            });
            
        }

    }


    // google maps
    // ==================================================

    function initMap() {

        if( $(".google-map").length > 0 ){

            var mapOptions = {
                zoom: 11,
                center: new google.maps.LatLng(47.2297, -1.5699),
                disableDefaultUI: true,
                styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":20},{"color":"#ececec"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f0f0ef"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f0f0ef"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#d4d4d4"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ececec"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21},{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#d4d4d4"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#303030"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"saturation":"-100"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"geometry.stroke","stylers":[{"lightness":"-61"},{"gamma":"0.00"},{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#dadada"},{"lightness":17}]}]
            };

            var mapElement = document.getElementsByClassName("google-map")[0];

            var map = new google.maps.Map(mapElement, mapOptions);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(47.2297, -1.5699),
                map: map,
                title: "Office Location",
                icon: "img/marker.png"

            });

        }
    }



    // Ajax Load
    // ==================================================

    function ajaxLoad() {

        lightBox();
        btns();
        grid();
        owlCarousels();
        initMap();

    }
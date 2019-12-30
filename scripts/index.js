document.addEventListener("DOMContentLoaded", function (event) {
    $(document).ready(function () {
        console.log("Podłączono index.js")
        var video = document.getElementById("vid");

        function checkLoad() {
            if (video.readyState === 4) {
                //complete load video
                $('#loading').css("zIndex", -15);
                $('#loading').addClass("slide_display_none");
                $('body').css('overflow-y', 'scroll');
                ($(window).width() >= 768) ? $('#nav_1').show() : $('#nav_2').show();
                $('#nav_1, #nav_2').css("opacity", 1);
                //complete load logo in footer
                $("#logo_contact").one("load", function () {
                    $('main').css('margin-bottom', $('#contact').innerHeight());
                }).each(function () {
                    if (this.complete) { $(this).trigger('load'); }
                });

            } else {
                setTimeout(checkLoad, 100);
            }
        }

        checkLoad();

        $('.fill:eq(0), .fill:eq(1)').css('background-color', 'rgb(0,206,255)');
        $('.fill:eq(2), .fill:eq(3)').css('background-color', 'rgb(0,185,231)');
        $('.fill:eq(4), .fill:eq(5)').css('background-color', 'rgb(69,130,161)');
        $('.fill:eq(6), .fill:eq(7)').css('background-color', 'rgb(67,115,153)');
        $('.fill:eq(8), .fill:eq(9)').css('background-color', 'rgb(46,90,151)');
        $('.fill:eq(10), .fill:eq(11)').css('background-color', 'rgb(35,58,128)');
        $('.fill:eq(12), .fill:eq(13)').css('background-color', 'rgb(49,71,94)');

        //SHOWREEL
        $('#intro_button').click(function () {
            if (video.muted) {
                $('footer').css('opacity', 0);
                video.load();
                video.muted = false;
                this.innerHTML = '<i class="fas fa-pause"></i>';
                $('#intro h1, #intro h2').removeClass('puff-in-center');
                $('#intro h1, #intro h2').addClass('puff-out-center');
                $('#shadow').css('opacity', 0);
            }
            else {
                $('footer').css('opacity', 1);
                video.muted = true;
                this.innerHTML = '<i class="fas fa-play"></i>';
                $('#intro h1, #intro h2').removeClass('puff-out-center');
                $('#intro h1, #intro h2').addClass('puff-in-center');
                $('#shadow').css('opacity', 0.6);
            }
        });


        $(window).scroll(function () {
            var height = $(window).scrollTop();

            //ANIMATION TO PROGRESSBAR
            let circle_row_1_t = $("#circle_row_1").offset().top;
            let circle_row_2_t = $("#circle_row_2").offset().top;
            let circle_row_3_t = $("#circle_row_3").offset().top;

            let circle_row_1_b = circle_row_1_t + $("#circle_row_1").outerHeight();
            let circle_row_2_b = circle_row_2_t + $("#circle_row_2").outerHeight();
            let circle_row_3_b = circle_row_3_t + $("#circle_row_3").outerHeight();
            let windowBottom = (height + $(window).height());

            if ((circle_row_1_b >= height) && (circle_row_1_t <= windowBottom)) {
                $(".mask.full1, .fill1").addClass('circle1_aniamte');
                $(".mask.full2, .fill2").addClass('circle2_aniamte');
                $(".mask.full3, .fill3").addClass('circle3_aniamte');
            }

            if ((circle_row_2_b >= height) && (circle_row_2_t <= windowBottom)) {
                $(".mask.full4, .fill4").addClass('circle4_aniamte');
                $(".mask.full5, .fill5").addClass('circle5_aniamte');
                $(".mask.full6, .fill6").addClass('circle6_aniamte');
            }

            if ((circle_row_3_b >= height) && (circle_row_3_t <= windowBottom)) {
                $(".mask.full7, .fill7").addClass('circle7_aniamte');
            }

        });
    })
});



document.addEventListener("DOMContentLoaded", function (event) {
    $(document).ready(function () {
        console.log("Podłączono")

        var video = document.getElementById("vid");

        function checkLoad() {
            console.log(video.readyState)
            if (video.readyState === 4) {
                $('#loading').addClass("slide_display_none");
                $('body').css('overflow-y', 'scroll');
                ($(window).width() >= 768) ? $('#nav_1').show() : $('#nav_2').show();
                $('#nav_1, #nav_2').css("opacity", 1);
            } else {
                setTimeout(checkLoad, 100);
            }
        }

        checkLoad();


        $('main').css('margin-bottom', $('#contact').innerHeight());
        $('.fill:eq(0), .fill:eq(1)').css('background-color', '#5BC0BE');
        $('.fill:eq(2), .fill:eq(3)').css('background-color', '#F6AE2D');
        $('.fill:eq(4), .fill:eq(5)').css('background-color', '#3A506B');
        $('.fill:eq(6), .fill:eq(7)').css('background-color', '#33658A');
        $('.fill:eq(8), .fill:eq(9)').css('background-color', '#6b94bf');
        $('.fill:eq(10), .fill:eq(11)').css('background-color', '#F7CB15');
        $('.fill:eq(12), .fill:eq(13)').css('background-color', '#0B132B');


        $('.play_button').click(function () {
            let vid = $(this).parent().find('video')[0]
            vid.paused ? vid.play() : vid.pause();
        });

        $(window).scroll(function () {
            var height = $(window).scrollTop();
            var window_height = $(window).height();
            var menu_height = $('#menu1').innerHeight();
            (height > window_height) ? $('footer').css("zIndex", -9) : $('footer').css("zIndex", -11);
            (height > menu_height) ? $('#menu1').addClass('hideNav') : $('#menu1').removeClass('hideNav');

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

        $(window).resize(function () {
            //($(window).width() >= 768) ? $('#nav_1').show() : $('#nav_2').show();
            $('main').css('margin-bottom', $('#contact').innerHeight());
        });

        $('.close').click(function () {
            var videos = $('.portfolio_vid')
            for (let i = 0; i < videos.length; i++) {
                videos[i].load();
            }
        });

        //changed display from block to flex when modal is open
        $('#modal1').on('shown.bs.modal', () => {
            $('#modal1').css('display', 'flex')
        });
        $('#modal2').on('shown.bs.modal', () => {
            $('#modal2').css('display', 'flex')
        });

        //send message 
        $('#sendMessageButton').on('click', (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("mail", $("#form_mail").val());
            formData.append("text", $("#form_text").val());

            fetch("php/PHPMailer/src/sendMessage.php", {
                method: "post",
                body: formData,
            })
                .then(res => res.json())
                .then(res => {
                    if (res.data)
                        console.log('wysłano')
                    else console.log('nie wysłano')
                })
                .catch(error => console.log("Błąd: ", error));
        })
    })
});


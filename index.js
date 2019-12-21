
document.addEventListener("DOMContentLoaded", function (event) {
    $(document).ready(function () {
        console.log("Podłączono")
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

            (height > window_height) ? $('footer').css("zIndex", -9) : $('footer').css("zIndex", -11);

        });

        $('.close').click(function () {
            var videos  = $('.portfolio_vid')
            for (let i = 0; i < videos.length; i ++) {
                //videos[i].pause();
                videos[i].load();
            }
        });

    })
});


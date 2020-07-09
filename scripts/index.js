document.addEventListener("DOMContentLoaded", function(event) {
    $(document).ready(function() {
        console.log("Podłączono index.js")
        var video = document.getElementById("vid");
        var videoCounter = 0;

        function checkLoad() {
            $('#vid').on('load', function() {
                //complete load video
                $('#loading').css("zIndex", -15);
                $('#loading').addClass("slide_display_none");
                $('body').css('overflow-y', 'scroll');
                ($(window).width() >= 768) ? $('#nav_1').show(): $('#nav_2').show();
                $('#nav_1, #nav_2').css("opacity", 1);
                //complete load logo in footer
                $("#logo_contact").one("load", function() {
                    $('main').css('margin-bottom', $('#contact').innerHeight());
                }).each(function() {
                    if (this.complete) { $(this).trigger('load'); }
                });
            });
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
        $('#intro_button').click(function() {

            if (videoCounter % 2 == 0) {
                $('footer').css('opacity', 0);
                videoCounter++;
                this.innerHTML = '<i class="fas fa-pause"></i>';
                $('#intro h1, #intro h2').removeClass('puff-in-center');
                $('#intro h1, #intro h2').addClass('puff-out-center');
                $('#shadow').css('opacity', 0);
                $('#vid').css('z-index', 1);
                $("#vid")[0].src = "https://www.youtube.com/embed/DzirYsmMdYU?controls=0?&autoplay=1";
            } else {
                $('footer').css('opacity', 1);
                videoCounter++;
                this.innerHTML = '<i class="fas fa-play"></i>';
                $('#intro h1, #intro h2').removeClass('puff-out-center');
                $('#intro h1, #intro h2').addClass('puff-in-center');
                $('#shadow').css('opacity', 0.6);
                $('#vid').css('z-index', -10);
                $("#vid")[0].src = "https://www.youtube.com/embed/DzirYsmMdYU?&controls=0&mute=1";
            }
        });


        $(window).scroll(function() {
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

        var data = new FormData();
        data.append('todo', 'show_portfolio');

        $.ajax({
                url: "./show_portfolio.php",
                method: "post",
                processData: false,
                contentType: false,
                data: data
            })
            .done(res => {
                fill_portfolio(JSON.parse(res))
            });

    })
});



function fill_portfolio(data) {
    let elem = $('#portfolioDatabase8');
    elem.empty();
    let modals = $('.modals');
    let length;
    if (data.length < 6) { length = data.length } else { length = 6 }

    for (i = 0; i < length; i++) {
        modals.append(` 
        <div class="modal" id="modal${data[i].id}" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${data[i].project_name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">${data[i].video_link}</div>
                </div>
            </div>
        </div>`)
        elem.append(` 
        <div class="col-12 col-md-6 col-lg-4 porfolio_img align-self-center">
            <div class="porfolio_img_description">
                <h4>${data[i].project_name}</h4>
                <p>${data[i].project_des}</p>
                <button type="button" data-toggle="modal" data-target="#modal${data[i].id}">
                    Zobacz
                </button>
            </div>
            <img src="${data[i].photo_link}" alt="${data[i].photo_link}" onError="image_error($(this))" />
        </div>`)
    }

    $('.close').click(function() {
        var videos = $('.modal-body iframe')
        for (let i = 0; i < videos.length; i++) {
            $(videos[i]).attr('src', $(videos[i]).attr('src'));
        }
    });
    $('.modal').on('shown.bs.modal', function() {
        console.log("change 2")
        $(this).css('display', 'flex')
    });
}

function image_error(img) {
    img[0].src = "./Photos/Portfolio/jakob-owens-ZOtnmYS0JVg-unsplash.jpg"
}
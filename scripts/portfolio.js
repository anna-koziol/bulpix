document.addEventListener("DOMContentLoaded", function(event) {
    $(document).ready(function() {
        console.log("Podłączono portfolio.js");
        $('#nav_1, #nav_2').css("opacity", 1);
        //complete load logo in footer
        $("#logo_contact").one("load", function() {
            $('main').css('margin-bottom', $('#contact').innerHeight());
        }).each(function() {
            if (this.complete) { $(this).trigger('load'); }
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
    let elem = $('#portfolio_row');
    elem.empty();
    let modals = $('.modals');
    for (i = 0; i < data.length; i++) {
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
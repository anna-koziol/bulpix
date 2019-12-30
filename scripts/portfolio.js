
document.addEventListener("DOMContentLoaded", function (event) {
    $(document).ready(function () {
        console.log("Podłączono portfolio.js");
        $('#nav_1, #nav_2').css("opacity", 1);
        //complete load logo in footer
        $("#logo_contact").one("load", function () {
            $('main').css('margin-bottom', $('#contact').innerHeight());
        }).each(function () {
            if (this.complete) { $(this).trigger('load'); }
        });
    })
});


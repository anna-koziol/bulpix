
document.addEventListener("DOMContentLoaded", function (event) {
    $(document).ready(function () {
        console.log("Podłączono")
        
        $("#logo_contact").one("load", function () {
            $('main').css('margin-bottom', $('#contact').innerHeight());
        }).each(function () {
            if (this.complete) { $(this).trigger('load'); }
        }); 

        $('.play_button').click(function () {
            let vid = $(this).parent().find('video')[0]
            vid.paused ? vid.play() : vid.pause();
        });

        $(window).scroll(function () {
            var height = $(window).scrollTop();
            var menu_height = $('#menu1').innerHeight();
            (height > menu_height) ? $('#menu1').addClass('hideNav') : $('#menu1').removeClass('hideNav');
        });

        $(window).resize(function () {
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


            //Validate e-mail
            function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            var $error = $("#validate_mail");
            var email = $("#form_mail").val();
            $error.text("");

            if (validateEmail(email)) {
                const formData = new FormData();
                formData.append("names", $("#form_names").val());
                formData.append("mail", $("#form_mail").val());
                formData.append("text", $("#form_text").val());

                fetch("php/PHPMailer/src/sendMessage.php", {
                    method: "post",
                    body: formData,
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.data)
                            alert('wysłano')
                        else alert('nie wysłano maila')
                    })
                    .catch(error => $error.text("Błąd: " + error));
            } else {
                $error.text("Błędny mail!");
            }
        })
    })
});


var licznik = 1;

document.addEventListener("DOMContentLoaded", function (event) {

    addInputs();

    console.log("DOM fully loaded and parsed");

    $('#loginButton').on('click', (e) => {
        e.preventDefault();
        xhttp = new XMLHttpRequest();
        xhttp.open("POST", "./PHP/index.php", true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
                if (this.responseText == "Fine") {
                    $('.login_panel').css('opacity', 0);
                    $('.login_panel').addClass('fade-out');

                }
                else {
                    $('#alerts_login').text('Błędne hasło lub login')
                }

            }
        }

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("todo=login&login=" + $("#loginLogin").val() + "&password=" + $("#loginPassword").val());
    })

    $('#add_Button').on('click', (e) => {
        e.preventDefault();
        send();
    })


    const send = () => {
        $("#toast").removeClass('fade-out-top');
        $("#toast").removeClass('fade-in-top');
        var file_photo = $('#add_Photo').prop('files')[0];
        var file_video = $('#add_Video').prop('files')[0];
        var form_data = new FormData();
        form_data.append('photo', file_photo);
        form_data.append('video', file_video);
        form_data.append('name', $('#add_Name').val());
        form_data.append('desc', $('#add_Des').val());

        form_data.append('todo', 'add')
        console.log('x', $('#add_Name').val())

        if (file_photo != undefined && file_video != undefined && $('#add_Name').val() != '' && $('#add_Des').val() != '') {
            $.ajax({
                url: "./PHP/index.php",
                method: "post",
                processData: false,
                contentType: false,
                data: form_data
            })
                .done(res =>
                    toast(res)
                );
        }
        else {
            toast(' Wprowadź wszystkie pola w formularzu! ')
        }



    }

    const toast = (text) => {
        $('#input_video').empty();
        $('#input_image').empty();
        addInputs();
        onInputChange();

        $("#toast_des").html(' ');
        $("#toast_des").html(text);
        $("#toast").addClass('fade-in-top');
        setTimeout(function () { $("#toast").addClass('fade-out-top') }, 3500);
        $("input, textarea").val('');
    }
    onInputChange();
});

function onInputChange() {
    $('#add_Video, #add_Photo').on('change', function () {
        var fileName = $(this).val();
        console.log($(this));
        console.log($('#add_Video'));
        $(this).next('.custom-file-label').html(fileName);
    });
}

function addInputs() {
    $('#input_video').append(`<input type="file" class="custom-file-input" name="add_Video" id="add_Video">
    <label class="custom-file-label" for="add_Video"  id="label_V">Wybierz plik...</label>`);
    $('#input_image').append(`<input type="file" class="custom-file-input" name="add_Photo" accept="image/*" id="add_Photo">
    <label class="custom-file-label" for="add_Photo"  id="label_P">Wybierz plik...</label>`);
}


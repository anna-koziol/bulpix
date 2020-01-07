var licznik = 1;

document.addEventListener("DOMContentLoaded", function (event) {
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
        console.log($("#add_Name").val())
        console.log($("#add_Des").val())
        console.log($("#add_Photo").val())
        console.log($("#add_Video").val())

        var file_data = $('#add_Photo').prop('files')[0];
        var form_data = new FormData();
        form_data.append('photo', file_data);
        form_data.append('todo', 'add')

        fetch("./PHP/index.php", {
            method: "post",
            body: form_data
        })
            .then(res => {
                console.log('res');
                console.log(res.body);
            })
    })


});











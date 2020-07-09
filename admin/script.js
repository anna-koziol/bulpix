var licznik = 1;
var id = 1;

document.addEventListener("DOMContentLoaded", function(event) {

    addInputs();
    edit();
    delete_section();

    $(document).ready(function() {
        $(document).ajaxStart(function() {
            $("#loadingGIF").show();
        }).ajaxStop(function() {
            $("#loadingGIF").hide();
        });
    });

    console.log("DOM fully loaded and parsed");

    $('#loginButton').on('click', (e) => {
        e.preventDefault();
        xhttp = new XMLHttpRequest();
        xhttp.open("POST", "./PHP/index.php", true);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "Fine") {
                    $('.login_panel').css('opacity', 0);
                    $('.login_panel').addClass('fade-out');
                    $('#add_new').css('opacity', 1);
                    $('#add_new').css('z-index', 1);
                    $('#add_new').css('height', 'auto');


                    $('#add_Button').on('click', (e) => {
                        e.preventDefault();
                        var file_photo = $('#add_Photo').prop('files')[0];
                        var file_video = $('#add_Video').val();
                        var form_data = new FormData();
                        form_data.append('photo', file_photo);
                        form_data.append('video', file_video);
                        form_data.append('name', $('#add_Name').val());
                        form_data.append('desc', $('#add_Des').val());
                        form_data.append('todo', 'add')
                        send(file_photo, file_video, form_data, $('#add_Name'), $('#add_Des'));
                    })

                    $('#edit_Button').on('click', (e) => {
                        e.preventDefault();
                        var file_photo = $('#edit_Photo').prop('files')[0];
                        var file_video = $('#edit_Video').val();
                        var form_data = new FormData();
                        form_data.append('photo', file_photo);
                        form_data.append('video', file_video);
                        form_data.append('name', $('#edit_Name').val());
                        form_data.append('desc', $('#edit_Des').val());
                        form_data.append('id', id);
                        form_data.append('todo', 'edit');

                        if (file_photo != undefined && file_video != '') {
                            form_data.append('photoBOOL', 1);
                            form_data.append('videoBOOL', 1);
                            console.log('1')
                        } else if (file_photo == undefined && file_video != '') {
                            form_data.append('photoBOOL', 0);
                            form_data.append('videoBOOL', 1);
                            console.log('2')

                        } else if (file_photo != undefined && file_video == '') {
                            form_data.append('photoBOOL', 1);
                            form_data.append('videoBOOL', 0);
                            console.log('3')

                        } else {
                            form_data.append('photoBOOL', 0);
                            form_data.append('videoBOOL', 0);
                            console.log('4')

                        }

                        $("#toast").removeClass('fade-out-top');
                        $("#toast").removeClass('fade-in-top');
                        $.ajax({
                                url: "./PHP/index.php",
                                method: "post",
                                processData: false,
                                contentType: false,
                                data: form_data
                            })
                            .done(res => {
                                toast(res)
                                var data = new FormData();
                                data.append('todo', 'show_elem');
                                $.ajax({
                                        url: "./PHP/index.php",
                                        method: "post",
                                        processData: false,
                                        contentType: false,
                                        data: data
                                    })
                                    .done(res => addOptions(JSON.parse(res)));
                            });
                    })


                    const send = (file_photo, file_video, form_data, name, des) => {
                        $("#toast").removeClass('fade-out-top');
                        $("#toast").removeClass('fade-in-top');

                        if (file_photo != undefined && file_video != '' && name.val() != '' && des.val() != '') {
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
                        } else {
                            toast(' Wprowadź wszystkie pola w formularzu! ')
                        }
                    }

                    const toast = (text) => {
                        $('#input_image').empty();
                        addInputs();
                        onInputChange();

                        $("#toast_des").html(' ');
                        $("#toast_des").html(text);
                        $("#toast").addClass('fade-in-top');
                        setTimeout(function() { $("#toast").addClass('fade-out-top') }, 3500);
                        $("input, textarea").val('');
                    }
                    onInputChange();



                    $('#menu_button').on('click', function() {
                        $('nav').removeClass('slide-out-left');
                        $('nav').addClass('slide-in-left');
                    });

                    $('#back_arrow').on('click', function() {
                        $('nav').removeClass('slide-in-left');
                        $('nav').addClass('slide-out-left');
                    });


                    $('nav a').on('click', function() {
                        $('#add_new, #edit, #delete').css('opacity', 0);
                        $('#add_new, #edit, #delete').css('z-index', -100);
                        $('#add_new, #edit, #delete').css('height', '0px');
                        var block_id = $(this).attr('id');

                        if (block_id == 'nav_delete') {
                            $('#delete').css('opacity', 1);
                            $('#delete').css('z-index', 1);
                            $('#delete').css('height', 'auto');
                            delete_section();
                        } else if (block_id == 'nav_edit') {
                            $('#edit').css('opacity', 1);
                            $('#edit').css('z-index', 1);
                            $('#edit').css('height', 'auto');
                            edit();
                        } else if (block_id == 'nav_log_out') {

                        } else {
                            $('#add_new').css('opacity', 1);
                            $('#add_new').css('z-index', 1);
                            $('#add_new').css('height', 'auto');
                        }

                    });

                    $('#delete_Button').on('click', (e) => {
                        e.preventDefault();
                        var id = $('#delete_select').children("option:selected").val();
                        var name = $('#delete_select').children("option:selected").text();
                        var data = new FormData();
                        data.append('todo', 'remove');
                        data.append('id', id);
                        data.append('name', name);

                        $.ajax({
                                url: "./PHP/index.php",
                                method: "post",
                                processData: false,
                                contentType: false,
                                data: data
                            })
                            .done(res => {
                                toast(res)
                                delete_section();
                            });
                    })


                } else {
                    $('#alerts_login').text('Błędne hasło lub login')
                }

            }
        }

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("todo=login&login=" + $("#loginLogin").val() + "&password=" + $("#loginPassword").val());
    })




});

function onInputChange() {
    $('#add_Photo, #edit_Photo').on('change', function() {
        var fileName = $(this).val();
        $(this).next('.custom-file-label').html(fileName);
    });
}

function addInputs() {
    $('#input_image').append(`<input type="file" class="custom-file-input" name="add_Photo" accept="image/*" id="add_Photo">
    <label class="custom-file-label" for="add_Photo"  id="label_P">Wybierz plik...</label>`);
}

function addInputs2() {
    $('#input_image_edit').append(`<input type="file" class="custom-file-input" name="edit_Photo" accept="image/*" id="edit_Photo">
    <label class="custom-file-label" for="add_Photo"  id="label_PE">Wybierz plik...</label>`);
}

function edit() {
    addInputs2();
    var data = new FormData();
    data.append('todo', 'show_elem');
    $.ajax({
            url: "./PHP/index.php",
            method: "post",
            processData: false,
            contentType: false,
            data: data
        })
        .done(res => addOptions(JSON.parse(res)));
}

function delete_section() {
    var data = new FormData();
    data.append('todo', 'show_elem_del');
    $.ajax({
            url: "./PHP/index.php",
            method: "post",
            processData: false,
            contentType: false,
            data: data
        })
        .done(res => addOptionsDelete(JSON.parse(res)));
}

function addOptions(data) {
    $('#edit_selct').empty();
    for (i = 0; i < data.length; i++) {
        $('#edit_selct').append(`<option value="${data[i].id}"> 
        ${data[i].project_name}</option>`)
    }

    $('#edit_selct').on('change', function() {
        id = $(this).val();
        console.log(this, "---", id);
        let data = new FormData();
        data.append('id', $(this).val());
        data.append('todo', 'fill');

        $.ajax({
                url: "./PHP/index.php",
                method: "post",
                processData: false,
                contentType: false,
                data: data
            })
            .done(res =>
                fill(JSON.parse(res)[0])
            );
    });
}

function addOptionsDelete(data) {
    $('#delete_select').empty();
    for (i = 0; i < data.length; i++) {
        $('#delete_select').append(`<option value="${data[i].id}"> 
        ${data[i].project_name}</option>`)
    }
}


function fill(data) {
    //clear
    $('#edit_Name, #edit_Des, #edit_Video').val('');
    $('#input_image_edit').empty();
    addInputs2();
    //fill
    $('#edit_Name').val(data.project_name);
    $('#edit_Des').val(data.project_des);
    $('#edit_Video').val(data.video_link);
    $('#label_PE').text(data.photo_link);
    onInputChange();
}
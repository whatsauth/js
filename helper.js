export const PopupAutoInject = (body, cb) => {
    Swal.fire({
        title: body.title,
        text: body.text,
        icon: "question",
        showDenyButton: body.deny_button,
        denyButtonText: body.deny_text ? body.deny_button : "",
    }).then((res) => {
        if (res.isConfirmed) {
            cb();
        }
    });

}


/**
 * @param {Boolean} using_click - Determines whether to click the button or submit the form.
 * @param {String} id_button - The id of the button to be clicked.
 * @param {String} id_form - The id of the form to be submitted.
 */
export const SubmitLogin = (using_click, id_button, id_form) => {
    if (using_click) {
        document.getElementById(id_button).click();
    } else {
        document.getElementById(id_form).submit();
    }
}

/**
 * @param {Object} resjson - The response object from the server.
 * @param {String} id_user - The id of the username input field in the form.
 * @param {String} id_pass - The id of the password input field in the form.
 */
export const FillformLogin = (resjson, id_user, id_pass) => {
    document.getElementById(id_user).value = resjson.user_name;
    document.getElementById(id_pass).value = resjson.user_pass;
}
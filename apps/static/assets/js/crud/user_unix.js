$(document).ready(function () {
    user_unix = $("#user_unix").DataTable({
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button class='btn btn-primary btnChangeName' id='btnChangeName'>Change Name</button><button class='btn btn-success btnChangePassword' id='btnChangePassword'>Change Password</button><button class='btn btn-danger btnDelete'>Delete</button>"
        }],
        dom: 'Bfrtip',
        buttons: [{
            text: "Add User",
            className: 'btn btn-success',
            attr: {
                title: 'Add User',
                id: 'btnNew'
            },
            //Add User
            action: function () {
                option = 0;
                const steps = ['1', '2']
                const swalQueueStep = Swal.mixin({
                    confirmButtonText: 'Next',
                    cancelButtonText: 'Back',
                    progressSteps: steps,
                    input: 'text',
                    inputAttributes: {
                        required: true
                    },
                    reverseButtons: true,
                })
                async function backAndForth() {
                    const values = []
                    let currentStep
                    for (currentStep = 0; currentStep < steps.length;) {
                        if (steps[currentStep] == 1) {
                            var result = await swalQueueStep.fire({
                                title: 'Step ' + steps[currentStep],
                                text: "Please select a name for the user",
                                inputValue: values[currentStep],
                                showCancelButton: currentStep > 0,
                                currentProgressStep: currentStep,
                                inputValidator: (value) => {
                                    if (value == '') {
                                        return 'The name is required'
                                    }
                                    if (format.test(value) == true) {
                                        return 'Do not use special characters'
                                    }
                                }
                            })
                        } else if (steps[currentStep] == 2) {
                            var result = await swalQueueStep.fire({
                                title: 'Step ' + steps[currentStep],
                                text: "Please select a username for the user",
                                inputValue: values[currentStep],
                                showCancelButton: currentStep > 0,
                                currentProgressStep: currentStep,
                                inputValidator: (value) => {
                                    if (value == '') {
                                        return 'The username is required'
                                    }
                                    if (format.test(value) == true) {
                                        return 'Do not use special characters'
                                    }
                                    if (/\s/.test(value)) {
                                        return 'Do not leave spaces'
                                    }
                                    if (user_unix.search(value).row({
                                            search: 'applied'
                                        }).data()) {
                                        return 'This username is already registered,\n please choose another one'
                                    }
                                }
                            })
                        } else {
                            break
                        }
                        if (result.value) {
                            values[currentStep] = result.value
                            currentStep++
                        } else if (result.dismiss === 'cancel') {
                            currentStep--
                        } else {
                            break
                        }
                        if (currentStep === steps.length) {
                            user_unix.search("").row({search: 'applied'})
                            name = values[0]
                            username = values[1],
                            id = Math.floor(Math.random() * 10000);
                            option = 0,
                                $.ajax({
                                    url: "user_unix/",
                                    type: "POST",
                                    dataType: "json",
                                    headers:{'X-CSRFToken':csrftoken},
                                    data: {
                                        name: name,
                                        username: username,
                                        password: null,
                                        option: option,
                                    },
                                    success: function (data) {
                                        user_unix.row.add([id, username, name]).draw();
                                        swal.fire({
                                            toast: true,
                                            position: 'top-end',
                                            showConfirmButton: false,
                                            timer: 3000,
                                            icon: 'info',
                                            title: 'Your file has been created'
                                        })
                                    },
                                    error: function (error, exception) {
                                        swal.fire({
                                            toast: true,
                                            position: 'top-end',
                                            showConfirmButton: false,
                                            timer: 3000,
                                            icon: 'error',
                                            title: 'system error, Please check log.'
                                        })
                                    },
                                });
                        }
                    }
                }
                backAndForth();
            }
        }],
        "autoWidth": true,
        "responsive": true
    });
});
//Change Password
$(document).on("click", ".btnChangePassword", function () {
    tr = $(this).closest("tr");
    username = tr.find('td:eq(1)').text();
    name = tr.find('td:eq(2)').text();
    option = 1;
    Swal.fire({
        title: 'Change Password ' + name,
        html: '<input type="password" id="password" class="swal2-input" placeholder="Password">',
        text: 'Please select a new name',
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        preConfirm: () => {
            const password = Swal.getPopup().querySelector('#password').value
            if (!password) {
                Swal.showValidationMessage('The Password is required')
            }
            return {
                password: password
            }
        }
    }).then((result) => {
        if (result.value) {
            password = result.value.password
            $.ajax({
                url: "user_unix/",
                type: "POST",
                dataType: "json",
                headers:{'X-CSRFToken':csrftoken},
                data: {
                    name: name,
                    username: username,
                    password: password,
                    option: option
                },
                success: function (data) {
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'info',
                        title: 'Your file has been created or updated.'
                    })
                },
                error: function (error, exception) {
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'error',
                        title: 'system error, Please check log.'
                    })
                },
            })
        }
        if (result.dismiss === Swal.DismissReason.cancel) {
            swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'error',
                title: 'You cancelled the operation.'
            })
        }
    });
});
//Change Name
$(document).on("click", ".btnChangeName", function () {
    tr = $(this).closest("tr");
    id = tr.find('td:eq(0)').text();
    username = tr.find('td:eq(1)').text();
    name = tr.find('td:eq(2)').text();
    option = 2;
    Swal.fire({
        title: 'Change Name for ' + name,
        html: '<input type="text" id="change_name" class="swal2-input">',
        text: 'Please select a Name',
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#change_name').value
            if (!name) {
                Swal.showValidationMessage('The Password is required')
            }
            if (format.test(name) == true) {
                Swal.showValidationMessage('Do not use special characters')
            }
            return {
                name: name
            }
        }

    }).then((result) => {
        if (result.value) {
            name = result.value.name
            $.ajax({
                url: "user_unix/",
                type: "POST",
                dataType: "json",
                headers:{'X-CSRFToken':csrftoken},
                data: {
                    name: name,
                    username: username,
                    password: null,
                    option: option
                },
                success: function (data) {
                    user_unix.row(tr).data([id, username, name]).draw();
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'info',
                        title: 'Your file has been created or updated.'
                    })
                },
                error: function (error, exception) {
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'error',
                        title: 'system error, Please check log.'
                    })
                },
            })
        }
    });

});
//Delete User
$(document).on("click", ".btnDelete", function () {
    tr = $(this);
    username = $(this).closest("tr").find('td:eq(1)').text();
    name = tr.find('td:eq(2)').text();
    option = 3 //Delete
    Swal.fire({
        title: 'Delete ' + username,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "user_unix/",
                type: "POST",
                dataType: "json",
                headers:{'X-CSRFToken':csrftoken},
                data: {
                    name: name,
                    username: username,
                    password: null,
                    option: option
                },
                success: function () {
                    user_unix.row(tr.parents('tr')).remove().draw();
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'info',
                        title: 'User has been delete or updated.'
                    })
                },
                error: function (error, exception) {
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'error',
                        title: 'system error, Please check log.'
                    })
                },
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'error',
                title: 'You cancelled the operation.'
            })
        }
    })
});

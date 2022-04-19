$(document).ready(function () {
    directories = $("#directories").DataTable({
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button class='btn btn-primary btnChangeGroup' id='btnChangeGroup'>Change Group Owner</button><button class='btn btn-success btnChangeUser' id='btnChangeUser'>Change User Owner</button><button class='btn btn-danger btnDelete'>Delete</button>"
        }],
        dom: 'Bfrtip',
        buttons: [{
            text: "Add Folder",
            className: 'btn btn-success btnNew',
            attr: {
                title: 'Add Folder',
                id: 'btnNew'
            },
        }],
        "autoWidth": true,
        "responsive": true
    });
});
$(document).on("click", ".btnNew", function() {
    const steps = ['1', '2', '3']
    const swalQueueStep = Swal.mixin({
        confirmButtonText: 'Next',
        cancelButtonText: 'Back',
        progressSteps: steps,
        reverseButtons: true,
    })
    async function backAndForth() {
        const values = []
        let currentStep
        for (currentStep = 0; currentStep < steps.length;) {
            if (steps[currentStep] == 1) {
                var result = await swalQueueStep.fire({
                    title: 'Step ' + steps[currentStep],
                    text: "Please select a Folder name",
                    input: 'text',
                    inputValue: values[currentStep],
                    showCancelButton: currentStep > 0,
                    currentProgressStep: currentStep,
                    inputAttributes: {
                        required: true
                    },
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
                    html: html_username,
                    showCancelButton: currentStep > 0,
                    currentProgressStep: currentStep,
                    didOpen: function(){
                        $('#username').select2({ width: 'resolve', theme: "classic", width: '100%'});
                    },
                    preConfirm: () => {
                        const username =  $('#username').val()
                        if (!username) {
                            Swal.showValidationMessage('The username is required')
                        }
                        return {
                            username: username
                        }
                    },
                })
            }
            else if (steps[currentStep] == 3) {
                var result = await swalQueueStep.fire({
                    title: 'Step ' + steps[currentStep],
                    html: html_group,
                    showCancelButton: currentStep > 0,
                    currentProgressStep: currentStep,
                    didOpen: function(){
                        $('#group').select2({ width: 'resolve', theme: "classic", width: '100%'});
                    },
                    preConfirm: () => {
                        const group =  $('#group').val()
                        if (!group) {
                            Swal.showValidationMessage('The group is required')
                        }
                        return {
                            group: group
                        }
                    },
                })
            }
             else {
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
                folder= values[0],
                user_owner = values[1].username,
                group_owner = values[2].group,
                id = Math.floor(Math.random() * 10000),
                permission = 755,
                folder_size = 0,
                option = 0,
                    $.ajax({
                        url: "directories/",
                        type: "POST",
                        dataType: "json",
                        headers:{'X-CSRFToken':csrftoken},
                        data: {
                            path: null,
                            folder: folder,
                            user_owner: user_owner,
                            group_owner: group_owner,
                            option: option,
                        },
                        success: function(data) {
                            directories.row.add([folder, permission, group_owner, user_owner, folder_size]).draw();
                            swal.fire({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                icon: 'info',
                                title: 'Your file has been created'
                            })
                        },
                        error: function(error, exception) {
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
});
$(document).on("click", ".btnChangeGroup", function () {
    tr = $(this).closest("tr");
    path = tr.find('td:eq(0)').text();
    permission = tr.find('td:eq(1)').text();
    group_owner = tr.find('td:eq(2)').text();
    user_owner = tr.find('td:eq(3)').text();
    folder_size = tr.find('td:eq(4)').text();
    option = 1;
    Swal.fire({
        title: 'Change Group Owner ',
        html: html_group,
        text: 'Please select a new Group owner',
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        preConfirm: () => {
            const group_owner = Swal.getPopup().querySelector('#group').value
            if (!group_owner) {
                Swal.showValidationMessage('The Password is required')
            }
            return {
                group_owner: group_owner
            }
        }
        }).then((result) => {
            if (result.value) {
                group_owner = result.value.group_owner
                $.ajax({
                    url: "directories/",
                    type: "POST",
                    dataType: "json",
                    headers:{'X-CSRFToken':csrftoken},
                    data: {
                        path: path,
                        folder: null,
                        user_owner: null,
                        group_owner: group_owner,
                        option: option,
                    },
                    success: function (data) {
                        directories.row(tr).data([path, permission, group_owner, user_owner, folder_size]).draw();
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
$(document).on("click", ".btnChangeUser", function () {
    tr = $(this).closest("tr");
    path = tr.find('td:eq(0)').text();
    permission = tr.find('td:eq(1)').text();
    group_owner = tr.find('td:eq(2)').text();
    user_owner = tr.find('td:eq(3)').text();
    folder_size = tr.find('td:eq(4)').text();
    option = 2;
    Swal.fire({
        title: 'Change User Owner ',
        html: html_username,
        text: 'Please select a new User owner',
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        preConfirm: () => {
            const user_owner = Swal.getPopup().querySelector('#username').value
            if (!user_owner) {
                Swal.showValidationMessage('The Password is required')
            }
            return {
                user_owner: user_owner
            }
        }
        }).then((result) => {
            if (result.value) {
                user_owner = result.value.user_owner
                $.ajax({
                    url: "directories/",
                    type: "POST",
                    dataType: "json",
                    headers:{'X-CSRFToken':csrftoken},
                    data: {
                        path: path,
                        folder: null,
                        user_owner: user_owner,
                        group_owner: null,
                        option: option,
                    },
                    success: function (data) {
                        directories.row(tr).data([path, permission, group_owner, user_owner, folder_size]).draw();
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
//Delete User
$(document).on("click", ".btnDelete", function () {
    tr = $(this);
    path = $(this).closest("tr").find('td:eq(0)').text();
    option = 3 //Delete
    Swal.fire({
        title: 'Delete ' + path,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "directories/",
                type: "POST",
                dataType: "json",
                headers:{'X-CSRFToken':csrftoken},
                data: {
                    path: path,
                    folder: null,
                    user_owner: null,
                    group_owner: null,
                    option: option,
                },
                success: function () {
                    directories.row(tr.parents('tr')).remove().draw();
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

$(document).ready(function () {
    group_unix = $("#group_unix").DataTable({
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button class='btn btn-primary btnEditGroup' id='btnEditGroup'>Add Edit Group</button><button class='btn btn-danger btnDelete'>Delete Group</button>"
        }],
        dom: 'Bfrtip',
        buttons: [{
            text: "Add User",
            className: 'btn btn-success btnNew',
            attr: {
                title: 'Add User',
                id: 'btnNew'
            },

        }],
        "autoWidth": true,
        "responsive": true
    });
});
    // Add Group
    $(document).on("click", ".btnNew", function() {
        const steps = ['1', '2']
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
                        text: "Please select a group name",
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
                        html: html,
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
                    group_unix.search("").row({
                        search: 'applied'
                    })
                    name = values[0],
                    username = $.trim($("#username").val());
                    id = "1",
                    option = 0,
                        $.ajax({
                            url: "group_unix/",
                            type: "POST",
                            dataType: "json",
                            headers:{'X-CSRFToken':csrftoken},
                            data: {
                                name: name,
                                username: username,
                                password: null,
                                option: option,
                            },
                            success: function(data) {
                                group_unix.row.add([id, name, username]).draw();
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

//Edit User
$(document).on("click", ".btnEditGroup", function () {
    tr = $(this).closest("tr");
    id = tr.find("td:eq(0)").text();
    name = tr.find('td:eq(1)').text();
    username = tr.find('td:eq(2)').text();
    const username_old = username.split(",");
    option = 1;
    Swal.fire({
        title: 'Add user to ' + name,
        html: html,
        text: 'Please select username',
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        didOpen: function(){
            $('#username').select2({ width: 'resolve', theme: "classic", width: '100%'}).val(username_old);
            $('#username').trigger('change');
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
    }).then((result) => {
        if (username) {
            username = $.trim($("#username").val());
            username.concat(username_old);
            $.ajax({
                url: "group_unix/",
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
                    group_unix.row(tr).data([id, name, username]).draw();
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
//Remove User
$(document).on("click", ".btnDeleteUser", function () {
    tr = $(this).closest("tr");
    id = tr.find("td:eq(0)").text();
    name = tr.find('td:eq(1)').text();
    username = tr.find('td:eq(2)').text();
    const username_old = username.split(",");
    option = 2;
    Swal.fire({
        title: 'Remove user from ' + name,
        html: html,
        text: 'Please select a new name',
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        didOpen: function(){
            $('#username').select2({ width: 'resolve', theme: "classic", width: '100%'}).val(username_old   );
            $('#username').trigger('change');
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
    }).then((result) => {
        if (username) {
            username = $.trim($("#username").val());
            $.ajax({
                url: "group_unix/",
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
                    group_unix.row(tr).data([id, name, username ]).draw();
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
//Delete Group
$(document).on("click", ".btnDelete", function () {
    tr = $(this);
    name = $(this).closest("tr").find('td:eq(1)').text();
    username = tr.find('td:eq(2)').text();
    option = 3 //Delete
    Swal.fire({
        title: 'Delete ' + name,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "group_unix/",
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
                    group_unix.row(tr.parents('tr')).remove().draw();
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

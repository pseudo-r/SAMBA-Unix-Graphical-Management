{% extends "layouts/base.html" %}

{% block title %} Dashboard {% endblock %}
<!-- Element injected in the BODY element -->
{% block body_class %} sidebar-mini {% endblock body_class %}
<!-- Specific Page CSS goes HERE  -->
{% block stylesheets %}
<!-- Google Font: Source Sans Pro -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
<!-- Font Awesome -->
<link rel="stylesheet" href="/static/assets/plugins/fontawesome-free/css/all.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
<!-- Tempusdominus Bootstrap 4 -->
<link rel="stylesheet" href="/static/assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
<!-- iCheck -->
<link rel="stylesheet" href="/static/assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
<!-- JQVMap -->
<link rel="stylesheet" href="/static/assets/plugins/jqvmap/jqvmap.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="/static/assets/css/adminlte.min.css">
<!-- overlayScrollbars -->
<link rel="stylesheet" href="/static/assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
<!-- Daterange picker -->
<link rel="stylesheet" href="/static/assets/plugins/daterangepicker/daterangepicker.css">
<!-- summernote -->
<link rel="stylesheet" href="/static/assets/plugins/summernote/summernote-bs4.min.css">
<!-- DataTables -->
<link rel="stylesheet" href="/static/assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="/static/assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
<!-- Select2 -->
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<style type="text/css">
.select2-container--open {
z-index: 99999999999999;
}
</style>

{% endblock stylesheets %}

{% block content %}

{% load global_variable %}
{% global_variable  as global_variable %}

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">Directories Management</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="index.php">Directories Management</a></li>
                        <li class="breadcrumb-item active">Directories Management v1</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>{{ global_variable.0|length}}</h3>
                            <p>Unix User registered</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-person-add"></i>
                        </div>
                        <a href="user_unix.php" class="small-box-footer nav-link">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>{{ global_variable.1|length}}</h3>
                            <p>Samba User registered</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-person-add"></i>
                        </div>
                        <a href="directories.php" class="small-box-footer nav-link">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-primary">
                        <div class="inner">
                            <h3>{{ global_variable.2|length}}</h3>
                            <p>Unix Groups registered</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-person-stalker"></i>
                        </div>
                        <a href="group_unix.php" class="small-box-footer nav-link">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-danger">
                        <div class="inner">
                            <h3>{{ global_variable.3|length}}</h3>
                            <p>Folder Groups registered</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-android-folder-open"></i>
                        </div>
                        <a href="directories.php" class="small-box-footer nav-link">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Directories Management</h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <table id="directories" class="table table-striped table-bordered" style="width:100%">
                                <thead>
                                    <tr>
                                        <th>Directory</th>
                                        <th>Permission</th>
                                        <th>Group Owner</th>
                                        <th>User Owner</th>
                                        <th>Data</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {% for directories, permissions, group_folder, user_folder, data_folder in global_variable.7 %}
                                    <tr>
                                        <td>{{directories}}</td>
                                        <td>{{permissions}}</td>
                                        <td>{{group_folder}}</td>
                                        <td>{{user_folder}}</td>
                                        <td>{{data_folder}}</td>
                                        <td></td>
                                    </tr>
                                    {% endfor %}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
{% endblock content %}

<!-- Specific Page JS goes HERE  -->
{% block javascripts %}
<!-- jQuery -->
<script src="/static/assets/plugins/jquery/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="/static/assets/plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="/static/assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- ChartJS -->
<script src="/static/assets/plugins/chart.js/Chart.min.js"></script>
<!-- Sparkline -->
<script src="/static/assets/plugins/sparklines/sparkline.js"></script>
<!-- JQVMap -->
<script src="/static/assets/plugins/jqvmap/jquery.vmap.min.js"></script>
<script src="/static/assets/plugins/jqvmap/maps/jquery.vmap.usa.js"></script>
<!-- jQuery Knob Chart -->
<script src="/static/assets/plugins/jquery-knob/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="/static/assets/plugins/moment/moment.min.js"></script>
<script src="/static/assets/plugins/daterangepicker/daterangepicker.js"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="/static/assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
<!-- Summernote -->
<script src="/static/assets/plugins/summernote/summernote-bs4.min.js"></script>
<!-- overlayScrollbars -->
<script src="/static/assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!-- AdminLTE App -->
<script src="/static/assets/js/adminlte.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="/static/assets/js/pages/dashboard.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="/static/assets/js/demo.js"></script>
<!-- DataTables -->
<script src="/static/assets/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="/static/assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="/static/assets/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="/static/assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
<script src="/static/assets/js/crud/directories.js"></script>
<!-- SweetAlert2 -->
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- Select2 -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<!-- Select2 -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<!-- Token and option -->
{% load global_variable %}
{% global_variable  as global_variable %}

<script type="text/javascript">
    const option_value = '{{global_variable.8|safe}}';
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const csrftoken = '{{ csrf_token|safe }}';
    const html_username = '<select id="username" class="js-example-placeholder-single js-states form-control username"  data-placeholder="Select a username"  style="width: 100%;">'+
    '{% for i  in global_variable.8 %}'+
    '<option  value="{{i}}">{{i}}</option>'+
    '{% endfor %}'+
    '</select>';
    const html_group= '<select id="group" class="js-example-placeholder-single js-states form-control group"  data-placeholder="Select a group"  style="width: 100%;">'+
    '{% for i  in global_variable.9 %}'+
    '<option  value="{{i}}">{{i}}</option>'+
    '{% endfor %}'+
    '</select>';
</script>

{% endblock javascripts %}
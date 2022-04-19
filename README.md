# [SAMBA/Unix Graphical Management v2]


## What is samba?

Samba is a free implementation of the Microsoft Windows file-sharing protocol for UNIX-like systems. In this way, it is possible that computers with GNU / Linux, Mac OS X, or Unix, in general, look like servers or act as clients in Windows networks.

## Problem:

The problem is that you must use the command line to configure and Management samba and not all the people are familiar with the terminal or cmd. So I decided to create a SAMBA Graphical Management similar to swat. For this project, I've been using PHP, python, pam (the login security), js, and bash.

This allows the administrator of a SAMBA service to configure the smb.conf file (include the Unix group and user) in a graphical way, via a web browser. In addition, the configuration page offers an infinite number of links to local help pages for each of the configurable parameters in the file, facilitating the immediate visualization of the changes.
You can use the web browser to connect to http: // localhost: 8080 or access remotely with the address of the machine where the file is installed and port 80.
<br />


<br />

## ✨ Quick Start in `Docker`

> Get the code

```bash
$ git clone https://github.com/app-generator/django-adminlte.git
$ cd django-adminlte
```

> Start the app in Docker

```bash
$ docker-compose up --build
```

Visit `http://localhost:85` in your browser. The app should be up & running.

<br />

<img src="https://github.com/pseudo-r/LinkedinAutoMessage/blob/main/screenshot/6.png?raw=true" width="500" />
<img src="https://github.com/pseudo-r/LinkedinAutoMessage/blob/main/screenshot/1.png?raw=true" width="500" />
<img src="https://github.com/pseudo-r/LinkedinAutoMessage/blob/main/screenshot/2.png?raw=true" width="500" />
<img src="https://github.com/pseudo-r/LinkedinAutoMessage/blob/main/screenshot/3.png?raw=true" width="500" />
<img src="https://github.com/pseudo-r/LinkedinAutoMessage/blob/main/screenshot/4.png?raw=true" width="500" />
<img src="https://github.com/pseudo-r/LinkedinAutoMessage/blob/main/screenshot/5.png?raw=true" width="500" />

<br />

## ✨ How to use it

```bash
$ # Get the code
$ git clone https://github.com/app-generator/django-adminlte.git
$ cd django-adminlte
$
$ # Virtualenv modules installation (Unix based systems)
$ virtualenv env
$ source env/bin/activate
$
$ # Virtualenv modules installation (Windows based systems)
$ # virtualenv env
$ # .\env\Scripts\activate
$
$ # Install modules - SQLite Storage
$ pip3 install -r requirements.txt
$
$ # Create tables
$ python manage.py makemigrations
$ python manage.py migrate
$
$ # Start the application (development mode)
$ python manage.py runserver # default port 8000
$
$ # Start the app - custom port
$ # python manage.py runserver 0.0.0.0:<your_port>
$
$ # Access the web app in browser: http://127.0.0.1:8000/
```

> Note: To use the app, please access the registration page and create a new user. After authentication, the app will unlock the private pages.

<br />

## ✨ Code-base structure

The project is coded using a simple and intuitive structure presented below:

```bash
< PROJECT ROOT >
   |
   |-- core/                               # Implements app configuration
   |    |-- settings.py                    # Defines Global Settings
   |    |-- wsgi.py                        # Start the app in production
   |    |-- urls.py                        # Define URLs served by all apps/nodes
   |    |-- templatetags/                  
   |         |
   |         |-- global_variable.py        # Define Python Script
   |
   |-- apps/
   |    |
   |    |-- home/                          # A simple app that serve HTML files
   |    |    |-- views.py                  # Serve HTML pages for authenticated users
   |    |    |-- urls.py                   # Define some super simple routes  
   |    |
   |    |-- authentication/                # Handles auth routes (login and register)
   |    |    |-- urls.py                   # Define authentication routes  
   |    |    |-- views.py                  # Handles login and registration  
   |    |    |-- forms.py                  # Define auth forms (login and register) 
   |    |
   |    |-- static/
   |    |    |-- <css, JS, images>         # CSS files, Javascripts files
   |    |
   |    |-- templates/                     # Templates used to render pages
   |         |-- includes/                 # HTML chunks and components
   |         |    |-- navigation.html      # Top menu component
   |         |    |-- sidebar.html         # Sidebar component
   |         |    |-- footer.html          # App Footer
   |         |    |-- scripts.html         # Scripts common to all pages
   |         |
   |         |-- layouts/                   # Master pages
   |         |    |-- base-fullscreen.html  # Used by Authentication pages
   |         |    |-- base.html             # Used by common pages
   |         |
   |         |-- accounts/                  # Authentication pages
   |         |    |-- login.html            # Login page
   |         |    |-- register.html         # Register page
   |         |
   |         |-- home/                      # UI Kit Pages
   |              |-- index.html            # Index page
   |              |-- 404-page.html         # 404 page
   |              |-- *.html                # All other pages
   |
   |-- requirements.txt                     # Development modules - SQLite storage
   |
   |-- .env                                 # Inject Configuration via Environment
   |-- manage.py                            # Start the app - Django default start script
   |
   |-- ************************************************************************
```

<br />

> The bootstrap flow

- Django bootstrapper `manage.py` uses `core/settings.py` as the main configuration file
- `core/settings.py` loads the app magic from `.env` file
- Redirect the guest users to Login page
- Unlock the pages served by *app* node for authenticated users

<br />

## ✨ Recompile CSS

To recompile SCSS files, follow this setup:

<br />

**Step #1** - Install tools

- [NodeJS](https://nodejs.org/en/) 12.x or higher
- [Gulp](https://gulpjs.com/) - globally 
    - `npm install -g gulp-cli`
- [Yarn](https://yarnpkg.com/) (optional) 

<br />

**Step #2** - Change the working directory to `assets` folder

```bash
$ cd core/static/assets
```

<br />

**Step #3** - Install modules (this will create a classic `node_modules` directory)

```bash
$ npm install
// OR
$ yarn
```

<br />

**Step #4** - Edit & Recompile SCSS files 

```bash
$ gulp scss
```

The generated file is saved in `static/assets/css` directory.

<br /> 



## ✨ Credits & Links

- [Django](https://www.djangoproject.com/) - The official website
- [Boilerplate Code](https://github.com/app-generator/django-adminlte) - Index provided by **AppSeed**

<br />

---
[SAMBA/Unix Graphical Management](https://kloverdevs.cl/) - Provided by **Kloverdevs(https://kloverdevs.cl/)**.
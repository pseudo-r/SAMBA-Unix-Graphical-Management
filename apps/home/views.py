# -*- encoding: utf-8 -*-

from django import template
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
import subprocess, json

@login_required(login_url="/login/")
def index(request):
    context = {'segment': 'index'}

    html_template = loader.get_template('home/index.php')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context['segment'] = load_template

        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.php')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.php')
        return HttpResponse(html_template.render(context, request))

def user_unix(request):
        username = request.POST['username']
        name = request.POST['name']
        password = request.POST['password']
        option = request.POST['option']
        if int(option) == 0:
                command = subprocess.getoutput(f"""sudo useradd {username} -c '{name}' -M -N -s /bin/false""")
                print(command)
        if int(option)  == 1:
                command = subprocess.getoutput(f"bash -c \"echo -e '{password}\\n{password}' | sudo passwd {username}\"")
        if int(option)  == 2:
                command = subprocess.getoutput(f"""sudo usermod {username} -c '{name}'""")
        if int(option)  == 3:
                command = subprocess.getoutput(f"""sudo userdel {username}""")
        response = json.dumps({
                'status': 'success',
                'message': 'success message'
        })
        return HttpResponse(response, content_type="application/json")


def samba(request):
        username = request.POST['username']
        name = request.POST['name']
        password = request.POST['password']
        option = request.POST['option']
        if int(option) == 0:
                command = subprocess.getoutput(f"bash -c \"echo -ne '{password}\\n{password}\\n' | sudo pdbedit -a {username} -f '{name}'\"")
                print(command)
        if int(option)  == 1:
                command = subprocess.getoutput(f"bash -c \"echo -e '{password}\\n{password}' | sudo passwd {username}\"")
        if int(option)  == 2:
                command = subprocess.getoutput(f"""sudo pdbedit -u {username} -f '{name}'""")
        if int(option)  == 3:
                command = subprocess.getoutput(f"""sudo pdbedit -x {username}""")
        response = json.dumps({
                'status': 'success',
                'message': 'success message'
        })
        return HttpResponse(response, content_type="application/json")

def group_unix(request):
        username = request.POST['username']
        name = request.POST['name']
        password = request.POST['password']
        option = request.POST['option']
        if int(option) == 0:
                command = subprocess.getoutput(f"""sudo groupadd -f {name} && sudo gpasswd -M {username}  {name}""")
                print(command)
        if int(option)  == 1:
                command = subprocess.getoutput(f"gpasswd -M {username} {name}""")
        if int(option)  == 2:
                command = subprocess.getoutput(f"""gpasswd -M {username} {name}'""")
        if int(option)  == 3:
                command = subprocess.getoutput(f"""sudo groupdel -f {name}""")
        response = json.dumps({
                'status': 'success',
                'message': 'success message'
        })
        return HttpResponse(response, content_type="application/json")

def directories(request):
        folder_path = "/home/administrator/samba/django-adminlte/"
        path = request.POST['path']
        folder = request.POST['folder']
        group_owner = request.POST['group_owner']
        user_owner = request.POST['user_owner']
        option = request.POST['option']
        if int(option) == 0:
                #create_folder
                subprocess.getoutput(f"""sudo mkdir -p -m 2770 '{folder_path}{folder}' && sudo chown -R {user_owner}:{group_owner} '{folder_path}{folder}'""")
                #create_folder 
                #subprocess.getoutput(f"""sudo printf '\\n[{folder}] \\npath ={folder}/\\nbrowseable = yes\\nwritable = yes\\nguest ok = no\\nread only = no\\nforce group = {name}\\nvalid users = @{name}\\ncreate mask = 2770\\ndirectory mask = 2770\\n\\n'| sudo tee -a /etc/samba/smb.conf'""")
        if int(option)  == 1:
                subprocess.getoutput(f"""sudo chown -R :'{group_owner}' '{path}'""")
        if int(option)  == 2:
                subprocess.getoutput(f"""sudo chown -R '{user_owner}':  '{path}''""")
        if int(option)  == 3:
                #Delete folder
                subprocess.getoutput(f"""sudo rm -fr '{path}'""")
                #Delete samba file
                #subprocess.getoutput(f"""sudo sed -i '/{path}/,+6d' /etc/samba/smb.conf""")
        response = json.dumps({
                'status': 'success',
                'message': 'success message'
        })
        return HttpResponse(response, content_type="application/json")

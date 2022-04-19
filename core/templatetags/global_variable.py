from django import template
import subprocess
import socket

folder = "/home/administrator/samba/django-adminlte/"
register = template.Library()
@register.simple_tag
def global_variable():
    #User Linux
    user_id = subprocess.getoutput("awk -F ':' '$3>=1001 {print $3}'  /etc/passwd").split('\n')
    unix_username = subprocess.getoutput("awk -F ':' '$3>=1001 {print $1}'  /etc/passwd").split('\n')
    unix_name = subprocess.getoutput("awk -F ':' '$3>=1001 {print $5}'  /etc/passwd").split('\n')
    unix_user_db=zip(user_id, unix_username, unix_name)
    #User groups
    unix_group_id = subprocess.getoutput("awk -F ':' '$3>=1001 {print $3}' /etc/group").split('\n')
    unix_group_name = subprocess.getoutput("awk -F ':' '$3>=1001 {print $1}'  /etc/group").split('\n')
    unix_group_user = subprocess.getoutput("awk -F ':' '$3>=1001 {print $4}' /etc/group").split('\n')
    unix_group_db=zip(unix_group_id, unix_group_name, unix_group_user)
    #samba User
    samba_id = subprocess.getoutput("sudo pdbedit -L | awk -F ':' '{print $2}'").split('\n')
    samba_username = subprocess.getoutput("sudo pdbedit -L | awk -F ':' '{print $1}'").split('\n')
    samba_name = subprocess.getoutput("sudo pdbedit -L | awk -F ':' '{print $3}'").split('\n')
    samba_db=zip(samba_id, samba_username, samba_name)
    #directories
    directories = subprocess.getoutput(f"stat -c %n {folder}*").split('\n')
    permissions = subprocess.getoutput(f"stat -c %a  {folder}*").split('\n')
    group_folder = subprocess.getoutput(f"stat -c %G {folder}*").split('\n')
    user_folder = subprocess.getoutput(f"stat -c %U {folder}*").split('\n')
    data_folder = subprocess.getoutput(f"du {folder}* -sh |"+"awk -F ' ' '{print $1}'d").split('\n')
    directories_db=zip(directories, permissions, group_folder, user_folder, data_folder)
    return user_id, samba_id, unix_group_id, group_folder, unix_user_db, unix_group_db, samba_db, directories_db, unix_username, unix_group_name

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Blog
# Register your models here.

class CustomAdmin(UserAdmin):
    list_display=("username","email",'first_name','last_name')

admin.site.register(CustomUser,CustomAdmin)

class BlogAdmin(admin.ModelAdmin):
    list_display=("title","author",'category','is_draft')
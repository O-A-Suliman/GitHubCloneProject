from django.shortcuts import render
from .serializers import UserRegistrationSerializer,BlogSerializer,UpdateProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Blog
from django.shortcuts import get_object_or_404

# Create your views here

#نوري الموقع انه ده للنشر فقط
@api_view(["POST"])
def register_user(request):
    serializer=UserRegistrationSerializer(data=request.data)#حنرسل البيانات حقت المستخدك
    if serializer.is_valid():#نتأكد انه البيانات صحيحة
        serializer.save()#ننشئ مستخدم جديد
        return Response(serializer.data)#نرجع البيانات
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)#نرجع خطأ

@api_view(["POST"])
@permission_classes(IsAuthenticated)
def create_blog(request):
    serializer=BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def list_blog(request):
    blogs = Blog.objects.filter(is_draft=False)
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_blog(request, pk):
    blog = get_object_or_404(Blog, id=pk) #يجيب البيانات بناء على id
    if blog.author != request.user:
        return Response(
        {"detail": "You are not allowed to edit this blog."},
        status=status.HTTP_403_FORBIDDEN)
    serializer = BlogSerializer(blog, data=request.data) #يعدل البيانات
    if serializer.is_valid(): #يتأكد منها
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)#يرجع البيانات

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_blog(request, pk):
    blog = get_object_or_404(Blog, id=pk) #يجيب البيانات بناء على id
    if blog.author != request.user:
        return Response(
        {"detail": "You are not allowed to edit this blog."},
        status=status.HTTP_403_FORBIDDEN)
    blog.delete()
    return Response(
        {"detail": "Blog deleted successfully."},
        status=status.HTTP_204_NO_CONTENT
    )

@api_view(["PATCH"])
@permission_classes(IsAuthenticated)
def update_profile(request):
    user=request.user
    serializer=UpdateProfileSerializer(user, data=request.data,partial=True)
    if serializer.is_valid(): #يتأكد منها
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)#يرجع البيانات
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
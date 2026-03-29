from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
import json
from .models import table

@api_view(['GET'])
def add_post(request):
    Department = request.GET.get('department','')
    CourseTitle = request.GET.get('coursetitle','')
    Instructor = request.GET.get('instructor','')
    
    new_post = table(Department=Department, CourseTitle=CourseTitle, Instructor=Instructor)
    new_post.save()
    if Department:
        return Response({'data': Department+ " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response({'res','parmeter: name is None'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_post(request):
    tables = table.objects.all().values()
    return JsonResponse(list(tables),safe=False, status=status.HTTP_200_OK)
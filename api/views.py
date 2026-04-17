from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Subject, Task, Note
from .serializers import SubjectSerializer, TaskSerializer, NoteSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
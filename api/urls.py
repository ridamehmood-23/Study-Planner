from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import SubjectViewSet, TaskViewSet, NoteViewSet, ai_chat

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'notes', NoteViewSet)

urlpatterns = router.urls + [
    path('ai/chat/', ai_chat, name='ai_chat'),
]
from rest_framework.routers import DefaultRouter
from .views import SubjectViewSet, TaskViewSet, NoteViewSet

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'notes', NoteViewSet)

urlpatterns = router.urls
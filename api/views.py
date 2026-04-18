from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Subject, Task, Note
from .serializers import SubjectSerializer, TaskSerializer, NoteSerializer
from groq import Groq


@api_view(['POST'])
def ai_chat(request):
    try:
        user_message = request.data.get('message', '')
        mode = request.data.get('mode', 'explain')
        print("=== AI CHAT CALLED ===")
        print("Message:", user_message)

        context = ""
        if mode == 'study_plan':
            subjects = Subject.objects.all()
            tasks = Task.objects.filter(completed=False)
            subject_list = ", ".join([s.name for s in subjects])
            task_list = "\n".join([
                f"- {t.title} (Priority: {t.priority}, Deadline: {t.deadline})"
                for t in tasks
            ])
            context = f"User's subjects: {subject_list}\nPending tasks:\n{task_list}"

        if mode == 'study_plan':
            system_prompt = f"""You are a helpful study assistant.
User's study data:
{context}
Based on this data, create a personalized study plan in English."""
        else:
            system_prompt = """You are a helpful study assistant.
Explain topics clearly in English.
Use simple language and examples."""

        client = Groq(api_key=settings.GROQ_API_KEY)
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            max_tokens=1024
        )

        return Response({
            'reply': response.choices[0].message.content
        })

    except Exception as e:
        print("=== ERROR ===", str(e))
        return Response({'error': str(e)}, status=500)


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
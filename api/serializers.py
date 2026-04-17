from rest_framework import serializers
from .models import Subject, Task, Note


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

    # Field-level validation
    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Subject name cannot be empty")
        if len(value) < 3:
            raise serializers.ValidationError("Subject name must be at least 3 characters")
        return value


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    # Field-level validation
    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Task title cannot be empty")
        return value

    # Object-level validation
    def validate(self, data):
        due_date = data.get('due_date')

        if due_date:
            from datetime import date
            if due_date < date.today():
                raise serializers.ValidationError("Due date cannot be in the past")

        return data


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

    # Field-level validation
    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Note content cannot be empty")
        return value

    def validate(self, data):
        title = data.get('title')
        content = data.get('content')

        if title and content:
            if title == content:
                raise serializers.ValidationError("Title and content cannot be the same")

        return data
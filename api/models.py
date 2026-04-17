from django.db import models

# Create your models here.
from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=100)      
    color = models.CharField(max_length=7)        
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.name

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    title = models.CharField(max_length=200)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='tasks')
    deadline = models.DateTimeField(null=True, blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()               
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='notes')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
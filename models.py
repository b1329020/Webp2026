from django.db import models

# Create your models here.
class table(models.Model):
    Department = models.TextField()
    CourseTitle = models.TextField()
    Instructor = models.TextField()

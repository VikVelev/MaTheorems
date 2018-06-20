from django.db import models

# Create your models here.
class Theorem(models.Model):

    name = models.TextField(max_length=32)
    classNum = models.IntegerField()
    definition = models.TextField(max_length=1000)
    ggbFile64 = models.TextField(max_length=10**10)
    posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

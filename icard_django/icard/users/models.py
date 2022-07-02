from django.db import models
from django.contrib.auth.models import AbstractUser


# Con esto modificamos el modelo de usuarios que trae por defecto Django
class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

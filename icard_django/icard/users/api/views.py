from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser

from users.models import User
from users.api.serializers import UserSerializer

class UserApiViewSet(ModelViewSet):
    permissions_class = [IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from ..models import Table
from ..api.serializer import TableSerializer


class TableApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TableSerializer
    queryset = Table.objects.all().order_by('number')

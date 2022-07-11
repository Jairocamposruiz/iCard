from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from ..models import Order
from .serializers import OrderSerializer


class OrderApiViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['table', 'status', 'close', 'payment']
    ordering_fields = '__all__'

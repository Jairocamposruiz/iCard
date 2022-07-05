from rest_framework.serializers import ModelSerializer

from ..models import Order
from products.api.serializers import ProductSerializer
from tables.api.serializer import TableSerializer


class OrderSerializer(ModelSerializer):
    product_data = ProductSerializer(source='product', read_only=True)
    table_data = TableSerializer(source='table', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'table_data', 'product_data', 'close', 'created_at']

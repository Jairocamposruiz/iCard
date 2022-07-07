from rest_framework.serializers import ModelSerializer

from ..models import Payment
from tables.api.serializer import TableSerializer


class PaymentSerializer(ModelSerializer):
    table_data = TableSerializer(source='table', read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'table', 'table_data', 'total_payment', 'payment_type', 'status_payment', 'created_at']

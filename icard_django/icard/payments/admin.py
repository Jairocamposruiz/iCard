from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'table', 'total_payment', 'payment_type', 'status_payment', 'created_at']

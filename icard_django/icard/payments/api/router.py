from rest_framework.routers import DefaultRouter

from .views import PaymentApiViewSet

router_payment = DefaultRouter()

router_payment.register(
    prefix='payments', basename='payments', viewset=PaymentApiViewSet
)
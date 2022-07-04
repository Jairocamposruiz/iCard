from rest_framework.routers import DefaultRouter

from ..api.views import ProductApiViewSet

router_product = DefaultRouter()

router_product.register(
    prefix='products', basename='products', viewset=ProductApiViewSet
)
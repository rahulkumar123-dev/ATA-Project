# backend/tickets/urls.py

from django.urls import path
from .views import TicketListCreateView, TicketDetailView, TicketSearchAPIView

urlpatterns = [
    path('', TicketListCreateView.as_view(), name='ticket-list'),
    path('<int:pk>/', TicketDetailView.as_view(), name='ticket-detail'),
    path('search/', TicketSearchAPIView.as_view(), name='ticket-search'),
]
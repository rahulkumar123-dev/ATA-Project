from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from elasticsearch_dsl.query import Q

from .models import Ticket
from .serializers import TicketModelSerializer, TicketSearchSerializer
from .documents import TicketDocument  # Required for Elasticsearch

# Pagination that returns 'results' and 'total'
class TicketPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'results': data,
            'total': self.page.paginator.count,
        })

# List and Create Tickets
class TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketModelSerializer
    pagination_class = TicketPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Retrieve, Update, Delete a single ticket
class TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketModelSerializer

# Search View using Elasticsearch
class TicketSearchAPIView(APIView):
    def get(self, request):
        query = request.GET.get('q', '')
        if not query:
            return Response({'results': []})

        q = Q(
            "multi_match",
            query=query,
            fields=[
                "subject",
                "description",
                "status",
                "priority",
                "department",
                "user.username",
                "user.email",
            ],
            fuzziness="auto"
        )
        search = TicketDocument.search().query(q)
        hits = search[:10].execute()
        serializer = TicketSearchSerializer(hits, many=True)
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)
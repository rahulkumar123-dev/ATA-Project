from django_elasticsearch_dsl import Document, Index, fields
from django_elasticsearch_dsl.registries import registry
from .models import Ticket

ticket_index = Index('tickets')
ticket_index.settings(
    number_of_shards=1,
    number_of_replicas=0
)

@registry.register_document
class TicketDocument(Document):
    user = fields.ObjectField(properties={
        'username': fields.TextField(),
        'email': fields.TextField()
    })

    class Index:
        name = 'tickets'

    class Django:
        model = Ticket
        fields = [
            'subject',
            'description',
            'status',
            'priority',
            'department',
            'created_at',
            'updated_at',
        ]
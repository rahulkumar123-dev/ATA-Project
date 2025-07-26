from celery import shared_task
import requests
from .models import ServiceNowConfig, TicketDocument

@shared_task
def fetch_tickets():
    cfg = ServiceNowConfig.objects.first()
    resp = requests.get(
        f"{cfg.url}/api/now/table/incident",
        auth=(cfg.username, cfg.password)
    )
    data = resp.json()['result']
    for item in data:
        doc = TicketDocument(meta={'id': item['sys_id']}, **item)
        doc.save()
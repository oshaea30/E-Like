from django.db import models
from django.db.models.deletion import CASCADE
from apps.users.models import User
from apps.match.models import Match

# Create your models here.
class Chat(models.Model):
    class Meta:(object)


id = models.IntegerField(
    "ID", blank=False, null=False, db_index=True
)
match_id = models.ForeignKey(
    'Match ID', on_delete=CASCADE, db_index=True  
)
send_user_id = models.ForeignKey(
    "Send User ID", on_delete=CASCADE, db_index=True
)
receive_user_id = models.ForeignKey(
    "Receive User ID", on_delete=CASCADE, db_index=True
)
body = models.CharField(
    "Body", blank=False, null=False, max_length=250 
)
created_at = models.DateTimeField(
    "Creation Date", blank=True, auto_now_add=True
    )
updated_at = models.DateTimeField(
    "Update Date", blank=True, auto_now=True
    )

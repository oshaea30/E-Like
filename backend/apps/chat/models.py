from django.db import models

# Create your models here.
class Chat(models.Model):
    class Meta:(object)


id = models.IntegerField(
    "ID", blank=False, null=False, db_index=True
)
match_id = models.IntegerField(
    "Match ID", blank=False, null=False, db_index=True  
)
send_user_id = models.IntegerField(
    "Send User ID", blank=False, null=False, db_index=True
)
receive_user_id = models.IntegerField(
    "Receive User ID", blank=False, null=False, db_index=True
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

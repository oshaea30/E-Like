from django.db import models
from apps.users.models import User


class Match(models.Model):
    class Meta:(object)

id = models.IntegerField(
    "ID", blank=False, null=False, db_index=True
)
user_id_1 = models.ForeignKey(
    "User 1" , on_delete=models.CASCADE, db_index=True
)
user_id_2 = models.ForeignKey(
    "User 2" , on_delete=models.CASCADE, db_index=True
)
created_at = models.DateTimeField(
    "Created Datetime", blank=True, auto_now_add=True
    )
updated_at = models.DateTimeField(
    "Update Date", blank=True, auto_now=True
    )

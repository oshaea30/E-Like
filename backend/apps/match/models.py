from django.db import models



class Match(models.Model):
    class Meta:(object)

id = models.IntegerField(
    "ID", blank=False, null=False, db_index=True
)
user_id_1 = models.IntegerField(
    "User 1" , blank=False, null=False, db_index=True
)
user_id_2 = models.IntegerField(
    "User 2" , blank=False, null=False, db_index=True
)
created_at = models.DateTimeField(
    "Creation Date", blank=True, auto_now_add=True
    )
updated_at = models.DateTimeField(
    "Update Date", blank=True, auto_now=True
    )

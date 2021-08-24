from django.db import models



class Like(models.Model):
    class Meta(object):
        db_table = 'like'

    send_user_id = models.IntegerField(
        'Send User ID', blank=False, null=False, db_index=True
    )
    receive_user_id = models.IntegerField(
        'Receive User ID', blank=False, null=False, db_index=True
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=True, auto_now=True
    )
    updated_at = models.DateTimeField(
        'Update Date', blank=True, auto_now=True
    )
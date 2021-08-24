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
    modified_at = models.DateTimeField(
        'Modified Date Time', blank=True, auto_now=True
    )
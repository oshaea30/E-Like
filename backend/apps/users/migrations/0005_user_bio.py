# Generated by Django 3.2.4 on 2022-01-09 05:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.CharField(blank=True, db_index=True, max_length=100, null=True, verbose_name='Biography'),
        ),
    ]
# Generated by Django 2.1.7 on 2019-04-24 03:23

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('sprayer', '0004_auto_20190417_1656'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spray',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]

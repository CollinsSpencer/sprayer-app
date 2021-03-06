# Generated by Django 2.1.7 on 2019-04-25 00:28

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('sprayer', '0011_auto_20190424_1443'),
    ]

    operations = [
        migrations.AddField(
            model_name='owner',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
        migrations.AlterField(
            model_name='owner',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]

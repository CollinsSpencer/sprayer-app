# Generated by Django 2.1.7 on 2019-04-25 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sprayer', '0016_auto_20190425_0037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]

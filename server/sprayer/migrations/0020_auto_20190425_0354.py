# Generated by Django 2.1.7 on 2019-04-25 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sprayer', '0019_auto_20190425_0354'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sprayapplication',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=7),
        ),
    ]

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Spray(models.Model):
    name = models.CharField(max_length=40)
    user = models.ForeignKey(User, on_delete=models.PROTECT)


class Owner(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Field(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.PROTECT)
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.PROTECT)


class FieldSeason(models.Model):
    CROP_TYPES = (
        ('CORN', 'Corn'),
        ('BEANS', 'Soybeans'),
        ('KALE', 'Kale'),
    )
    crop_type = models.CharField(max_length=5, choices=CROP_TYPES)
    num_acres = models.DecimalField(max_digits=8, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    field = models.ForeignKey(Field, on_delete=models.CASCADE)


class SprayApplication(models.Model):
    cost = models.IntegerField()  # In cents
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True, editable=False)
    spray = models.ForeignKey(Spray, on_delete=models.PROTECT)
    field_season = models.ForeignKey(FieldSeason, on_delete=models.PROTECT)
    updated_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        return super(SprayApplication, self).save(*args, **kwargs)

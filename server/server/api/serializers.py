from django.contrib.auth.models import User, Group
from rest_framework import serializers
from sprayer.models import Spray, SprayApplication, Owner, Field, FieldSeason


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class SpraySerializer(serializers.HyperlinkedModelSerializer):
    # This is for being able to see the user_id in the request and not be able to set it
    # user = serializers.PrimaryKeyRelatedField(
    #     read_only=True,
    #     default=serializers.CurrentUserDefault()
    # )

    # This does not show the user in the request
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = Spray
        fields = ('name', 'user')


class SprayApplicationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SprayApplication
        fields = ('cost', 'amount', 'spray')


class OwnerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Owner
        fields = ('name',)


class FieldSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Field
        fields = ('owner', 'name', 'user')


class FieldSeasonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FieldSeason
        fields = ('crop_type', 'num_acres', 'start_date', 'end_date', 'field')

from django.contrib.auth.models import User, Group
from rest_framework import serializers
from sprayer.models import Spray, SprayApplication


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

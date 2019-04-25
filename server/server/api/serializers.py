from django.contrib.auth.models import User, Group
from rest_framework import serializers

from sprayer.models import Spray, Owner, Field, FieldSeason, SprayApplication


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

    id = serializers.ReadOnlyField()

    class Meta:
        model = Spray
        fields = ('id', 'name', 'user')


class SprayApplicationSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = SprayApplication
        fields = ('cost', 'amount', 'date', 'spray', 'field_season')


class OwnerSerializer(serializers.HyperlinkedModelSerializer):
    uuid = serializers.UUIDField(required=False)
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = Owner
        fields = ('uuid', 'name', 'user')


class FieldSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer()
    id = serializers.ReadOnlyField()

    class Meta:
        model = Field
        fields = ('id', 'name', 'owner')

    def create(self, validated_data):
        owner_data = validated_data.pop('owner')
        if 'uuid' in owner_data.keys():
            if Owner.objects.filter(uuid=owner_data['uuid']).exists():
                owner = Owner.objects.get(uuid=owner_data['uuid'], user=owner_data['user'])
            else:
                owner = Owner.objects.create(name=owner_data['name'], user=owner_data['user'])
        else:
            owner = Owner.objects.create(name=owner_data['name'], user=owner_data['user'])
        instance = Field.objects.create(**validated_data, owner=owner)
        return instance


class FieldSeasonSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = FieldSeason
        fields = ('crop_type', 'num_acres', 'start_date', 'end_date', 'field')

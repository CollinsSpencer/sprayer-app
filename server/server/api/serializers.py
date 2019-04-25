from django.contrib.auth.models import User, Group
from rest_framework import serializers

from sprayer.models import Spray, Owner, Field, FieldSeason, SprayApplication


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class SpraySerializer(serializers.ModelSerializer):
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
        fields = ('uuid', 'name', 'user')


class SprayApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SprayApplication
        fields = ('uuid', 'price', 'amount', 'date', 'spray', 'field_season')


class OwnerSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(required=False)
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = Owner
        fields = ('uuid', 'name', 'user')


class FieldSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer()
    uuid = serializers.UUIDField(required=False)

    class Meta:
        model = Field
        fields = ('uuid', 'name', 'owner')

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


class FieldSeasonSerializer(serializers.ModelSerializer):
    field = FieldSerializer()
    uuid = serializers.UUIDField(required=False)

    class Meta:
        model = FieldSeason
        fields = ('uuid', 'crop_type', 'num_acres', 'start_date', 'end_date', 'field')

    def create(self, validated_data):
        field_data = validated_data.get('field')
        owner_data = field_data.get('owner')
        owner, created = Owner.objects.get_or_create(
            uuid=owner_data['uuid'],
            defaults={
                'name': owner_data['name'],
                'user': owner_data['user'],
            }
        )

        field, created = Field.objects.get_or_create(
            uuid=field_data['uuid'],
            defaults={
                'owner': owner,
                'name': field_data['name'],
            }
        )

        validated_data.pop('field')
        instance = FieldSeason.objects.create(**validated_data, field=field)
        return instance

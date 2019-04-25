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
    uuid = serializers.UUIDField(required=False)

    class Meta:
        model = Spray
        fields = ('uuid', 'name', 'user')


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
        owner_data = validated_data.get('owner')
        owner, created = Owner.objects.get_or_create(
            uuid=owner_data.get('uuid', None),
            defaults={
                'name': owner_data['name'],
                'user': owner_data['user'],
            }
        )
        validated_data.pop('owner')
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
            uuid=owner_data.get('uuid', None),
            defaults={
                'name': owner_data['name'],
                'user': owner_data['user'],
            }
        )

        field, created = Field.objects.get_or_create(
            uuid=field_data.get('uuid', None),
            defaults={
                'owner': owner,
                'name': field_data['name'],
            }
        )

        validated_data.pop('field')
        instance = FieldSeason.objects.create(**validated_data, field=field)
        return instance


class SprayApplicationSerializer(serializers.ModelSerializer):
    spray = SpraySerializer()
    field_season = FieldSeasonSerializer()
    uuid = serializers.UUIDField(required=False)

    class Meta:
        model = SprayApplication
        fields = ('uuid', 'price', 'amount', 'date', 'spray', 'field_season')

    def create(self, validated_data):
        field_season_data = validated_data.get('field_season')
        field_data = field_season_data.get('field')
        owner_data = field_data.get('owner')
        spray_data = validated_data.get('spray')

        spray, created = Spray.objects.get_or_create(
            uuid=spray_data.get('uuid', None),
            defaults={
                'name': spray_data['name'],
            }
        )

        owner, created = Owner.objects.get_or_create(
            uuid=owner_data.get('uuid', None),
            defaults={
                'name': owner_data['name'],
                'user': owner_data['user'],
            }
        )

        field, created = Field.objects.get_or_create(
            uuid=field_data.get('uuid', None),
            defaults={
                'owner': owner,
                'name': field_data['name'],
            }
        )

        field_season, created = FieldSeason.objects.get_or_create(
            uuid=field_season_data.get('uuid', None),
            defaults={
                'crop_type': field_season_data['crop_type'],
                'num_acres': field_season_data['num_acres'],
                'start_date': field_season_data['start_date'],
                'end_date': field_season_data['end_date'],
                'field': field,
            }
        )

        validated_data.pop('spray')
        validated_data.pop('field_season')
        instance = SprayApplication.objects.create(
            **validated_data,
            spray=spray,
            field_season=field_season,
        )
        return instance

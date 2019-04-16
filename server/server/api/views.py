from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from server.api.serializers import UserSerializer, GroupSerializer, SpraySerializer, SprayApplicationSerializer, \
    OwnerSerializer, FieldSerializer, FieldSeasonSerializer
from sprayer.models import Spray, SprayApplication, Owner, Field, FieldSeason
from rest_framework import generics


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class SprayViewSet(viewsets.ModelViewSet):
    queryset = Spray.objects.all()
    serializer_class = SpraySerializer


class SprayApplicationViewSet(viewsets.ModelViewSet):
    queryset = SprayApplication.objects.all().order_by('updated_at')
    serializer_class = SprayApplicationSerializer


class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer


class FieldViewSet(viewsets.ModelViewSet):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer

    # Use this function to get fields for currently logged in user;
    # However, you must override other functions and explicitly call
    #  get_queryset for it to apply
    # def get_queryset(self):
    #     """
    #     This view should return a list of all the fields
    #     for the currently authenticated user.
    #     """
    #     user = self.request.user
    #     return Field.objects.filter(user=user)


class FieldSeasonViewSet(viewsets.ModelViewSet):
    queryset = FieldSeason.objects.all()
    serializer_class = FieldSeasonSerializer

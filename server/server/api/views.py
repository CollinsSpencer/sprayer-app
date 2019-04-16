from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from server.api.serializers import UserSerializer, GroupSerializer, SpraySerializer, SprayApplicationSerializer
from sprayer.models import Spray, SprayApplication


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

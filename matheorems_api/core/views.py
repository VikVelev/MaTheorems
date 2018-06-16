from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.http.response import responses
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User

from .serializers import TheoremSerializer
from .models import Theorem
class UserList(generics.ListCreateAPIView):
    
    def get_queryset(self):
        queryset = User.objects.all()

        
        print(len(self.kwargs))
        if len(self.kwargs) is not 0:
            #pylint: disable=E1101
            queryset = queryset.filter(id=self.kwargs['pk'])

        return queryset


    serializer_class = UserSerializer

class TheoremsList(generics.ListCreateAPIView, generics.mixins.DestroyModelMixin):

    def get_queryset(self):
        queryset = Theorem.objects.all()

        if len(self.kwargs) is not 0:
            queryset = Theorem.objects.all().filter(id=self.kwargs['id'])

        return queryset
    
    def get_object(self):
        queryset = self.get_queryset()

        if len(queryset) == 1:
            filter = {}
            for field in self.kwargs:
                filter[field] = self.kwargs[field]

            obj = get_object_or_404(queryset, **filter)
            self.check_object_permissions(self.request, obj)

            return obj

    def delete(self, request, *args, **kwargs):
        if self.get_object() is None:
            return  HttpResponse(content="{ 'error' : Not a single object }", status=400)
        else:
            self.destroy(request, *args, **kwargs)

    serializer_class = TheoremSerializer
from django.conf.urls import url
from django.urls import path, re_path, include
from rest_framework.authtoken.views import ObtainAuthToken

from .views import UserList
from .views import TheoremsList

urlpatterns = [
    # Main URIs
    path('login/', ObtainAuthToken.as_view()),
    path('accounts/', include('rest_registration.api.urls')),  
    
    path('users/', UserList.as_view()),
    path('user/<pk>', UserList.as_view()),
    
    path('theorems/', TheoremsList.as_view()),
    path('theorem/<id>', TheoremsList.as_view()),
]
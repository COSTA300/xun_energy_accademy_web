from django.urls import path
from . import views

urlpatterns = [
    path("energy/", views.xun_energy_home, name="energy_page"),
]
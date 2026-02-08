from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("stories/", include("stories.urls")),
    path("gameplay/", include("gameplay.urls")),
    path("users/", include("users.urls")),
    path("community/", include("community.urls")),

]

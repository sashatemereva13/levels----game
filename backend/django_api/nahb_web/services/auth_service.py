from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from users.models import Profile


class AuthService:

    def register(self, request, username, password, role="reader"):
        if User.objects.filter(username=username).exists():
            raise ValidationError("Username already exists")

        user = User.objects.create_user(
            username=username,
            password=password
        )

        Profile.objects.get_or_create(
            user=user,
            role=role
        )

        login(request, user)
        return user

    def login_user(self, request, username, password):
        user = authenticate(request, username=username, password=password)

        if not user:
            raise ValidationError("Invalid credentials")

        login(request, user)
        return user

    def logout_user(self, request):
        logout(request)

    def get_user_data(self, user):
        if not user.is_authenticated:
            return None

        return {
            "id": user.id,
            "username": user.username,
            "role": user.profile.role,
            "is_staff": user.is_staff,
        }
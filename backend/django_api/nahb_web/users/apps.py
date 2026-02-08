from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_filed = "django.db.models.BigAutoField"
    name = "users"

    def ready(self):
        import users.signals

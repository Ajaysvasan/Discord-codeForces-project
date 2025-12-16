from django.contrib.auth.models import User, auth
from django.db import models


# Create your models here.
class Server(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owned_servers"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ServerMember(models.Model):
    ROLE_CHOICES = [
        ("OWNER", "Owner"),
        ("ADMIN", "Admin"),
        ("MEMBER", "Member"),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="server_memberships"
    )
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name="members")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "server")

    def __str__(self):
        return f"{self.user.username} → {self.server.name}"


class Channel(models.Model):
    CHANNEL_TYPES = [
        ("TEXT", "Text"),
        ("VOICE", "Voice"),
        ("CODE", "Code"),
    ]

    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channels"
    )
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=CHANNEL_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("server", "name")

    def __str__(self):
        return f"{self.server.name} / {self.name}"


class Message(models.Model):
    channel = models.ForeignKey(
        Channel, on_delete=models.CASCADE, related_name="messages"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.content[:30]}"

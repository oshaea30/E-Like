from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from secrets import token_hex
import datetime


class UserSerializer(serializers.ModelSerializer):
    main_image = serializers.ImageField(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'main_image', 'gender', 'email', 'password', 'token', 'token_expires')


class UserSignUpSerializer(serializers.ModelSerializer):
    main_image = serializers.ImageField(required=True)
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)
    token_expires = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'main_image', 'gender', 'email', 'password', 'token', 'token_expires')

    # Overide the create method
    def create(self, validate_data):
        # Encrypt the password
        validate_data['password'] = make_password(validate_data['password'])

        # Create a token
        validate_data['token'] = token_hex(30)
        validate_data['token_expires'] = datetime.datetime.now() + datetime.timedelta(days=7)

        return super().create(validate_data)


class UserSignInSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    main_image = serializers.ImageField(read_only=True)
    gender = serializers.CharField(read_only=True)
    token = serializers.CharField(read_only=True)
    token_expires = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'gender', 'main_image', 'token', 'token_expires')

    # Override the create method
    def create(self, validated_data):
        user = User.objects.filter(email=validated_data['email'])

        # Check the password
        if len(user) > 0 and check_password(validated_data['password'], user[0].password):
            # Token
            user[0].token = token_hex(30)
            # Token expires after 7 days
            user[0].token_expires = datetime.datetime.now() + datetime.timedelta(days=7)
            user[0].save()

            # Return user information
            return user[0]
        else:
            # Raise error
            raise serializers.ValidationError({"error": "The password or email is incorrect."})

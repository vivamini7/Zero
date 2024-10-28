from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        
        user = User.objects.create_user(
            username = validated_data['username'],
            nickname = validated_data['nickname'],
            email = validated_data['email'],
            age=validated_data['age'],
            phonenumber=validated_data['phonenumber'],
            password = validated_data['password'],
            height=validated_data['height'],
            weight=validated_data['weight'],
            gender=validated_data['gender'],
            exercise_frequency=validated_data['exercise_frequency'],
        )
        return user
    
    class Meta:
        model = User
        fields = '__all__'




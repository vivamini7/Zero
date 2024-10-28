from rest_framework import serializers
from user.models import User  # 사용자 모델을 임포트

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'nickname', 'email', 'age', 'phonenumber', 'height', 'weight', 'gender', 'exercise_frequency', 'created_at', 'updated_at')

from .models import Food, Exercise

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('id', 'name', 'calories', 'date', 'user')

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'name', 'calories_burned', 'date', 'user')
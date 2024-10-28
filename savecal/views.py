from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import User  
from .serializers import UserSerializer 
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Food, Exercise
from .serializers import FoodSerializer, ExerciseSerializer
from django.db import models
from django.db.models import Sum

class UserProfileView(APIView):  #user 정보 받아오는 예시.
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


#날짜 별로 total calorie 따로 계산.
class TotalCaloriesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # 날짜별 음식 칼로리 합계 계산
        food_calories = (
            Food.objects.filter(user=user)
            .values('date')  # 'date' 필드를 기준으로 그룹화
            .annotate(total_food_calories=Sum('calories'))  # 각 날짜의 음식 칼로리 합계
        )

        # 날짜별 운동 칼로리 소모 합계 계산
        exercise_calories = (
            Exercise.objects.filter(user=user)
            .values('date')  # 'date' 필드를 기준으로 그룹화
            .annotate(total_exercise_calories=Sum('calories_burned'))  # 각 날짜의 운동 칼로리 소모 합계
        )

        # 날짜별 칼로리 정보를 통합
        total_calories_by_date = {}
        
        # 음식 칼로리 정보를 딕셔너리에 추가
        for item in food_calories:
            date = item['date'].isoformat()
            total_calories_by_date[date] = {
                'total_food_calories': item['total_food_calories'],
                'total_exercise_calories': 0  # 초기값 설정
            }

        # 운동 칼로리 정보를 딕셔너리에 추가
        for item in exercise_calories:
            date = item['date'].isoformat()
            if date in total_calories_by_date:
                total_calories_by_date[date]['total_exercise_calories'] = item['total_exercise_calories']
            else:
                total_calories_by_date[date] = {
                    'total_food_calories': 0,  # 초기값 설정
                    'total_exercise_calories': item['total_exercise_calories']
                }

        return Response(total_calories_by_date)

#기초대사량도 계산 필요.
class UserBMIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        height_in_meters = user.height / 100  # assuming height is stored in centimeters
        bmi = user.weight / (height_in_meters ** 2)
        bmi_data = {
            'height': user.height,
            'weight': user.weight,
            'bmi': bmi,
        }
        return Response(bmi_data)

#프론트에서 데이터 보낼 때 우리 model에 이미 지정된 변수로 보내는지 의문.
class FoodCreateView(generics.CreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated]

class ExerciseCreateView(generics.CreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]


#같은 날짜면 합쳐서 보여주기.
class FoodListView(generics.ListAPIView):
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Food.objects.filter(user=self.request.user)

class ExerciseListView(generics.ListAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Exercise.objects.filter(user=self.request.user)


# part1
# 1. 음식과 운동 항목들, date, user 저장할 수 있는 model 구축(frontend에서 보내주는 값 DB에 저장해야 되니까.)
# 2. frontend에서 POST하는 음식-운동 칼로리, 날짜, 로그인한 유저 정보(username?)를 DB에 POST하는 view 구현.

# part2
# 1. 위 모델의 DB에 저장된 값 frontend로 GET하는 view 구현 (섭취 칼로리와 소모 칼로리 총량 반환)
# -> frontend에서 섭취 및 소모 칼로리를 넘겨준다는 가정하에 순서 짬. 만약에 숫자로 못 넘기고 boolean으로 넘어오면 음식, 운동별 칼로리를 따로 DB에 저장해 GET 해야함.

# part3
# 1. 로그인한 user 정보 불러오고 공식 이용해서 BMI 값 등 GET하는 view 구현.
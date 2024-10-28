from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from django.conf import settings

# Create your views here.
#회원가입 API
class RegisterAPIView(APIView):
    permission_classes = [AllowAny] #누구나 접근 가능!!

    def post(self, request): #프론트에서 유저 데이터가 포함된 request를 받음
        serializer = UserSerializer(data=request.data) #데이터를 직렬화하여 데이터베이스가 받을 수 있게 함
        if serializer.is_valid(): #직렬화한 데이터가 유효하다면
            serializer.save() #데이터베이스에 저장

            res = Response(
                {
                    "user": serializer.data,
                    "message": "register success",
                },
                status=status.HTTP_200_OK,
            ) #프론트에 보낼 응답 작성

            return res
        else: #직렬화한 데이터가 유효하지 않다면
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#로그인 API
class LogInAPIView(APIView):
    permission_classes = [AllowAny] #누구나 접근 가능?

    # 로그인
    def post(self, request):#프론트에서 username과 password가 포함된 request를 받음
       # 유저 인증
        user = authenticate(
            username=request.data.get("username"), password=request.data.get("password")
        )
        # 이미 회원가입 된 유저일 때
        if user is not None:
            serializer = UserSerializer(user) #데이터를 직렬화하여 데이터베이스가 받을 수 있게 함
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            ) #프론트에 보낼 response (user 시리얼라이저 데이터, 로그인 성공 메시지, 토큰)
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie(key="access", value=access_token, max_age=5*60, httponly=True, secure=settings.SECURE_COOKIE, samesite='Lax') #쿠키에 토큰 저장
            res.set_cookie(key="refresh", value=refresh_token, max_age=24*60*60, httponly=True, secure=settings.SECURE_COOKIE, samesite='Lax') #쿠키에 토큰 저장
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST) 

#로그아웃 API
class LogOutView(APIView):
    permission_classes = [IsAuthenticated] #로그인 된 사람만 접근 가능

    # 로그아웃
    def post(self, request):
        # 쿠키에 저장된 토큰 삭제 => 로그아웃 처리
        response = Response({
            "message": "Logout success"
            }, status=status.HTTP_202_ACCEPTED)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response
    




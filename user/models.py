from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

#serializer를 통해 받은 데이터로 모델이 생성됨

#헬퍼 클래스
class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, username, password, **kwargs):
        if not username:
            raise ValueError('must have username') #email이 유효하지 않으면 에러 발생
        user = self.model(username = username, **kwargs)
        user.set_password(password)
        user.save(using=self._db) #db에 저장
        return user

    # 관리자 user 생성
    def create_superuser(self, username=None, password=None, **extra_fields):
        superuser = self.create_user(
            username = username,
            password=password,
        )#위에서 만든 create_user로 일단 유저 생성
            
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True #권한 부여
        
        superuser.save(using=self._db) #db에 저장
        return superuser

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, null=False, blank=False, unique=True)
    nickname = models.CharField(max_length=10, null=False, blank=False)
    email = models.EmailField(max_length=30, null=False, blank=False, unique=True) #유니크를 사용해서 동일 이메일 사용 불가
    age = models.IntegerField(blank=True, default=0) #age 대신 생년월일..?
    phonenumber = models.CharField(max_length=20, null=False, blank=False)
    height = models.IntegerField(blank=True, default=0)
    weight = models.IntegerField(blank=True, default=0)
    gender = models.CharField(max_length=1, choices=[('M', '남자'), ('F', '여자')])
    exercise_frequency = models.IntegerField(blank=True, default=0)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # 헬퍼 클래스 사용, 위에서 만들어 둔 거를 사용해서 db에 저장
    objects = UserManager()

    # 사용자의 username field는 email으로 설정, email을 user의 식별자로 사용, 기본값은 username
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username
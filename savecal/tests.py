from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Food, Exercise

User = get_user_model()

class FoodExerciseTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.food = Food.objects.create(name='Apple', calories=95, date='2023-01-01', user=self.user)
        self.exercise = Exercise.objects.create(name='Running', calories_burned=300, date='2023-01-01', user=self.user)

    def test_food_creation(self):
        self.assertEqual(self.food.name, 'Apple')
        self.assertEqual(self.food.calories, 95)
        self.assertEqual(self.food.user.username, 'testuser')

    def test_exercise_creation(self):
        self.assertEqual(self.exercise.name, 'Running')
        self.assertEqual(self.exercise.calories_burned, 300)
        self.assertEqual(self.exercise.user.username, 'testuser')

    def test_total_calories(self):
        response = self.client.get('/total-calories/')
        self.client.login(username='testuser', password='12345')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_food_calories'], 95)
        self.assertEqual(response.data['total_exercise_calories'], 300)

    def test_bmi_calculation(self):
        self.user.height = 170
        self.user.weight = 70
        self.user.save()
        response = self.client.get('/user/bmi/')
        self.client.login(username='testuser', password='12345')
        self.assertEqual(response.status_code, 200)
        bmi = 70 / (1.7 ** 2)
        self.assertAlmostEqual(response.data['bmi'], bmi)
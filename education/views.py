from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from main.scripts.helpers import get_employee_by_user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        employee_obj = get_employee_by_user(self.user)

        if employee_obj is None:
            data['user'] = {"name": self.user.username}
        else:
            data['user'] = {"name": employee_obj.firstname + ' ' + employee_obj.lastname}

        groups_list = []
        for group in self.user.groups.all():
            groups_list.append(group.name)

        data['user']['role'] = 'no role'

        if 'Админ' in groups_list:
            data['user']['role'] = 'admin'

        elif 'Руководитель' in groups_list:
            data['user']['role'] = 'supervisor'

        elif 'Сотрудник' in groups_list:
            data['user']['role'] = 'employee'

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
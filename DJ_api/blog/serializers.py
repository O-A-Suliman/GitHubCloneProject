from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Blog

User = get_user_model()


# هذا Serializer يستخدم لتسجيل مستخدم جديد في النظام
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        # النموذج المرتبط بهذا الـ Serializer هو نموذج المستخدم
        model = get_user_model()
        # الحقول التي سنسمح بإرسالها واستقبالها عبر الـ API
        fields = ["id", 'email', 'username', 'first_name', 'last_name', 'password']
        # extra_kwargs لتعديل خصائص الحقول، هنا نجعل كلمة المرور للكتابة فقط
        extra_kwargs = {
            'password': {"write_only": True}  # لا تظهر كلمة المرور عند جلب بيانات المستخدم
        }

    # هذه الدالة تتحكم بكيفية إنشاء مستخدم جديد عند إرسال البيانات صحيحة
    def create(self, validated_data):
        # استخراج كل البيانات من validated_data
        email = validated_data["email"]
        username = validated_data["username"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        password = validated_data["password"]

        # الحصول على نموذج المستخدم (يمكن أن يكون نموذج افتراضي أو مخصص)
        user_model = get_user_model()

        # إنشاء مستخدم جديد بدون كلمة المرور (لأننا سنقوم بتشفيرها أولًا)
        new_user = user_model.objects.create(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name
        )

        # تشفير كلمة المرور وحفظها بشكل آمن
        new_user.set_password(password)

        # حفظ المستخدم الجديد في قاعدة البيانات
        new_user.save()

        # إعادة المستخدم الجديد بعد الإنشاء
        return new_user
    
class SimpleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model=get_user_model()
        fields=["id",'username', 'first_name', 'last_name']

class BlogSerializer(serializers.ModelSerializer):
    author = SimpleAuthorSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = '__all__'
        # ✅ جعل حقل author كـ read_only لمنع التلاعب به
        read_only_fields = ('author',)


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=get_user_model()
        fields=["id",'bio', 'username', 'first_name', 'last_name','profile_picture','facebook','instagram','x','youtube']
        read_only_fields = ["id"]
        # هذه الدالة تتحقق أن اسم المستخدم غير مستخدم من أي شخص آخر
        def validate_username(self, value):
            user = self.instance  # المستخدم الحالي
            if User.objects.exclude(id=user.id).filter(username=value).exists():
                raise serializers.ValidationError("Username already exists.")
            return value
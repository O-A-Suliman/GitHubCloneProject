الموضوع: إصلاح وتحسين مشروع Django & React الكامل

"لدي مشروع يتكون من Backend باستخدام Django REST Framework و Frontend باستخدام React (Vite). قمت بتحميل ملفات المشروع لك وأريد منك إجراء التعديلات التالية لمعالجة المشاكل الحالية:

1. في جانب Django (Backend):

إعدادات الـ CORS: قم بتهيئة مكتبة django-cors-headers في ملف settings.py. أضفها إلى INSTALLED_APPS و MIDDLEWARE (تأكد من وضعها في الترتيب الصحيح)، واضبط CORS_ALLOWED_ORIGINS لتسمح لـ React الذي يعمل على http://localhost:5173 بالوصول.

الأمان: أضف إعدادات ALLOWED_HOSTS لتشمل 127.0.0.1 و localhost. وضح لي كيف أغير DEBUG إلى False عند الرفع.

الـ Serializers: في ملف blog/serializers.py الخاص بتطبيق المدونة، اجعل حقل author كـ read_only_fields لضمان عدم تلاعب المستخدم بهوية الكاتب عند إنشاء مقال.

2. في جانب React (Frontend):

تطوير خدمة الـ API: عدل ملف src/services/api.js ليستخدم axios.create مع baseURL يشير إلى السيرفر http://127.0.0.1:8000/api/.

نظام التوكن: أضف axios interceptor يقوم بسحب التوكن (access_token) من الـ localStorage وإلحاقه تلقائياً بكل طلب (Request) في الـ Header كـ Authorization: Bearer <token>.

معالجة الأخطاء: أضف response interceptor للتعامل مع خطأ 401 (انتهت الجلسة) وخطأ انقطاع الاتصال بالسيرفر.

3. هيكلة المشروع:

اعطني محتوى ملف .gitignore شامل للمشروع يتجاهل مجلدات node_modules و __pycache__ وملفات البيئة .env وقاعدة البيانات db.sqlite3.

المطلوب: قدم لي الأكواد النهائية المحدثة لكل ملف، مع الإشارة بوضوح لمكان وضع الكود داخل كل ملف.""

لماذا هذا البرومبت قوي؟
محدد التقنيات: يخبر النموذج بالأدوات المستخدمة (Vite, DRF).

يركز على نقاط الضعف: يوجه الذكاء الاصطناعي مباشرة لمشكلة الـ CORS والتوكن.

منظم: يطلب الأكواد بشكل مرتب ملفاً بملف، مما يسهل عليك عملية النسخ واللصق.

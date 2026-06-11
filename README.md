# High Speed Login (مظهر تسجيل الدخول للسرعة العالية)

تطبيق مخصص لإطار العمل Frappe و ERPNext لتخصيص وتنسيق صفحة تسجيل الدخول وإضافة معلومات الدعم الفني الخاصة بمؤسسة السرعة العالية لتقنية المعلومات.

A custom Frappe/ERPNext application designed to customize and brand the login page, incorporating custom stylesheets, javascript, and specific support contact info for High Speed IT.

---

## الميزات (Features)

* **تخصيص الواجهة (Custom Branding):** تعديل كامل على واجهة صفحة تسجيل الدخول ومظهرها باستخدام CSS و JS مخصصين.
* **معلومات الدعم الفني (Support Information):** عرض بيانات التواصل والدعم الفني لمؤسسة السرعة العالية مباشرة على صفحة تسجيل الدخول:
  * **الهواتف:** 0555179010 - 0553231199
  * **العنوان:** القصيم - بريدة - حي الافق
* **التحكم بالترجمة (Language Switcher):** دعم كامل للغتين العربية والإنجليزية.

---

## التثبيت (Installation)

لتثبيت هذا التطبيق على بيئة العمل الخاصة بك (Frappe Bench):

```bash
# 1. جلب التطبيق من مستودع GitHub
bench get-app https://github.com/fuhaed/high_speed_login.git

# 2. تثبيت التطبيق على موقعك المحدد
bench --site [اسم_الموقع] install-app high_speed_login

# 3. تشغيل الترحيل (Migration) لتهيئة وتحديث البيانات
bench --site [اسم_الموقع] migrate

# 4. إعادة تشغيل خوادم الويب والخدمات
bench restart
```

---

## الترخيص (License)
هذا التطبيق مرخص تحت رخصة **MIT**.

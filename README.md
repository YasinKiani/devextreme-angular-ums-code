<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Vazirmatn&size=28&pause=1000&color=1A237E&center=true&vCenter=true&width=640&lines=%D8%B3%D8%A7%D9%85%D8%A7%D9%86%D9%87+%D9%85%D8%AF%DB%8C%D8%B1%DB%8C%D8%AA+%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%D8%A7%D9%86;RTL+%D9%88+Jalali+%D9%88+DevExtreme+%D9%88+Angular+%D9%85%D8%A7%D8%AA%D8%B1%DB%8C%D8%A7%D9%84;Responsive+%F0%9F%93%B1+%E2%80%94+%D8%B3%D8%B1%DB%8C%D8%B9+%F0%9F%9A%80+%E2%80%94+%D8%B2%DB%8C%D8%A8%D8%A7+%F0%9F%8C%9F" alt="typing intro" />

  <p>
    <a href="https://img.shields.io/badge/Angular-17+-dd0031?logo=angular&logoColor=white"><img alt="Angular" src="https://img.shields.io/badge/Angular-17+-dd0031?logo=angular&logoColor=white"></a>
    <a href="https://img.shields.io/badge/DevExtreme-DataGrid-1a237e"><img alt="DevExtreme" src="https://img.shields.io/badge/DevExtreme-DataGrid-1a237e"></a>
    <a href="https://img.shields.io/badge/Material-UI-3f51b5?logo=materialdesign&logoColor=white"><img alt="Material" src="https://img.shields.io/badge/Material-UI-3f51b5?logo=materialdesign&logoColor=white"></a>
    <a href="https://img.shields.io/badge/Jalali-Moment-009688"><img alt="Jalali" src="https://img.shields.io/badge/Jalali-Moment-009688"></a>
    <a href="https://img.shields.io/badge/RTL-Persian-673ab7"><img alt="RTL" src="https://img.shields.io/badge/RTL-Persian-673ab7"></a>
  </p>

</div>

یک برنامه تک‌صفحه‌ای (SPA) مبتنی بر Angular 17 برای مدیریت کاربران که با DevExtreme DataGrid و مجموعه کامپوننت‌های Angular Material پیاده‌سازی شده است. رابط کاربری کاملاً راست‌چین، محلی‌سازی شده برای فارسی و شامل اعتبارسنجی فرم‌ها، تقویم جلالی و ذخیره‌سازی اطلاعات در LocalStorage مرورگر است.

## ✨ امکانات کلیدی

- ⚙️ **مدیریت CRUD** با دیالوگ‌های کاملاً سفارشی (بدون ادیت داخلی DevExtreme)
- 📊 **DevExtreme DataGrid** با جستجو، فیلتر ستون، مرتب‌سازی، صفحه‌بندی و Column Chooser
- 🗂️ **ذخیره‌سازی پایدار** در LocalStorage + بررسی یکتایی کدملی
- 📅 **تاریخ جلالی** با آداپتر Moment-Jalaali برای Material Datepicker
- 🖼️ **آپلود عکس پروفایل** با پیش‌نمایش و آواتار پیش‌فرض
- 🌐 **RTL کامل**، فونت فارسی و تم Material سفارشی
- 📱 **ریسپانسیو ویژه موبایل**: Adaptive Rows (سه‌نقطه) به‌جای اسکرول افقی و دیالوگ با دکمه‌های چسبیده به پایین


<br><br>
### 🌐 دمو آنلاین

🔗 [مشاهده دمو زنده]([/](https://yasinkiani.github.io/devextreme-angular-ums-web))


---
<br><br>


## 🧰 پیش‌نیازها

- Node.js 18 LTS یا جدیدتر
- Angular CLI نسخه `17.3.x` به بالا (اختیاری، برای اجرای دستورات `ng` در محیط توسعه)

🚀 راه‌اندازی پروژه

**نصب وابستگی‌ها**

```powershell
npm install
```

**اجرای سرور توسعه**

```powershell
npm run start
```

**ساخت خروجی تولیدی**

```powershell
npm run build
```

**اجرای lint (اختیاری)**

```powershell
npx ng lint
```

> 📝 **نکته:** پروژه به‌صورت CSR اجرا می‌شود تا DataGrid بدون محدودیت محیط Node کار کند. خروجی تولیدی در `dist/user-management` قرار می‌گیرد.

---
<br><br>
### 🎬 نمایش اسکرین‌شات‌ها

<div align="center">
<br>
#### 📋 صفحه اصلی و جدول کاربران

<img width="1433" height="721" alt="1" src="https://github.com/user-attachments/assets/49dbbafe-9c1d-4a56-9e97-19658347e9d2" />

_نمایش جدول DevExtreme با قابلیت‌های جستجو، فیلتر و مرتب‌سازی_

---
<br>
#### ✏️ فرم افزودن/ویرایش کاربر

<img width="1431" height="725" alt="2" src="https://github.com/user-attachments/assets/93aa7d9b-31b0-40da-ad23-9f842bb76305" />
<img width="1434" height="726" alt="3" src="https://github.com/user-attachments/assets/5b57fcfe-2dc4-462d-9b25-83f1d2888a92" />


_دیالوگ سفارشی با اعتبارسنجی، بارگذاری تصویر و تاریخ جلالی_

---
<br>

#### ⚠️ دیالوگ تایید حذف

<img width="1431" height="724" alt="4" src="https://github.com/user-attachments/assets/5872e741-8bed-43c8-8555-0df0c740761b" />

_دیالوگ تایید سفارشی با Material Design_


</div>


<br><br>

## 🗺️ مسیرهای اصلی پروژه

- `src/app/components/user-list/…` – جدول DevExtreme و اکشن‌های CRUD.
- `src/app/components/user-form/…` – دیالوگ ثبت/ویرایش با اعتبارسنجی و بارگذاری تصویر.
- `src/app/services/user.service.ts` – سرویس LocalStorage با آیدی‌سازی و کنترل یکتایی.
- `src/app/utils/jalali-date-adapter.ts` – آداپتر Moment Jalali برای Material Datepicker.
- `src/styles.scss` – تم سفارشی Angular Material، تنظیمات RTL و استایل‌های سراسری.
  
## 💾 مدیریت داده‌ها در مرورگر

- داده‌ها در کلید `ums-users` از LocalStorage ذخیره می‌شوند.
- سرویس `UserService` همواره نسخه‌ای از داده‌ها را در حافظه نگه‌داری می‌کند تا در محیط‌های بدون مرورگر (مانند تست‌ها) نیز قابل استفاده باشد.
- برای بازنشانی داده‌ها، `localStorage.removeItem('ums-users')` را در کنسول مرورگر اجرا کنید

---


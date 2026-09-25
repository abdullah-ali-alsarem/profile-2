/* =========================================================
   ملف app.js
   التحكم في تفاعلات الموقع
   ========================================================= */


/* =========================
   1. الحصول على عناصر الصفحة
   ========================= */


/* الحصول على زر القائمة */
const menuToggle = document.getElementById("menuToggle");


/* الحصول على القائمة */
const nav = document.getElementById("nav");


/* الحصول على جميع روابط القائمة */
const navLinks = document.querySelectorAll(".nav-link");


/* الحصول على زر العودة للأعلى */
const backToTop = document.getElementById("backToTop");


/* الحصول على زر طباعة السيرة الذاتية */
const printCv = document.getElementById("printCv");


/* الحصول على مكان السنة */
const year = document.getElementById("year");


/* =========================
   2. قائمة الجوال
   ========================= */


/* التأكد من وجود زر القائمة والقائمة */
if (menuToggle && nav) {

    /* تنفيذ الكود عند الضغط على زر القائمة */
    menuToggle.addEventListener("click", () => {

        /* إضافة أو إزالة حالة فتح القائمة */
        nav.classList.toggle("show");

        /* إضافة أو إزالة حالة زر القائمة */
        menuToggle.classList.toggle("active");

        /* معرفة هل القائمة مفتوحة */
        const isOpen = nav.classList.contains("show");

        /* تحديث حالة القائمة لقارئات الشاشة */
        menuToggle.setAttribute("aria-expanded", isOpen);

        /* تغيير وصف الزر */
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "إغلاق القائمة" : "فتح القائمة"
        );

    });

}


/* =========================
   3. إغلاق القائمة بعد الضغط
   ========================= */


/* المرور على جميع روابط القائمة */
navLinks.forEach((link) => {

    /* تنفيذ الكود عند الضغط على الرابط */
    link.addEventListener("click", () => {

        /* إغلاق القائمة */
        nav.classList.remove("show");

        /* إعادة شكل زر القائمة */
        menuToggle.classList.remove("active");

        /* تحديث حالة القائمة */
        menuToggle.setAttribute("aria-expanded", "false");

        /* تحديث وصف الزر */
        menuToggle.setAttribute("aria-label", "فتح القائمة");

    });

});


/* =========================
   4. تحديد القسم الحالي
   ========================= */


/* الحصول على جميع الأقسام التي لها ID */
const sections = document.querySelectorAll("section[id]");


/* مراقبة حركة المستخدم داخل الصفحة */
window.addEventListener("scroll", () => {

    /* معرفة موضع التمرير الحالي */
    const scrollPosition = window.scrollY + 150;


    /* البحث عن القسم الموجود حاليًا */
    sections.forEach((section) => {

        /* الحصول على بداية القسم */
        const sectionTop = section.offsetTop;

        /* الحصول على ارتفاع القسم */
        const sectionHeight = section.offsetHeight;

        /* الحصول على معرف القسم */
        const sectionId = section.getAttribute("id");


        /* التأكد من أن المستخدم داخل القسم */
        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            /* إزالة الحالة النشطة من جميع الروابط */
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });


            /* البحث عن رابط القسم الحالي */
            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );


            /* إضافة الحالة النشطة للرابط */
            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

});


/* =========================
   5. زر العودة للأعلى
   ========================= */


/* مراقبة التمرير */
window.addEventListener("scroll", () => {

    /* إذا نزل المستخدم أكثر من 500 بكسل */
    if (window.scrollY > 500) {

        /* إظهار الزر */
        backToTop.classList.add("show");

    } else {

        /* إخفاء الزر */
        backToTop.classList.remove("show");

    }

});


/* تنفيذ العودة للأعلى عند الضغط */
if (backToTop) {

    /* الاستماع للضغط */
    backToTop.addEventListener("click", () => {

        /* العودة للأعلى بحركة ناعمة */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   6. طباعة السيرة الذاتية
   ========================= */


/* التأكد من وجود زر الطباعة */
if (printCv) {

    /* تنفيذ الطباعة عند الضغط */
    printCv.addEventListener("click", () => {

        /* فتح نافذة الطباعة */
        window.print();

    });

}


/* =========================
   7. السنة الحالية تلقائيًا
   ========================= */


/* التأكد من وجود عنصر السنة */
if (year) {

    /* وضع السنة الحالية تلقائيًا */
    year.textContent = new Date().getFullYear();

}


/* =========================
   8. تأثير ظهور العناصر
   ========================= */


/* تحديد العناصر التي نريد تحريكها */
const animatedElements = document.querySelectorAll(
    ".glass-card, .section-heading, .hero-content, .hero-image-wrapper"
);


/* إنشاء مراقب للعناصر */
const observer = new IntersectionObserver(
    (entries) => {

        /* المرور على العناصر */
        entries.forEach((entry) => {

            /* إذا ظهر العنصر */
            if (entry.isIntersecting) {

                /* إضافة كلاس الظهور */
                entry.target.classList.add("visible");

                /* إيقاف مراقبة العنصر */
                observer.unobserve(entry.target);

            }

        });

    },
    {
        /* يبدأ التأثير عندما يظهر 12% من العنصر */
        threshold: 0.12
    }
);


/* تشغيل المراقب على العناصر */
animatedElements.forEach((element) => {

    /* مراقبة العنصر */
    observer.observe(element);

});


/* =========================
   9. منع مشاكل الروابط الداخلية
   ========================= */


/* الحصول على جميع الروابط التي تبدأ بـ # */
const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);


/* المرور على الروابط */
internalLinks.forEach((link) => {

    /* عند الضغط على الرابط */
    link.addEventListener("click", (event) => {

        /* الحصول على اسم القسم */
        const targetId = link.getAttribute("href");

        /* تجاهل الرابط الفارغ */
        if (targetId === "#") {
            return;
        }


        /* البحث عن القسم */
        const target = document.querySelector(targetId);


        /* التأكد من وجود القسم */
        if (target) {

            /* منع السلوك الافتراضي */
            event.preventDefault();


            /* النزول للقسم */
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================
   10. رسالة تشغيل الموقع
   ========================= */


/* طباعة رسالة في Console */
console.log(
    "تم تشغيل الموقع بنجاح - عبدالله الصارم"
);
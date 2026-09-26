/* =========================================
   مِستودع المهارات - SCRIPT.JS
========================================= */


/* =========================================
   بيانات المستخدم
========================================= */

let currentUser = {
    name: "مستخدم جديد",
    email: "",
    hours: 8,
    loggedIn: false
};


/* =========================================
   بيانات الخدمات
========================================= */

let services = [
    {
        name: "تصميم هوية بصرية",
        category: "design",
        description: "تصميم شعار وهوية بصرية بسيطة للمشاريع والحسابات.",
        hours: 3,
        user: "نورة",
        rating: 4.9
    },

    {
        name: "برمجة صفحة ويب",
        category: "programming",
        description: "إنشاء صفحة ويب بسيطة باستخدام HTML وCSS وJavaScript.",
        hours: 4,
        user: "محمد",
        rating: 4.8
    },

    {
        name: "كتابة محتوى",
        category: "writing",
        description: "كتابة محتوى احترافي للمواقع وحسابات التواصل الاجتماعي.",
        hours: 2,
        user: "سارة",
        rating: 5.0
    },

    {
        name: "إدارة حسابات التواصل",
        category: "marketing",
        description: "المساعدة في إعداد خطة محتوى وإدارة الحسابات الاجتماعية.",
        hours: 5,
        user: "ريم",
        rating: 4.7
    }
];

let lastScrollY = window.scrollY;
let isRightFoot = false;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // طباعة أثر فقط عند التمرير لأسفل وبفارق مسافة محددة
  if (currentScrollY - lastScrollY > 30) {
    createPawPrint();
    lastScrollY = currentScrollY;
  }
});

function createPawPrint() {
  const paw = document.createElement('div');
  paw.className = 'paw-print';
  paw.innerHTML = '🐾'; // أثر القدم

  function catPeekAnimation() {
  const cat = document.getElementById('peeking-cat');
  if (!cat) return;

  // اختيار اتجاه عشوائي (يمين أو يسار)
  const isLeft = Math.random() > 0.5;
  
  // إعادة ضبط التنسيقات
  cat.className = 'peeking-cat';
  cat.style.display = 'block';

  if (isLeft) {
    cat.classList.add('peek-left');
  } else {
    cat.classList.add('peek-right');
  }

  // إظهار القطة (تطل)
  setTimeout(() => {
    cat.classList.add('show');
  }, 100);

  // إخفاء القطة بعد 3 ثوانٍ من ظهورها
  setTimeout(() => {
    cat.classList.remove('show');
  }, 3100);
}

// تشغيل الحركة لأول مرة بعد 5 ثوانٍ من فتح الموقع
setTimeout(catPeekAnimation, 5000);

// تكرار الحركة كل 30 ثانية (30000 مللي ثانية)
setInterval(catPeekAnimation, 30000);

  // تحديد الموقع بناءً على مكان الماوس الحالي والتمرير
  const x = window.mouseX || window.innerWidth / 2;
  const y = window.scrollY + (window.mouseY || 200);

  // تناوب الأثر بين القدم اليمنى واليسرى
  const offsetX = isRightFoot ? 15 : -15;
  isRightFoot = !isRightFoot;

  paw.style.left = `${x + offsetX}px`;
  paw.style.top = `${y}px`;

  document.body.appendChild(paw);

  // اختفاء الأثر تدريجياً وحذفه من الصفحة
  setTimeout(() => {
    paw.style.opacity = '0';
    paw.style.transform = 'scale(0.8)';
  }, 100);

  setTimeout(() => {
    paw.remove();
  }, 1100);
}

// تتبع إحداثيات الماوس
window.addEventListener('mousemove', (e) => {
  window.mouseX = e.clientX;
  window.mouseY = e.clientY;
});

/* =========================================
   عند تحميل الصفحة
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateHours();

    updateStatistics();

    loadSavedData();

});


/* =========================================
   تحديث بنك الساعات
========================================= */

function updateHours() {

    const hours = currentUser.hours;

    const navHours = document.getElementById("navHours");
    const heroHours = document.getElementById("heroHours");

    if (navHours) {
        navHours.textContent = hours;
    }

    if (heroHours) {
        heroHours.textContent = hours;
    }


    /* نسبة التقدم */

    const maxHours = 20;

    let percentage = (hours / maxHours) * 100;

    if (percentage > 100) {
        percentage = 100;
    }

    const progress = document.getElementById("hoursProgress");

    const hoursPercent = document.getElementById("hoursPercent");

    if (progress) {
        progress.style.width = percentage + "%";
    }

    if (hoursPercent) {
        hoursPercent.textContent =
            Math.round(percentage) + "%";
    }

}


/* =========================================
   إظهار بنك الساعات
========================================= */

function showHours() {

    showToast(
        "رصيدك الحالي: " +
        currentUser.hours +
        " ساعات",
        "🕒"
    );

}


/* =========================================
   إحصائيات الموقع
========================================= */

function updateStatistics() {

    const usersCount =
        document.getElementById("usersCount");

    const servicesCount =
        document.getElementById("servicesCount");

    const hoursCount =
        document.getElementById("hoursCount");


    if (usersCount) {
        usersCount.textContent = "128";
    }

    if (servicesCount) {
        servicesCount.textContent =
            services.length + 120;
    }

    if (hoursCount) {
        hoursCount.textContent = "486";
    }

}


/* =========================================
   الانتقال للخدمات
========================================= */

function scrollToServices() {

    const servicesSection =
        document.getElementById("services");

    if (servicesSection) {

        servicesSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================
   فتح تسجيل الدخول
========================================= */

function openLogin() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {
        modal.classList.add("show");
    }

}


/* =========================================
   إغلاق تسجيل الدخول
========================================= */

function closeLogin() {

    const modal =
        document.getElementById("loginModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


/* =========================================
   تسجيل الدخول
========================================= */

function login(event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    if (!email || !password) {

        showToast(
            "يرجى إدخال جميع البيانات",
            "⚠️"
        );

        return;
    }


    /*
       تسجيل دخول تجريبي فقط.
       لا يتم إرسال البيانات إلى خادم.
    */

    currentUser.loggedIn = true;

    currentUser.email = email;

    currentUser.name =
        email.split("@")[0];


    closeLogin();


    showToast(
        "تم تسجيل الدخول بنجاح",
        "✓"
    );


    updateNavigation();

}


/* =========================================
   تحديث زر تسجيل الدخول
========================================= */

function updateNavigation() {

    const loginButton =
        document.querySelector(".login-btn");

    if (!loginButton) {
        return;
    }


    if (currentUser.loggedIn) {

        loginButton.textContent =
            currentUser.name;

    } else {

        loginButton.textContent =
            "تسجيل الدخول";

    }

}


/* =========================================
   فتح إضافة خدمة
========================================= */

function openAddService() {

    const modal =
        document.getElementById("serviceModal");

    if (modal) {
        modal.classList.add("show");
    }

}


/* =========================================
   إغلاق إضافة خدمة
========================================= */

function closeAddService() {

    const modal =
        document.getElementById("serviceModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


/* =========================================
   إضافة خدمة جديدة
========================================= */

function addService(event) {

    event.preventDefault();


    const name =
        document.getElementById("serviceName").value.trim();

    const category =
        document.getElementById("serviceCategory").value;

    const description =
        document.getElementById("serviceDescription").value.trim();

    const hours =
        Number(
            document.getElementById("serviceHours").value
        );


    /* التحقق من البيانات */

    if (
        !name ||
        !category ||
        !description ||
        !hours
    ) {

        showToast(
            "يرجى تعبئة جميع البيانات",
            "⚠️"
        );

        return;
    }


    if (hours <= 0) {

        showToast(
            "عدد الساعات يجب أن يكون أكبر من صفر",
            "⚠️"
        );

        return;
    }


    /* إنشاء الخدمة */

    const newService = {

        name: name,

        category: category,

        description: description,

        hours: hours,

        user: currentUser.name,

        rating: 5.0

    };


    services.push(newService);


    /* إضافة الخدمة للواجهة */

    renderService(newService);


    /* إغلاق النافذة */

    closeAddService();


    /* إعادة ضبط النموذج */

    document.getElementById("serviceName").value = "";

    document.getElementById("serviceCategory").value = "";

    document.getElementById("serviceDescription").value = "";

    document.getElementById("serviceHours").value = "";


    updateStatistics();


    showToast(
        "تمت إضافة خدمتك بنجاح",
        "✓"
    );


    saveData();

}


/* =========================================
   إنشاء بطاقة خدمة
========================================= */

function renderService(service) {

    const grid =
        document.getElementById("servicesGrid");

    if (!grid) {
        return;
    }


    const article =
        document.createElement("article");


    article.className =
        "service-card";


    article.dataset.category =
        service.category;


    article.dataset.name =
        service.name;


    const categoryName =
        getCategoryName(service.category);


    const icon =
        getCategoryIcon(service.category);


    article.innerHTML = `

        <div class="service-image">
            ${icon}
        </div>

        <div class="service-content">

            <div class="service-category">
                ${categoryName}
            </div>

            <h3>
                ${escapeHTML(service.name)}
            </h3>

            <p>
                ${escapeHTML(service.description)}
            </p>

            <div class="service-user">

                <div class="avatar">
                    ${getFirstLetter(service.user)}
                </div>

                <div>
                    <strong>
                        ${escapeHTML(service.user)}
                    </strong>

                    <small>
                        عضو في المنصة
                    </small>
                </div>

                <div class="rating">
                    ★ ${service.rating}
                </div>

            </div>

            <div class="service-bottom">

                <span>
                    🕒 ${service.hours} ساعات
                </span>

                <button
                    onclick="requestService(
                        '${escapeAttribute(service.name)}',
                        ${service.hours}
                    )">

                    طلب الخدمة

                </button>

            </div>

        </div>
    `;


    grid.appendChild(article);

}


/* =========================================
   أسماء التصنيفات
========================================= */

function getCategoryName(category) {

    const categories = {

        design: "التصميم",

        programming: "البرمجة",

        writing: "الكتابة",

        marketing: "التسويق",

        education: "التعليم",

        other: "أخرى"

    };


    return categories[category] || "أخرى";

}


/* =========================================
   أيقونات التصنيفات
========================================= */

function getCategoryIcon(category) {

    const icons = {

        design: "🎨",

        programming: "💻",

        writing: "✍️",

        marketing: "📢",

        education: "📚",

        other: "✦"

    };


    return icons[category] || "✦";

}


/* =========================================
   تصفية الخدمات
========================================= */

function filterServices(category, button) {

    const cards =
        document.querySelectorAll(".service-card");


    const buttons =
        document.querySelectorAll(".category");


    /* إزالة active */

    buttons.forEach(function (btn) {

        btn.classList.remove("active");

    });


    /* إضافة active */

    if (button) {

        button.classList.add("active");

    }


    let visibleCards = 0;


    cards.forEach(function (card) {

        const cardCategory =
            card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    updateNoResults(visibleCards);

}


/* =========================================
   البحث
========================================= */

function searchServices() {

    const input =
        document.getElementById("searchInput");


    if (!input) {
        return;
    }


    const search =
        input.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(".service-card");


    let visibleCards = 0;


    cards.forEach(function (card) {

        const name =
            card.dataset.name
                .toLowerCase();


        const text =
            card.textContent
                .toLowerCase();


        if (
            name.includes(search) ||
            text.includes(search)
        ) {

            card.style.display = "";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    updateNoResults(visibleCards);

}


/* =========================================
   لا توجد نتائج
========================================= */

function updateNoResults(count) {

    const noResults =
        document.getElementById("noResults");


    if (!noResults) {
        return;
    }


    if (count === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* =========================================
   طلب خدمة
========================================= */

function requestService(serviceName, hours) {


    if (!currentUser.loggedIn) {

        showToast(
            "سجلي الدخول أولاً لطلب الخدمة",
            "🔐"
        );

        openLogin();

        return;
    }


    if (currentUser.hours < hours) {

        showToast(
            "رصيدك لا يكفي لهذه الخدمة",
            "⚠️"
        );

        return;
    }


    const confirmation =
        confirm(
            "هل تريدين طلب خدمة:\n\n" +
            serviceName +
            "\n\nالتكلفة: " +
            hours +
            " ساعات؟"
        );


    if (!confirmation) {
        return;
    }


    /* خصم الساعات */

    currentUser.hours -= hours;


    updateHours();


    showToast(
        "تم طلب الخدمة بنجاح",
        "✓"
    );


    saveData();

}


/* =========================================
   Toast Notification
========================================= */

function showToast(message, icon = "✓") {

    const toast =
        document.getElementById("toast");


    const toastMessage =
        document.getElementById("toastMessage");


    const toastIcon =
        document.getElementById("toastIcon");


    if (!toast) {
        return;
    }


    toastMessage.textContent =
        message;


    toastIcon.textContent =
        icon;


    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   إغلاق النوافذ عند الضغط خارجها
========================================= */

window.addEventListener(
    "click",
    function (event) {

        const loginModal =
            document.getElementById("loginModal");

        const serviceModal =
            document.getElementById("serviceModal");


        if (
            event.target === loginModal
        ) {

            closeLogin();

        }


        if (
            event.target === serviceModal
        ) {

            closeAddService();

        }

    }
);


/* =========================================
   زر ESC لإغلاق النوافذ
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeLogin();

            closeAddService();

        }

    }
);


/* =========================================
   إنشاء حساب - نسخة تجريبية
========================================= */

function openRegister() {

    closeLogin();


    showToast(
        "سيتم إضافة صفحة إنشاء الحساب لاحقًا",
        "ℹ️"
    );

}


/* =========================================
   حفظ البيانات في المتصفح
========================================= */

function saveData() {

    const data = {

        currentUser: currentUser,

        services: services

    };


    localStorage.setItem(
        "skillsWarehouseData",
        JSON.stringify(data)
    );

}


/* =========================================
   تحميل البيانات
========================================= */

function loadSavedData() {

    const saved =
        localStorage.getItem(
            "skillsWarehouseData"
        );


    if (!saved) {
        return;
    }


    try {

        const data =
            JSON.parse(saved);


        if (data.currentUser) {

            currentUser =
                data.currentUser;

        }


        if (
            data.services &&
            Array.isArray(data.services)
        ) {

            /*
               الخدمات الأساسية موجودة
               مسبقًا في HTML.
            */

        }


        updateHours();

        updateNavigation();

    } catch (error) {

        console.log(
            "تعذر تحميل البيانات."
        );

    }

}


/* =========================================
   الحصول على أول حرف
========================================= */

function getFirstLetter(name) {

    if (!name) {
        return "؟";
    }


    return name.trim().charAt(0);

}


/* =========================================
   حماية النصوص المعروضة في HTML
========================================= */

function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================
   حماية النصوص المستخدمة في attributes
========================================= */

function escapeAttribute(text) {

    return String(text)

        .replace(/\\/g, "\\\\")

        .replace(/'/g, "\\'")

        .replace(/"/g, "&quot;");

}


/* =========================================
   منع إرسال النماذج بالضغط على Enter
   في بعض الحالات غير المطلوبة
========================================= */

document.addEventListener(
    "keypress",
    function (event) {

        if (
            event.key === "Enter" &&
            event.target.tagName === "INPUT"
        ) {

            const form =
                event.target.closest("form");


            if (
                form &&
                !form.onsubmit
            ) {

                event.preventDefault();

            }

        }

    }
);


/* =========================================
   رسالة ترحيب عند فتح الموقع
========================================= */

setTimeout(function () {

    showToast(
        "أهلًا بك في مِستودع المهارات 👋",
        "✦"
    );

}, 1000);


document.addEventListener('DOMContentLoaded', () => {
    // تحديد جميع أزرار عرض الملف الشخصي
    const profileButtons = document.querySelectorAll('.view-profile-btn');

    profileButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // الوصول للعنصر الأب (بطاقة المستخدم) للحصول على مسار الملف
            const userCard = event.target.closest('.user-card');
            const filePath = userCard.getAttribute('data-file');

            if (filePath) {
                // الانتقال إلى ملف المستخدم في نفس النافذة
                window.location.href = filePath;
                
                // أو لفتحه في تبويب جديد، استخدم السطر التالي بدلاً من الأعلي:
                // window.open(filePath, '_blank');
            } else {
                console.error("لم يتم تحديد مسار الملف لهذا المستخدم.");
            }
        });
    });
});





document.addEventListener('DOMContentLoaded', () => {
    // التقاط جميع الأزرار التي تحمل الكلاس
    const buttons = document.querySelectorAll('.view-profile-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // قراءة المسار المكتوب داخل الزر مباشرة
            const filePath = this.getAttribute('data-file');
            
            if (filePath) {
                // التوجيه إلى الصفحة
                window.location.href = filePath;
            } else {
                alert('عذراً، مسار الملف غير موجود!');
            }
        });
    });
});
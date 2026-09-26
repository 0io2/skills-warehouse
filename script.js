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

  if (currentScrollY - lastScrollY > 30) {
    createPawPrint();
    lastScrollY = currentScrollY;
  }
});

function createPawPrint() {
  const paw = document.createElement('div');
  paw.className = 'paw-print';
  paw.innerHTML = '🐾';

  const x = window.mouseX || window.innerWidth / 2;
  const y = window.scrollY + (window.mouseY || 200);

  const offsetX = isRightFoot ? 15 : -15;
  isRightFoot = !isRightFoot;

  paw.style.left = `${x + offsetX}px`;
  paw.style.top = `${y}px`;

  document.body.appendChild(paw);

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

// حركة القط الخلسة
function catPeekAnimation() {
  const cat = document.getElementById('peeking-cat');
  if (!cat) return;

  const isLeft = Math.random() > 0.5;
  
  cat.className = 'peeking-cat';
  cat.style.display = 'block';

  if (isLeft) {
    cat.classList.add('peek-left');
  } else {
    cat.classList.add('peek-right');
  }

  setTimeout(() => {
    cat.classList.add('show');
  }, 100);

  setTimeout(() => {
    cat.classList.remove('show');
  }, 3100);
}

setTimeout(catPeekAnimation, 5000);
setInterval(catPeekAnimation, 30000);


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
        hoursPercent.textContent = Math.round(percentage) + "%";
    }
}


/* =========================================
   إظهار بنك الساعات
========================================= */

function showHours() {
    showToast(
        "رصيدك الحالي: " + currentUser.hours + " ساعات",
        "🕒"
    );
}


/* =========================================
   إحصائيات الموقع
========================================= */

function updateStatistics() {
    const usersCount = document.getElementById("usersCount");
    const servicesCount = document.getElementById("servicesCount");
    const hoursCount = document.getElementById("hoursCount");

    if (usersCount) {
        usersCount.textContent = "128";
    }

    if (servicesCount) {
        servicesCount.textContent = services.length + 120;
    }

    if (hoursCount) {
        hoursCount.textContent = "486";
    }
}


/* =========================================
   الانتقال للخدمات
========================================= */

function scrollToServices() {
    const servicesSection = document.getElementById("services");

    if (servicesSection) {
        servicesSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================================
   فتح واغلاق تسجيل الدخول
========================================= */

function openLogin() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.classList.add("show");
    }
}

function closeLogin() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.classList.remove("show");
    }
}


/* =========================================
   تسجيل الدخول
========================================= */

function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showToast("يرجى إدخال جميع البيانات", "⚠️");
        return;
    }

    currentUser.loggedIn = true;
    currentUser.email = email;
    currentUser.name = email.split("@")[0];

    closeLogin();
    showToast("تم تسجيل الدخول بنجاح", "✓");
    updateNavigation();
}


/* =========================================
   تحديث زر تسجيل الدخول
========================================= */

function updateNavigation() {
    const loginButton = document.querySelector(".login-btn");

    if (!loginButton) {
        return;
    }

    if (currentUser.loggedIn) {
        loginButton.textContent = currentUser.name;
    } else {
        loginButton.textContent = "تسجيل الدخول";
    }
}


/* =========================================
   فتح واغلاق إضافة خدمة
========================================= */

function openAddService() {
    const modal = document.getElementById("serviceModal");
    if (modal) {
        modal.classList.add("show");
    }
}

function closeAddService() {
    const modal = document.getElementById("serviceModal");
    if (modal) {
        modal.classList.remove("show");
    }
}


/* =========================================
   إضافة خدمة جديدة (النسخة المحدثة)
========================================= */

function addService(event) {
    event.preventDefault();

    const nameInput = document.getElementById("serviceName");
    const categoryInput = document.getElementById("serviceCategory");
    const descriptionInput = document.getElementById("serviceDescription");
    const hoursInput = document.getElementById("serviceHours");

    if (!nameInput || !categoryInput || !descriptionInput || !hoursInput) {
        showToast("عذراً، حقول نموذج إضافة الخدمة غير متطابقة", "⚠️");
        return;
    }

    const name = nameInput.value.trim();
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();
    const hours = Number(hoursInput.value);

    if (!name || !category || !description || !hours) {
        showToast("يرجى تعبئة جميع البيانات", "⚠️");
        return;
    }

    if (hours <= 0) {
        showToast("عدد الساعات يجب أن يكون أكبر من صفر", "⚠️");
        return;
    }

    const newService = {
        name: name,
        category: category,
        description: description,
        hours: hours,
        user: currentUser.name || "مستخدم جديد",
        rating: 5.0
    };

    services.push(newService);

    saveData();
    renderService(newService);
    closeAddService();

    nameInput.value = "";
    categoryInput.value = "";
    descriptionInput.value = "";
    hoursInput.value = "";

    updateStatistics();
    showToast("تمت إضافة خدمتك بنجاح", "✓");
}


/* =========================================
   إنشاء بطاقة خدمة
========================================= */

function renderService(service) {
    const grid = document.getElementById("servicesGrid");

    if (!grid) {
        return;
    }

    const article = document.createElement("article");

    article.className = "service-card";
    article.dataset.category = service.category;
    article.dataset.name = service.name;

    const categoryName = getCategoryName(service.category);
    const icon = getCategoryIcon(service.category);

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
                <button onclick="requestService('${escapeAttribute(service.name)}', ${service.hours})">
                    طلب الخدمة
                </button>
            </div>
        </div>
    `;

    grid.appendChild(article);
}


/* =========================================
   أسماء وأيقونات التصنيفات
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
   تصفية والبحث في الخدمات
========================================= */

function filterServices(category, button) {
    const cards = document.querySelectorAll(".service-card");
    const buttons = document.querySelectorAll(".category");

    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    let visibleCards = 0;

    cards.forEach(function (card) {
        const cardCategory = card.dataset.category;

        if (category === "all" || cardCategory === category) {
            card.style.display = "";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    updateNoResults(visibleCards);
}

function searchServices() {
    const input = document.getElementById("searchInput");

    if (!input) {
        return;
    }

    const search = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".service-card");
    let visibleCards = 0;

    cards.forEach(function (card) {
        const name = card.dataset.name.toLowerCase();
        const text = card.textContent.toLowerCase();

        if (name.includes(search) || text.includes(search)) {
            card.style.display = "";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    updateNoResults(visibleCards);
}

function updateNoResults(count) {
    const noResults = document.getElementById("noResults");

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
        showToast("سجلي الدخول أولاً لطلب الخدمة", "🔐");
        openLogin();
        return;
    }

    if (currentUser.hours < hours) {
        showToast("رصيدك لا يكفي لهذه الخدمة", "⚠️");
        return;
    }

    const confirmation = confirm("هل تريدين طلب خدمة:\n\n" + serviceName + "\n\nالتكلفة: " + hours + " ساعات؟");

    if (!confirmation) {
        return;
    }

    currentUser.hours -= hours;
    updateHours();
    showToast("تم طلب الخدمة بنجاح", "✓");
    saveData();
}


/* =========================================
   Toast Notification
========================================= */

function showToast(message, icon = "✓") {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    if (!toast) {
        return;
    }

    toastMessage.textContent = message;
    toastIcon.textContent = icon;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


/* =========================================
   إغلاق النوافذ عند النقر خارجها أو ضغط ESC
========================================= */

window.addEventListener("click", function (event) {
    const loginModal = document.getElementById("loginModal");
    const serviceModal = document.getElementById("serviceModal");

    if (event.target === loginModal) {
        closeLogin();
    }
    if (event.target === serviceModal) {
        closeAddService();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLogin();
        closeAddService();
    }
});


/* =========================================
   إنشاء حساب - نسخة تجريبية
========================================= */

function openRegister() {
    closeLogin();
    showToast("سيتم إضافة صفحة إنشاء الحساب لاحقًا", "ℹ️");
}


/* =========================================
   حفظ وتحميل البيانات في المتصفح
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

function loadSavedData() {
    const saved = localStorage.getItem("skillsWarehouseData");

    if (!saved) {
        return;
    }

    try {
        const data = JSON.parse(saved);

        if (data.currentUser) {
            currentUser = data.currentUser;
        }

        updateHours();
        updateNavigation();
    } catch (error) {
        console.log("تعذر تحميل البيانات.");
    }
}


/* =========================================
   دوال مساعدة (نصوص وحماية)
========================================= */

function getFirstLetter(name) {
    if (!name) {
        return "؟";
    }
    return name.trim().charAt(0);
}

function escapeHTML(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeAttribute(text) {
    return String(text)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, "&quot;");
}


/* =========================================
   إدارة روابط الملف الشخصي
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.view-profile-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const filePath = this.getAttribute('data-file');
            
            if (filePath) {
                window.location.href = filePath;
            } else {
                alert('عذراً، مسار الملف غير موجود!');
            }
        });
    });
});


/* =========================================
   رسالة ترحيب أولية
========================================= */

setTimeout(function () {
    showToast("أهلًا بك في مِستودع المهارات 👋", "✦");
}, 1000);
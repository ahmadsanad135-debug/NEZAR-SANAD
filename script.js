// تسجيل Service Worker لتحويل الموقع إلى تطبيق
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('تم تسجيل التطبيق بنجاح', reg))
            .catch(err => console.log('فشل تسجيل التطبيق', err));
    });
}

// منطق زر تحميل التطبيق
let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const installBtn = document.getElementById('install-btn');
const closeBtn = document.getElementById('close-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    // منع ظهور رسالة المتصفح الافتراضية
    e.preventDefault();
    // حفظ الحدث لاستخدامه لاحقاً
    deferredPrompt = e;
    // إظهار نافذتنا المخصصة
    installBanner.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
    installBanner.classList.add('hidden');
    if (deferredPrompt) {
        // إظهار نافذة التثبيت الخاصة بالنظام
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`نتيجة التثبيت: ${outcome}`);
        deferredPrompt = null;
    }
});

closeBtn.addEventListener('click', () => {
    installBanner.classList.add('hidden');
});

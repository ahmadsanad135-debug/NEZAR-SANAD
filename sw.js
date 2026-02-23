const CACHE_NAME = 'english-app-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/grammar.html',
  '/vocabulary.html',
  '/listening.html',
  '/quiz.html',
  '/audio/6MinuteEnglish-20260122-ScaredToSpeakEnglish.mp3',
  '/audio/6MinuteEnglish-20260212-ArtisticSwimming.mp3',
  '/audio/6MinuteEnglish-20260219-DreamingOfBeingAChef.mp3'
];

// تثبيت التطبيق وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// جلب الملفات من الذاكرة في حال انقطاع الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

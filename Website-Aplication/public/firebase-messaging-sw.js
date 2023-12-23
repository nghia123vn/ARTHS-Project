// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

console.log("Initializing Firebase in Service Worker");
// eslint-disable-next-line no-undef
firebase.initializeApp({
    apiKey: "AIzaSyDnkqYy8kwHUnQTyBRD5b9BuhdF5pUFPPw",
    authDomain: "arths-45678.firebaseapp.com",
    projectId: "arths-45678",
    storageBucket: "arths-45678.appspot.com",
    messagingSenderId: "935863172768",
    appId: "1:935863172768:web:5335c8bddd461aaf5fd3c5",
    measurementId: "G-D66DNWP5M0"
});
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message", payload);

    // Xử lý thông báo và hiển thị nó ngay trên trang
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/assets/icon.jpeg',
        data: payload.data
    };

    // Thông báo cho trang web bằng cách sử dụng postMessage
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'show_notification',
                title: notificationTitle,
                options: notificationOptions
            });
        });
    });
});

// Lắng nghe sự kiện từ trang web
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'notification_clicked') {
        // Xử lý khi người dùng click vào thông báo
        console.log('Notification clicked from the page:', event.data.link);
    }
});

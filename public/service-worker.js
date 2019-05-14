/*eslint-disable */

const BASEURL = require('../src/plugins/api.config')

self.addEventListener('install', event => {
    console.log('V1 installing…');
  
  });
  
  self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
  });
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  });
self.addEventListener('notificationclick', function(event) {
    // Normal click
    if (!event.action) {
        event.notification.close();
        var urlToOpen = new URL(`http://${BASEURL.URL}:8080/class/${event.notification.data.classCode}/question`, self.location.origin).href;

        var promiseChain = clients.matchAll({ 
            type: 'window',
            includeUncontrolled: true // 현재 서비스워커 이외의 다른 서비스워커가 제어하는 탭들 포함
        })
        .then((windowClients) => {
        // windowClients 는 현재 열린 탭들
        var matchingClient = null;

        for (var i = 0; i < windowClients.length; i++) {
            var windowClient = windowClients[i];
            if (windowClient.url === urlToOpen) {
            matchingClient = windowClient;
            break;
            }
        }

        if (matchingClient) {
            return matchingClient.focus();
        } else {
            return clients.openWindow(urlToOpen);
        }
        });
        event.waitUntil(promiseChain);
    }
    switch(event.action){
        case 'new-action':
            let  promiseChain = clients.openWindow(`http://${BASEURL}:8080/class/${event.notification.data.classCode}/question`);
            event.waitUntil(promiseChain);
            break;
        case 'off-action':
            console.log("알림 설정 on off 추가 할 것")
            break;
    }
  });

self.addEventListener('notificationclose', function(event) {
    event.notification.close()
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    
    console.log('Closed notification: ' + primaryKey);
});

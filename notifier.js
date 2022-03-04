// const notifier = require('node-notifier');
// const path = require('path');

// notifier.notify(
//   {
//     title: 'Order Placed',
//     message: 'Order Confirmed Pleae go to your order',
//     icon: 'public/img/placed.jpg',
//     sound: true,
//     wait: true,
//     timeout:2500000000,
//     open: 'pizzaeat.herokuapp.com'  
//   }
// );

// notifier.on('click', function (notifierObject, options, event) {
//   // Triggers if `wait: true` and user clicks notification
// });

// notifier.on('timeout', function (notifierObject, options) {
//   // Triggers if `wait: true` and notification closes
// });

//////////////////////////////////////////////


    const { FCM } = require('push-notification-node');
 
    const GOOGLE_KEY = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDXS1BPjxmFppMO\ndu5cJOmD3fsZlwJXCILKPfapZMXJjVeJph8WOs0s1uBnIqBxOxcr6asrYmp5nCRM\nQOWSN+EdyCrP2fSWp6bOo9Gnr1kgV0p0TqbKg+qYRXlcTg+f4W/5m6ms0zX6ML6N\nmY2KH3FgXX0wvlR1HHTTXrvL2fI3vu/4W9KGzbmyH43Z2yY6Xn7A8ofSw5jQIkA3\n2cjlHU3XOvsGd/Zo0njxPoJowbt32n5YQ3618K8kaKbTw27HYjs4UfTbB4YLIhkz\n+2rJ4q0RrD+w3OkPEtNqqpcLhN4l5h/Bn1oqfT+nEW8AKz8EHtVl6TGslpFOR30+\nGfIN5ADRAgMBAAECggEAMCODKNLkoEVzZr3RhLFtNELHcTyadZbt1aY+t7gUYIF1\n1A2csFYEB/Vg1jbAHKlbgEJed1QpXhk7ZYByRHwxnfzik7iWj7QbYGNxTrburQRP\nnctzUF9oLlWEcg7zP+rCpJN5gC72yAMrrFIr+3kV2vf0dNht3oS3G4b4YzePiQaD\nqAhHLs87DUpHZ6nsgHrvAT30/oqDfICuz39eN37QDrmilu+huX8CTkzKmRgVO3Hk\nrywzbuu9CZ0nTl+PFjjcIA0ncMH9wSQFZdrep4p/CmSFk+4cLBRlxDl7Pz8/ihyB\nct6GDf3UuffaXrRS7JKNdm+ZYGGXxvNaFphl1A3SpQKBgQDzZFQidilp8rbi8jdh\nFREW0VE3RmMQ2bUpo3L5wrm0uhp8huDYuVX7ZYB7sCB4OHG2NbIRKFZFE95oNVxm\n06aOepsTjDv8Pt8D2uuUUfvQA5qHgZzz3zlO4kWfupJcHwPHochZTn0ho3DLs+Gp\ngwwJX72VP08PdvPQk9GV4SPSjQKBgQDicmAXMEA2E0R5qHnPDYbkHRZqc7Eh7MDp\nhYb2kPx+d5QYjSbebLUwK6bPfNcd5YCifHYsSae+ngaQ/2yQu3w3ySpX6IgaqAC0\nqai5x6maj92HUDL/Zi4Q7YGLAwFaM8f1j6tzwAdazwUP7wrr5jCWQrYZNMlWKmBs\nJ2ykXsF4VQKBgQDJHSjsROkZk6YNRwn9nVO+n/1VCENJpCsvGdEikgWzUWgbZ7QZ\nQKPMlGWjTri1viYv4pSd2s/WSoGnaBhPGypwZt0HPQQ//Y939whcSZYinyesOqx/\nUv9esFfJkXfoyPPtnEAZk2KQTiYhHCUmVZO3lzXnQiXI6Ii027/98cgQ7QKBgEnj\nGAd47vq1/rnThytQNptoAlBpv3paTffkYc1CMaDyU5hPNkeNIPG+zIcXLPnMUNSz\n17tLrTg9R9c4AKyZAEcTlIVqkj5gYxqP4UX9KBIOrzHfsUQ0iwNq+8HoESDllHFD\nl6YFGmE++1/fl6ixS1k8Gz7OQoOjACNKGeDoKiihAoGBAO4QBfwlPv9+NkIA8M3L\nsxYDNkqDYv+3anw+Fm7Fqh7kuY5IJ5KbMpT90kZjYKupX9n4LgMIQmystOhR7TYr\nu4Nt/beybRzt3+HkYVqFaHyHq/RQeHOx+HnS9TbqMmX+2SLCcvPC68V7abtvV6wk\nQQbE8Fjn6r6oAB9C7k/63FjV\n'; //put your server key here
    const token = 'DEVICETOKEN'; // device token from the app provide by the fcm
 
    const data = { //this may vary according to the message type (single recipient, multicast, etc)
        body: 'hello world',
        title: 'your message',
        notificationCode: 1,
         data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    }; // message object
 
    const fcm = new FCM(GOOGLE_KEY); // set the google key
 
    fcm.sendPromise(token, data).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });


var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

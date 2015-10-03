ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1646535828927717',
    secret: 'f0e4c399570193b491e5a7064ee219fa'
});
// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "598583961114-dk6aq99kio4ush1plealqd9f1vn27bgv.apps.googleusercontent.com",
  secret: "hzkbj5wKsrLKxdYkdq33rAto"
});

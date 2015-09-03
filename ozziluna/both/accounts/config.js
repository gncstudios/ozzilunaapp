AccountsTemplates.configureRoute('signIn', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('signUp', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});

AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 1,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  }
]);
AccountsTemplates.configure({
    reCaptcha: {
        siteKey: '6LcgFAwTAAAAAKKECPlVQKz5jScJ3zoYQK7hwWPW',
        theme: "light",
        data_type: "image"
    },
    showReCaptcha: true
});
// This worked. look here: https://github.com/nate-strauser/accounts-templates-core#configuration-api
AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    re: new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"),
    errStr: 'At least 1 digit, 1 lower-case and 1 upper-case',
});

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
      // ...
    }
    if (state === "signUp") {
      console.log("Siged up, inserting into dogs database");
      Dogs.insert({username: Meteor.user().username})
    }
  }
};
AccountsTemplates.configure({
    onSubmitHook: mySubmitFunc
});

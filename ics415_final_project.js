Passwords = new Mongo.Collection("passwords");

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/passwords');
Router.route('/about');

if (Meteor.isClient) {

  Meteor.subscribe("passwords");

  Session.setDefault('pwd', "");

  Template.home.helpers({
    password: function () {
      return Session.get('pwd');
    }
  });

  Template.passwords.helpers({
    passwords: function () {
      return Passwords.find({});
    }
  });

  Template.home.events({
    'click #generate': function () {
      Session.set('pwd', Random.id(16));
    },
    'click #save': function () {
      Meteor.call("addPassword", Session.get('pwd'));
    }
  });

  Template.password.events({
    "click .delete": function () {
      Meteor.call("deletePassword", this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addPassword: function (pwd) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (pwd != "") {
      var pwdId = Passwords.insert({
        text: pwd,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
      Session.set('pwd', "");
    }
  },
  deletePassword: function (pwdId) {
    Passwords.remove(pwdId);
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("passwords", function () {
    return Passwords.find({owner:this.userId});
  });
}

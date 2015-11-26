if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    technologies: [
      { text: "Meteor" },
      { text: "AngularJS" },
      { text: "Blaze" },
      { text: "MongoDB"},
      { text: "LiveQuery"}
    ]
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  if (page.id === 'commentsPage') {
    if (!document.querySelector('#commentsPage ons-list-item')) {
      myApp.services.comments.get().then(function(comments) {
        var sorted = comments.sort(function(a, b) {
          if (a.ts < b.ts) {
            return 1;
          }
          else if (a.ts > b.ts) {
            return -1;
          }
          else {
            return 0;
          }
        })
        sorted.forEach(function(data) {
          myApp.services.comments.create(data);
        });
      })
    }
  }
});

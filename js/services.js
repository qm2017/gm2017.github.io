var host = 'https://api.z8it.com'

myApp.services = {
  petition: {
    sign: function(data) {
      return $.post(host + '/api/sign', {
        name: data.name,
        org: data.org,
        comment: data.comment
      }, function(json) {
        return json;
      });
    },

    showQR: function() {
      var item = ons.createElement(
        '<div>' +
          '<ons-list-title>签名成功!</ons-list-title>' +
          '<ons-list>' +
            '<ons-list-item style="display:table;">' +
              '<div class="list-item__center">' +
                '<span style="text-align:center;">谢谢您的爱心关注和签名!</span>' +
                '<img src="images/heart.png" style="width:100%; height:auto;" />' +
              '</div>' +
            '</ons-list-item>' +
          '</ons-list>' +
        '</div>'
      );
      var qr = document.querySelector('#qr');
      qr.insertBefore(item, qr.firstChild);
    }
  },

  comments: {
    create: function(data) {
      var item = ons.createElement(
        '<ons-list-item modifier="longdivider" style="display:table;">' +
          '<div class="center">' +
          '<span class="list-item__title">' +
          data.comment +
          '</span>' +
          '<span class="list-item__subtitle">' +
          data.name +
          ' ' +
          myApp.services.getDate(data.ts) +
          '</span>' +
          '</div>' +
          '</ons-list-item>',
      );

      var commentsList = document.querySelector('#comments-list');
      commentsList.insertBefore(item, commentsList.firstChild);
    },

    get: function() {
      return $.get(host + '/api/comments', function(json) {
        return json;
      });
    },

    save: function(data) {
      return $.post(
        host + '/api/comments',
        {
          name: data.name,
          comment: data.comment,
        },
        function(json) {
          data.ts = new Date().getTime();
          myApp.services.comments.create(data);
          return json;
        },
      )
    },
  },

  getDate: function(date) {
    var d = new Date(date);
    var mon = d.getMonth() + 1;
    return (
      d.getFullYear() +
      '-' +
      mon +
      '-' +
      d.getDate() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes()
    );
  },
}

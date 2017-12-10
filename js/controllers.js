myApp.controllers = {
  tabbarPage: function(page) {
    page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  homePage: function(page) {
    page.querySelector('[component="button/sign"]').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/sign.html');
    };        
    page.querySelector('[component="button/comment"]').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/comment.html');
    };  
  },

  commentPage: function(page) {
    page.querySelector('[component="button/save"]').onclick = function() {
      var name = page.querySelector('#name-input').value;
      var comment = page.querySelector('#comment-input').value;

      if (name && comment) {
        myApp.services.comments.save(
          {
            name: name,
            comment: comment
          }
        ).then(function(result) {
          ons.notification.alert('谢谢您的留言!');
        })
        .catch(function(err) {
          ons.notification.alert('对不起， 出了点儿错。请再试一下');
        });
      } 
      else {
        var msg = '';

        if (!name || name === '')
          msg += '个人信息'; 

        if (!org || org === '') {
          if (msg === '')
            msg += '留言';
          else
            msg += '和留言';
        }

        ons.notification.alert('请填写' + msg);
      }
    };
  },

  signPage: function(page) {
    page.querySelector('[component="button/save"]').onclick = function() {
      var name = page.querySelector('#name-input').value;
      var org = page.querySelector('#org-input').value;
      var comment = page.querySelector('#comment-input').value;

      if (name && org) {
        myApp.services.petition.sign(
          {
            name: name,
            org: org,
            comment: comment
          }
        ).then(function(result) {
          page.querySelector('[component="button/save"]').disabled = true;
          myApp.services.petition.showQR();
        })
        .catch(function(err) {
          ons.notification.alert('对不起， 出了点儿错。请再试一下');
        });
      } 
      else {
        var msg = '';

        if (!name || name === '')
          msg += '姓名'; 

        if (!org || org === '') {
          if (msg === '')
            msg += '省市职业或院校';
          else
            msg += '和省市职业或院校';
        }

        ons.notification.alert('请填写' + msg);
      }
    };
  }
}
  

$(function() {
  var search_result = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
      search_result.append(html);
  }
  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user">
                  <p class="chat-group-user__name">
                    ${ msg }
                  </p>
                </div>`
    search_result.append(html);
  }
  function buildHTML(user_id, user_name) {
    var html = `<div class="chat-group-user clearfix" id=${user_id}>
                  <input type="hidden" name="group[user_ids][]" value="${user_id}">
                  <p class="chat-group-user__name ">${user_name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id="${user_id}">削除</a>
                </div>`
    return html
  }
$("#user-search-field").on("keyup", function() {
  var input = $("#user-search-field").val();
  var preword = ''
  $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
  })
  .done(function(users) {
    $("#user-search-result").empty();
    if (users.length !==0 && preword !== input) {
      users.forEach(function(user){
        appendUser(user);
        preword = input
      });
    }
    else {
      $("#user-search-result").empty();
      appendErrMsgToHTML("一致する名前はありません");
    }
  })
  .fail(function() {
    alert('ユーザー検索に失敗しました')
  })
});
$(document).on('click', '.user-search-add', function(){
  var user_id = $(this).attr('data-user-id');
  var user_name = $(this).attr('data-user-name');
  var insertHTML = buildHTML(user_id, user_name);
  $('.chat-group-users').append(insertHTML);
  $(this).parent().remove();
});

$(".chat-group-users").on('click','.user-search-remove', function() {
  $(this).parent().remove();
 
});
});


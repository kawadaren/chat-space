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
    var html = `<li>
                <div class='user-search-add'>${ msg }</div>
                </li>`
    search_result.append(html);
  }
  function buildHTML(id, name) {
    var html = `<div class="chat-group-user clearfix" id=chat-group-user-${id}>
                  <input type="hidden" name="group[user_ids][]" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}">削除</a>
                </div>`
    return html
  }
$("#user-search-field").on("keyup", function() {
  var input = $("#user-search-field").val();
  $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
  })
  .done(function(users) {
    $("#user-search-result").empty();
    if (users.length !==0) {
      users.forEach(function(user){
        appendUser(user);
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
  var id = $(this).data('user-id');
  var name = $(this).data('user-name');
  var insertHTML = buildHTML(id, name);
  $('.chat-group-users').append(insertHTML);
  $(this).parent('.chat-group-user').remove();
});

$(".chat-group-users").on('click', '.user-search-remove', function() {
  var id = $(this).data('user-id');
  $(`#chat-group-user-${id}`).remove();
});
});



AddSRModeBtn = $('<span id="add-sr-mode-btn" class="btn btn-sm btn-default" title="Открыть форму для добавления"><img src="https://sovetromantica.com/favicon.ico?sovet2chantica" style="height: 12px"/></span>').insertAfter("#showmediaurl").on("click", function() {
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success').html('<span title="Закрыть форму"><img src="https://sovetromantica.com/favicon.ico?sovet2chantica" style="height: 14px"/></span>');
$('#prompt-form').remove();
$('<form id="sr-form"><div id="prompt-message"></div><input name="text" type="text" class="form-control" placeholder="Ссылка"></br><input name="title" type="text" class="form-control" placeholder="Название"></br><input name="seriebegin" type="text" class="form-control" placeholder="Начальная серия"></br><input name="serieend" type="text" class="form-control" placeholder="Конечная серия"></br><input type="submit" value="ОК" class="btn btn-sm btn-default"><input type="button" name="cancel" value="Отмена" class="btn btn-sm btn-default"></form>').appendTo('#leftpane');
let asrmTitle = '<center><strong><font color="red">Форма для добавления аниме сериалов с сайта</font></br><a href="https://sovetromantica.com/" target="_blank">Sovet Romantica</a></strong></center>';
showPrompt(asrmTitle,function(value,value1,value2,value3){
    alert("Ссылка: "+value+" Название: "+value1+" Начало: "+value2+" Конец: "+value3);
});
 
function showPrompt(text,callback) {
  let form = document.getElementById('sr-form');
  document.getElementById('prompt-message').innerHTML = text;
 
  form.text.value = '';
  form.title.value = '';
  form.seriebegin.value = '';
  form.serieend.value = '';
 
 
  form.elements.text.focus();
 
  form.onsubmit = function() {
    let value = form.text.value;
    let value1 = form.title.value;
    console.log(value1);
    let value2 =  form.seriebegin.value;
    let value3 = form.serieend.value;
    if (value == '') return false; // игнорируем отправку пустой формы
    if (value1 == '') return false;
    if (value2 == '') return false;
    if (value3 == '') return false;
    //if (value3 < value2) value3=value2++;
    complete(value,value1,value2,value3);
    return false;
  };
 
  form.cancel.onclick = function() {
    complete(null,null,null,null);
  };
 
  function complete(value, value1, value2, value3) {
    console.log(value1);
    document.onkeydown = null;
    callback(value,value1,value2,value3);
 
    function postlinks() {
      var x = value2;
      var stuplink = value;
      function myLoop (){
        setTimeout(function () {
          var link = stuplink+x+".mp4";
          var name = value1+' '+x+' серия';
          socket.emit("queue", {id: link,title: name,pos: 'end',type: 'fi',temp: $(".add-temp").prop("checked")});
          x++;
          if (x <= value3){
          myLoop();
          }
        }, 1000)
      };
      myLoop();
    };
    postlinks();
  };
 
  document.onkeydown = function(e) {
      if (e.key == 'Escape') {
        complete(null,null,null,null);
      }
    };
 
    let lastElem = form.elements[form.elements.length - 1];
    let firstElem = form.elements[0];
 
    lastElem.onkeydown = function(e) {
      if (e.key == 'Tab' && !e.shiftKey) {
        firstElem.focus();
        return false;
      }
    };
}

} else {
$(this).removeClass('btn-success').html('<span title="Открыть форму для добавления"><img src="https://sovetromantica.com/favicon.ico?sovet2chantica" style="height: 12px"/></span>');
$('#prompt-form').remove();
$('#sr-form').remove();}
  });

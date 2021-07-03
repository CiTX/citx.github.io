if (navigator.appName == "Netscape") { 
 layerRef="document.layers";  
 styleSwitch=""; 
 brouz="n"; 
}
else { 
 layerRef="document.all"; 
 styleSwitch=".style"; 
 brouz="ie"; 
}

gameStat = 0; //0-нет игры, 1-мы отбиваем, 2-комп отбивает

btn0 = new Image(100, 30);
btn0.src = "img/get_0.gif";
btn1 = new Image(100, 30);
btn1.src = "img/get_1.gif";
btn2 = new Image(100, 30);
btn2.src = "img/vse_0.gif";
btn3 = new Image(100, 30);
btn3.src = "img/vse_1.gif";

cardback = new Image(71, 96);
cardback.src = "img/back.gif";
var cards = new Array();
var kozyrs = new Array();

var computer = new Array();
var computerCnt = 0; //число карт компа
var human = new Array();
var humanCnt = 0; //число карт человека
var coloda = new Array();
var lastCard = -1; //последняя карта
var kozyr = -1; //масть козыря
var work = new Array();
var tmpwork = new Array();
var lastWork = 0; //последняя карта на кону
var winCount=0,drawCount=0,fallCount=0,firstTurn=0;
var tab=new Array (5);

if (brouz == "n") { 
 eval(layerRef+'["coloda"].document.images[0].src = cardback.src'); 
}
else { document.images.icoloda.src = cardback.src; }

for (var i = 0; i < 36; i++) {
 cards[i] = new Image(71, 96);
 cards[i].src = "img/" + i + ".gif";
}
for (var i = 0; i < 4; i++) {
 kozyrs[i] = new Image(39, 39);
 kozyrs[i].src = "img/k" + i + ".gif";
}

function cardToH(card) { //карту человеку
 if (card >= 0) human[humanCnt++] = card;
}

function cardToC(card) { //карту компу
 if (card >= 0) computer[computerCnt++] = card;
}

function showBtn(stat) { //щелчок по кнопке
 if (gameStat == 1) {
  if (brouz == "n") {
   if (stat == 0) { document.layers.btn.document.images[0].src = btn0.src; }
   else { document.layers.btn.document.images[0].src = btn1.src; }
  } 
  else {
   if (stat == 0) { document.images.ibtn.src = btn0.src; }
   else { document.images.ibtn.src = btn1.src; }
  }
 }
 else if (gameStat == 2) {
  if (brouz == "n") {
   if (stat == 0) eval(layerRef+'["btn"].document.images[0].src = btn2.src');
   else eval(layerRef+'["btn"].document.images[0].src = btn3.src');
  } 
  else {
   if (stat == 0) document.images.ibtn.src = btn2.src;
   else document.images.ibtn.src = btn3.src;
  }
 }
}

function showCardUp(num) { //наведение мыши на карту
 if (gameStat == 0) return;
 eval(layerRef+'["cardh" + num].top = 267');
}

function showCardDown(num) { //показать карту внизу
 eval(layerRef+'["cardh" + num].top = 277');
}

function showWorkCards() { //показать рабочие карты
 for (var i = 0; i < 12; i++) {
  if (work[i] >= 0) {
   if (brouz == "n") { eval(layerRef+'["cardw" + i].document.images[0].src = cards[work[i]].src'); }
   else { document.images["icardw" + i].src = cards[work[i]].src; }
   eval(layerRef+'["cardw" + i]'+styleSwitch+'.visibility = "visible"');
  }
  else eval(layerRef+'["cardw" + i]'+styleSwitch+'.visibility = "hidden"');
 }
 if (work[0] < 0) eval(layerRef+'["btn"]'+styleSwitch+'.visibility = "hidden"');
 else {
  showBtn(0);
  eval(layerRef+'["btn"]'+styleSwitch+'.visibility = "visible"');
 }
}

function sortCompCards() { //сортировать карты компа
 var tc = 0;
 var i = 0;
 var i1 = 0;
 var c = 0;
 for (i = 0; i < 36; i++) {
  if (computer[i] >= 0) {
   if (i != tc) {
    computer[tc] = computer[i];
    computer[i] = -1;
   }
   tc++;
  }
 }
 tc--;
 for (i = tc; i > 0; i--) {
  for (i1 = 0; i1 < i; i1++) {
   if (convCard(computer[i1]) > convCard(computer[i1 + 1])) {
    c = computer[i1];
    computer[i1] = computer[i1 + 1];
    computer[i1 + 1] = c;
   }
  }
 }
}

function showCompCards() { //показать карты компа
 var i = 0;
 sortCompCards();
 for (i = 0; i < computerCnt; i++) {
  eval(layerRef+'["cardc" + i]'+styleSwitch+'.visibility = "visible"');
 }
 for (i; i < 36; i++) eval(layerRef+'["cardc" + i]'+styleSwitch+'.visibility = "hidden"');
//!!!debug
// for (i = 0; i < computerCnt; i++) {
//  if (brouz == "n") { eval(layerRef+'["cardc" + i].document.images[0].src = cards[computer[i]].src'); }
//  else { document.images["icardc" + i].src = cards[computer[i]].src; }
// }
//!!!
}

function convCard(num) { //преобразовать номер с учетом козырей
 var mast = Math.floor(num / 9);
 if (mast == kozyr) return (num % 9) + 36;
 else return (mast + (num % 9) * 4);
}

function sortHumanCards() { //сортировать карты человека
 var tc = 0;
 var i = 0;
 var i1 = 0;
 var c = 0;
 for (i = 0; i < 36; i++) {
  if (human[i] >= 0) {
   if (i != tc) {
    human[tc] = human[i];
    human[i] = -1;
   }
   tc++;
  }
 }
 tc--;
 for (i = tc; i > 0; i--) {
  for (i1 = 0; i1 < i; i1++) {
   if (convCard(human[i1]) > convCard(human[i1 + 1])) {
    c = human[i1];
    human[i1] = human[i1 + 1];
    human[i1 + 1] = c;
   }
  }
 }
}

function showHumanCards() { //показать карты человека
 var i = 0;
 sortHumanCards();
 for (i = 35; i >= humanCnt; i--) eval(layerRef+'["cardh" + i]'+styleSwitch+'.visibility = "hidden"');
 for (i; i >= 0; i--) {
  if (brouz == "n") { eval(layerRef+'["cardh" + i].document.images[0].src = cards[human[i]].src'); }
  else { document.images["icardh" + i].src = cards[human[i]].src; }
  eval(layerRef+'["cardh" + i]'+styleSwitch+'.visibility = "visible"');
 }
}

function  showLastCard() { //показать, сколько карт осталось
 var l=lastCard+1;
 if (l<0) l=0;
 document.Q.c4.value = 'В колоде: '+ l;
}

function showColoda() { //показать колоду
 if (lastCard < 0) {
  eval(layerRef+'["kozyr"]'+styleSwitch+'.visibility = "hidden"');
  eval(layerRef+'["coloda"]'+styleSwitch+'.visibility = "hidden"');
  if (brouz == "n") { eval(layerRef+'["zkozyr"].document.images[0].src = kozyrs[kozyr].src'); }
  else { document.images.izkozyr.src = kozyrs[kozyr].src; }
  eval(layerRef+'["zkozyr"]'+styleSwitch+'.visibility = "visible"');
 }
 else if (lastCard == 0) {
  eval(layerRef+'["zkozyr"]'+styleSwitch+'.visibility = "hidden"');
  eval(layerRef+'["coloda"]'+styleSwitch+'.visibility = "hidden"');
  if (brouz == "n") { eval(layerRef+'["kozyr"].document.images[0].src = cards[coloda[0]].src'); }
  else { document.images.ikozyr.src = cards[coloda[0]].src; }
  eval(layerRef+'["kozyr"]'+styleSwitch+'.visibility = "visible"');
 }
 else {
  eval(layerRef+'["zkozyr"]'+styleSwitch+'.visibility = "hidden"');
  if (brouz == "n") { eval(layerRef+'["kozyr"].document.images[0].src = cards[coloda[0]].src'); }
  else { document.images.ikozyr.src = cards[coloda[0]].src }
  eval(layerRef+'["kozyr"]'+styleSwitch+'.visibility = "visible"');
  eval(layerRef+'["coloda"]'+styleSwitch+'.visibility = "visible"');
 }
}

function sdatCards() { //сдать карты
 if (gameStat == 1) {
  while ((computerCnt < 6) && (lastCard >= 0)) cardToC(coloda[lastCard--]);
  while ((humanCnt < 6) && (lastCard >= 0)) cardToH(coloda[lastCard--]);
 }
 else {
  while ((humanCnt < 6) && (lastCard >= 0)) cardToH(coloda[lastCard--]);
  while ((computerCnt < 6) && (lastCard >= 0)) cardToC(coloda[lastCard--]);
 }
 showLastCard();
}

function checkEnd() { //проверить на окончание
 return (lastCard < 0) && ((humanCnt == 0) || (computerCnt == 0));
}

function commonCount() {
 document.Q.c1.value = 'Выигрыши: ' + winCount;
 document.Q.c2.value = 'Ничьи: '+ drawCount;
 document.Q.c3.value = 'Проигрыши: '+ fallCount;
}

function clearWork() { //основной ход
 //очистить кон
 for (var i = 0; i < 12; i++) {
  tmpwork[i]=work[i];
  work[i] = -1;
 }
 lastWork = 0;
 showWorkCards();

 //следующие карты
 sdatCards();
 showColoda();
 showHumanCards();
 showCompCards();

 //проверить на окончание
 if (checkEnd()) {
  gameStat = 0;
  showBtn(0);
  for (var i = 0; i < 12; i++) work[i] = tmpwork[i];
  showWorkCards();
  if ((humanCnt == 0) && (computerCnt == 0)) {
   alert("Ничья!");
   drawCount++; commonCount();
   firstTurn=0;
   gameInit(0);
  }
  else if (humanCnt == 0) {
   for (i = 0; i < computerCnt; i++) {
    if (brouz == "n") { eval(layerRef+'["cardc" + i].document.images[0].src = cards[computer[i]].src'); }
    else { document.images["icardc" + i].src = cards[computer[i]].src; }
   }
   showCompCards();
   alert("Вы выиграли!");
   winCount++; commonCount();
   firstTurn=2;
   gameInit(2);
  }
  else if (computerCnt == 0) {
   alert("Вы проиграли!");
   fallCount++; commonCount();
   firstTurn=1;
   gameInit(1);
  }
  return false;
 }
 return true;
}

function checkWork() {
 if (work[10] >= 0) if (clearWork()) {
  gameStat = 3 - gameStat;
  if (gameStat == 1) compHod();
  return false;
 }
 return true;
}

function compMinCard(mast, mincard) { //минимальная карта компа
 var mc = 0;
 var i = 0;
 if (mast >= 0) {
  mc = -1;
  for (i = 0; i < computerCnt; i++) if ((Math.floor(computer[i] / 9) == mast) && ((computer[i] % 9) > mincard)) {
   mc = i;
   break;
  }
  if ((mc < 0) && (mast != kozyr)) mc = compMinCard(kozyr, -1);
 }
 return mc;
}

/*function canBeat(num) { //можно ли бить картой num карту lastWork
 var c = work[lastWork * 2];
 if (c < 0) return false;
 if (Math.floor(num / 9) == Math.floor(c / 9)) return (num % 9) > (c % 9);
 else return Math.floor(num / 9) == kozyr;
}*/

function allBeat() { //все на кону бито?
 var r = true;
 for (var i = 0; i < lastWork; i++) if (work[i * 2 + 1] < 0) { r = false; break; }
 return r;
}

function getHod() { //сбросить карты с кона компу
 for (var i = 0; i < 12; i++) if (work[i] >= 0) cardToC(work[i]);
 clearWork();
}

function clickBtn() { //щелчок по кнопке
 if (gameStat == 1) { //мы отбиваем
  for (++lastWork; lastWork < 6; lastWork++) if (!compHod()) break;
  for (var i = 0; i < 12; i++) if (work[i] >= 0) cardToH(work[i]);
  if (clearWork()) compHod();
 }
 else { //комп отбивает
  if (!allBeat()) { getHod(); return; }
  if (clearWork()) { showBtn(1); compHod(); }
 }
}

function clickCard(num) { //щелчок по карте
 var c = -1;
 if (gameStat == 1) { //мы отбиваем
  var c = work[lastWork * 2];
  if (c < 0) return;
  if (Math.floor(human[num] / 9) == Math.floor(c / 9)) {
   if ((human[num] % 9) < (c % 9)) return;
  }
  else if (Math.floor(human[num] / 9) != kozyr) return;
  work[lastWork * 2 + 1] = human[num];
  human[num] = -1;
  humanCnt--;
  lastWork++;
  showHumanCards();
  if (checkEnd()) { clearWork(); return; }
  if (checkWork()) if (!compHod()) if (clearWork()) gameStat = 2;
 }
 else if (gameStat == 2) { //комп отбивает
  if (lastWork > 0) {
   c = 0;
   for (var i = 0; i < lastWork * 2 ; i++) if ((human[num] % 9) == (work[i] % 9)) {
    c = -1;
    break;
   }
   if (c >= 0) return;
  }
  work[lastWork * 2] = human[num];
  human[num] = -1;
  humanCnt--;
  showHumanCards();
  if (allBeat()) {
   c = compMinCard(Math.floor(work[lastWork * 2] / 9), work[lastWork * 2] % 9);
  }
  if (c < 0) {
   work[lastWork * 2 + 1] = -1;
   if (lastWork == 5) { getHod(); return; } //lastWork=5 при броске 6й карты; была ошибка 6
  }
  else {
   work[lastWork * 2 + 1] = computer[c];
   computer[c] = -1;
   computerCnt--;
  }
  lastWork++;
  showWorkCards();
  showCompCards();
  if (checkEnd()) clearWork();
  else checkWork();
 }
}

function gameInit(stat) { //начало игры
 var i = 0;
 var i1 = 0;
 var c = -1;
 for (i = 0; i < 36; i++) {
  computer[i] = -1;
  human[i] = -1;
  coloda[i] = -1;
  if (brouz == "n") {
   eval(layerRef+'["cardc" + i].document.images[0].src = cardback.src');
   eval(layerRef+'["cardh" + i].document.images[0].src = cardback.src');
  } 
  else {
   document.images["icardc" + i].src  = cardback.src
   document.images["icardh" + i].src  = cardback.src
  }
 }
 for (i = 0; i < 12; i++) work[i] = -1;
 lastWork = 0;

 //тасуем карты
 for (i = 0; i < 36; i++) {
  c = -1;
  while (c < 0) {
   c = Math.floor(Math.random() * 36);
   for (i1 = 0; i1 < i; i1++) if (coloda[i1] == c) {
    c = -1;
    break;
   }
  }
  coloda[i] = c;
 }
 lastCard = 35;

 //сдаем
 computerCnt = 0;
 humanCnt = 0;
 for (i = 0; i < 6; i++) {
  cardToH(coloda[lastCard]);
  coloda[lastCard--] = -1;
  cardToC(coloda[lastCard]);
  coloda[lastCard--] = -1;
 }
 kozyr = Math.floor(coloda[0] / 9);
 showLastCard();

 //чей ход?
 if (stat == 0) { //у кого меньший козырь
  c = 36;
  for (i = 0; i < 6; i++) if ((Math.floor(human[i] / 9) == kozyr) && (human[i] < c)) c = human[i];
  i1 = 36;
  for (i = 0; i < 6; i++) if ((Math.floor(computer[i] / 9) == kozyr) && (computer[i] < i1)) i1 = computer[i];
  if (c > i1) gameStat = 1;
  else gameStat = 2;
  firstTurn=gameStat;
 }
 else gameStat = stat; //иначе учим дурака

 //начали:
 showColoda();
 showWorkCards();
 showCompCards();
 showHumanCards();
 showBtn(0);
 Save();
 if (gameStat == 1) compHod();
}

function compHod(stat) { //ход компа
 var c = 0;
 if (lastWork == 0) {
  if ( (lastCard<1) && ((computerCnt==2) || (computerCnt==3)) ) {
   c=1;
  }
  else c = compMinCard(-1, 0);
 }
 else {
  c = -1;
  for (var i = 0; i < computerCnt; i++) {
   if (Math.floor(computer[i] / 9) != kozyr) 
    for (var w = 0; w < 12 ; w++) if ((work[w] >= 0) && ((computer[i] % 9) == (work[w] % 9)) ) {
     c = i;
     break;
    }
   if (c >= 0) break;
  }
 }
 gameStat = 1;
 if (c < 0) return false;
 work[lastWork * 2] = computer[c];
 computer[c] = -1;
 computerCnt--;

 showWorkCards();
 showCompCards();
 return true;
}

//ниже часть для кукизов
var caution = false;

function setCookie(name, value, expires, path, domain, secure) {
 var curCookie = name + "=" + escape(value) +
  ((expires) ? "; expires=" + expires.toGMTString() : "") +
  ((path) ? "; path=" + path : "") +
  ((domain) ? "; domain=" + domain : "") +
  ((secure) ? "; secure" : "");
 if (!caution || (name + "=" + escape(value)).length <= 4000) document.cookie = curCookie;
 else if (confirm("Файл с сохраненной информацией превышает 4 Кб и будет обрезан!")) document.cookie = curCookie;
}

function getCookie(name) {
 var prefix = name + "=";
 var cookieStartIndex = document.cookie.indexOf(prefix);
 if (cookieStartIndex == -1) return null;
 var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
 if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
 return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

function fixDate(date) {
 var base = new Date(0);
 var skew = base.getTime();
 if (skew > 0) date.setTime(date.getTime() - skew);
}

function Save() {
 var now = new Date();
 fixDate(now);
 now.setTime(now.getTime() + 366 * 24 * 60 * 60 * 1000);
 setCookie('w', winCount, now);
 setCookie('d', drawCount, now);
 setCookie('f', fallCount, now);
 setCookie('ft', firstTurn, now);
 for (var i=0; i<5; i++) setCookie("tb"+(i+1), tab[i], now);
}

function today () {
 var d=new Date();
 var day=d.getDate();
 if (day<10) day='0'+day;
 var mon=d.getMonth()+1
 if (mon<10) mon='0'+mon;
 var y=d.getYear();
 if (y<1900) y+=1900;
 return (''+day+'/'+mon+'/'+y);
}

function Load () {
 var win=getCookie ("w");
 var draw=getCookie ("d");
 var fall=getCookie ("f");
 var first=getCookie ("ft");
 for (var i=0; i<5; i++) tab[i]=getCookie("tb"+(i+1));
 if (!tab[0]) {
  var s=today();
  for (var i=0; i<5; i++) tab[i]='нет: 0 (0/0/0), '+s;
 }
 if (!isNaN(parseInt (win))) {
  winCount=parseInt (win);
  drawCount=parseInt (draw);
  fallCount=parseInt (fall);
  firstTurn=parseInt (first);
 }
 commonCount();
}

function gameInit0 () {
 var t=false;
 if ((winCount==0) && (drawCount==0) && (fallCount==0)) t=true;
 else t=window.confirm("Вы уверены, что хотите начать все заново? Статистика об играх будет сброшена!");
 if (t==true) {
  var balls=winCount-fallCount;
  checkBest (balls,winCount);
  winCount=drawCount=fallCount=0;
  firstTurn=0;
  commonCount();
  gameInit (0);
 }
}

function checkBest (b,w) {
 var n=-1;
 for (var i=0; i<5; i++) {
  var bt1=tab[i].indexOf(' ');
  var tab0=tab[i].substring(bt1+1,tab[i].length-bt1);
  bt1=parseInt(tab0.indexOf(' '));
  var balls1=parseInt(tab0.substring (0,bt1));
  var wins1=parseInt(tab0.substring (bt1+1,tab0.length-bt1));
  if ( (b>balls1) || ((b==balls1) && (w>=wins1))) { n=i; break; }
 }
 if (n>-1) {
  var name1='';
  while (name1=='') {
   name1=window.prompt ('Вы вошли в пятерку лучших игроков на этой машине!\r\nПожалуйста, введите Ваше имя:','');
   if ((name1=='') || (name1==null)) {
    name1='';
    window.alert ("Введенное имя не должно быть пустым. Нажмите OK для повтора");
   }
   else if (name1.length > 20) {
    window.alert ("Введенное имя слишком длинное и будет обрезано!");
    name1=name1.substring (0,20);
   }
  }
  for (var i=0; i<name1.length; i++) if (name1.charAt(i)==' ') name1=name1.substring(0,i)+'_'+name1.substring(i+1,name1.length);
  for (var j=4; j>n; j--) tab[j]=tab[j-1];
  var s=today();
  tab[n]=''+name1+': '+b+' ('+winCount+'/'+drawCount+'/'+fallCount+'), '+s;
 }
}

function bestTable() {
 var s='Таблица лучших результатов:\r\nИмя: очки (выигрыши/ничьи/поражения), дата\r\n';
 for (var i=0; i<5; i++) s+= tab[i] +'\r\n';
 window.alert (s);
}

//главная п/п
 Load();
 gameInit(firstTurn);

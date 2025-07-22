UI_MOBILE_VIEW=0;

function MobileViewRepos(){
$('#motdrow').insertBefore('#mainpage');
$('#playlistrow').insertAfter('#mainpage');
$('#leftcontrols').insertAfter('#chatwrap');
$('#leftpane').insertAfter('#leftcontrols');
$('#plcontrol').prependTo('#rightpane');
/*if($("#titlerow").length>0){
$("#videocontrols").insertAfter("#titlerow");
$("#videowrap").insertAfter("#titlerow");
}else{
$("#videocontrols").insertAfter("#currenttitle");
$("#videowrap").insertAfter("#currenttitle");
}*/
}


function DesktopViewRepos(){
if(UI_MOBILE_VIEW===1){
removeMobileCSS();
$(`#mobile-menu`).remove();
$('#motdrow').insertBefore('#announcements');
$('#playlistrow').insertAfter('#controlsrow');
$('#chat-panel').insertBefore('#playlistrow');
$('#emotesrow').insertBefore('#playlistrow');
$('#leftcontrols').insertBefore('#rightcontrols');
$('#leftpane').prependTo('#playlistrow');
$('#plcontrol').prependTo('#rightcontrols');
/*$("#videocontrols").insertAfter("#rightcontrols");
$("#videowrap").insertAfter("#chatwrap");*/
UI_MOBILE_VIEW=0
}
}


function addMobileCSS(){
if($('.mobile-view-iu').length===0){
$(`<style>`).addClass('mobile-view-iu').appendTo('head').text(`
@media (max-width: 768px){/*html{overflow-x: hidden}*/#videocontrols{float: right !important;padding-right:0px;}#wrap{padding: 0 0 0px;}#pmbar,#motdrow, #playlistrow{display: none;z-index: 1029!important;overflow-x: hidden;}#motdrow, #playlistrow{position: fixed;top:50px;overflow-y: auto;padding-bottom: 50px}.pm-panel, .pm-panel-placeholder{width: 97vw;}.pm-panel > .panel-body > .pm-buffer {height: calc(100vh - 252px);max-height: calc(100vh - 252px);}@-moz-document url-prefix(){.pm-panel > .panel-body > .pm-buffer {max-height: calc(100vh - 252px);height:calc(100vh - 252px)}}.close {font-size: 50px;line-height: 0.5;}.btn-default.pmchatbtnmenu.new-pm{background-color: #2f6f6f !important;}.pm-num{position: relative;left: -22px;top: 10px;padding: 1px;border-radius: 7px;background-color: red;padding-left: 5px; padding-right: 5px}.pmchatbtnmenu{width: 60px;}
#pmbar{height: calc(100vh - 50px);padding-top:50px;}
@media (max-width: 345px){
#mobile-menu{left:0px !important}
}
}
`);
}
}

function removeMobileCSS(){
$('.mobile-view-iu').remove();
}


function CreateMobileUI(){
$(`#mobile-menu`).remove();
$(`<div id="mobile-menu" style="text-align: center;position: fixed;top: 0px;width: 100%;max-height: 50px;height: 50px;z-index: 1030;left: 70px;">
<button class="btn btn-sm btn-default motdbtnmenu"><img src="https://raw.githubusercontent.com/CiTX/citx.github.io/master/mobile/info-btn.png" style="height: 32px"/></button>
<button class="btn btn-sm btn-default playlistbtnmenu"><img src="https://raw.githubusercontent.com/CiTX/citx.github.io/master/mobile/video-playlist.png" style="height: 32px"/></button>
<button id="pm-chat" class="btn btn-sm btn-default pmchatbtnmenu"><span><img src="https://raw.githubusercontent.com/CiTX/citx.github.io/master/mobile/pm-btn.png" style="height: 32px"/></span></button>
</div>`).appendTo('body');

$('.motdbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('.pl-mobile-style').remove();
$('.pm-mobile-style').remove();
$('<style>').addClass('motd-mobile-style').appendTo('head').text('.btn-default.motdbtnmenu.btn-success{background: green !important}#motdrow{display:block !important;pointer-events: painted;height: 100%;max-height: calc(100vh - 50px);background-color: black;}');
} else {
$(this).removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});


$('.playlistbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
$('<style>').addClass('pl-mobile-style').appendTo('head').text('.btn-default.playlistbtnmenu.btn-success{background: green !important}#playlistrow{display:block !important;pointer-events: painted;height: 100%;width: 100vw;max-height: calc(100vh - 50px);background-color: black;}');
} else {
$(this).removeClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});


$('.pmchatbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.motd-mobile-style').remove();
$('.pl-mobile-style').remove();
$('<style>').addClass('pm-mobile-style').appendTo('head').text('.btn-default.pmchatbtnmenu.btn-success{background: green !important}#pmbar{display:block !important;pointer-events: painted;background-color: black;}#mainpage{display: none}');
} else {
$(this).removeClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});
$(`<span class="pm-num"></span>`).insertAfter('#pm-chat');
$('.pm-btn').on('click', function(){if(!$('.pmchatbtnmenu').hasClass('btn-success')){$('.pmchatbtnmenu').click();}});
}

function DetectPmCount(){
let x = setTimeout(function z(){
var a;
a=function(){
if($('.panel-heading').length > 0){if($('.panel-primary').length>0){$('.btn-default.pmchatbtnmenu').addClass('new-pm');
}else{if($('.btn-default.pmchatbtnmenu').hasClass('new-pm')){$('.btn-default.pmchatbtnmenu').removeClass('new-pm');}}}
if(($('.panel-heading').length == 0) && $('.pmchatbtnmenu').hasClass('btn-success')){$('.pmchatbtnmenu').click();}
$(`.pm-num`).html(`${$('.panel-heading').length}`);
};a();
if($(window).width()<=767){
x = setTimeout(z, 100);
}
}, 2);
}


function initMobileView(){
if(UI_MOBILE_VIEW===0){
addMobileCSS();
MobileViewRepos();
CreateMobileUI();
DetectPmCount();
UI_MOBILE_VIEW=1;
}
}

function PageWidthCheck(){
let width=$(window).width();
if(width<=767){
initMobileView();
}else{
DesktopViewRepos();
}
}

$(window).resize(()=>{
PageWidthCheck();
});

PageWidthCheck();


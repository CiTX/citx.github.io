var aImages = new Array();
var aURL = new Array();
var aArtists = new Array();
var iPrev = -1;
var iRnd = -1;
aImages[0] = "https://dl.dropbox.com/s/069hxdv0gbml1w6/38831_yuruyuri.jpg";
aImages[1] = "https://dl.dropbox.com/s/14rjjlgublk0k82/227432.jpg";
aImages[2] = "https://dl.dropbox.com/s/0e7uleklf7h3mic/Rika-Furude-Higurashi-no-Naku-Koro-ni-anime-35890889-1680-1050.jpg";
aImages[3] = "https://dl.dropbox.com/s/yahm43bwogll3im/HD-Backgrounds-Clannad.jpg";
aImages[4] = "https://i.imgur.com/uvUgRPm.jpg";
aImages[5] = "https://i.imgur.com/HUZRnBg.jpg";
aImages[6] = "https://i.imgur.com/PVe8NxA.jpg";
aImages[7] = "https://i.imgur.com/n0yP1IJ.jpg";
aImages[8] = "https://i.imgur.com/BqZKtpp.jpg";
aImages[9] = "https://i.imgur.com/9IzyWxq.jpg";
aImages[10] = "https://i.imgur.com/wW36z3K.jpg";
aImages[11] = "https://i.imgur.com/BkS2IBQ.jpg";
aImages[12] = "https://i.imgur.com/HlUuVCF.jpg";
aImages[13] = "https://dl.dropbox.com/s/7r802p106z53tiy/cowboy_bebop.jpg";
aImages[14] = "https://dl.dropbox.com/s/t2zl3d581t4ukkw/the-disapperance-of-haruhi-suzumiya-2010.jpg";

$(document).ready(function() {
$("img#bg").load(function()
{
$("img#bg").fadeTo(2000,1);
setTimeout(function()
{
$("#image_description").animate({right: '-=150'}, 1000);
$("img#bg").fadeOut(2000);
setTimeout(LoadImages,2500);
}
,30000);
} 
)
setTimeout(LoadImages,1000);
});
function LoadImage(iNr)
{
$("img#bg").attr("src", aImages[iNr]);
};
function LoadImages()
{
/* Select a random image number and make sure this is not equal to the previous image */
while(iPrev == iRnd)
{
iRnd = Math.floor(Math.random()*aImages.length);
}
/* Show the selected image */
LoadImage(iRnd);
iPrev = iRnd;
};
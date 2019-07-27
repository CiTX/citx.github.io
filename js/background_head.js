var aImages = new Array();
var aURL = new Array();
var aArtists = new Array();
var iPrev = -1;
var iRnd = -1;
aImages[0] = "img/backgrounds/00001.jpg";
aImages[1] = "img/backgrounds/00002.jpg";
aImages[2] = "img/backgrounds/00003.jpg";
aImages[3] = "img/backgrounds/00004.jpg";
aImages[4] = "img/backgrounds/00005.jpg";
aImages[5] = "img/backgrounds/00006.jpg";
aImages[6] = "img/backgrounds/00007.jpg";
aImages[7] = "img/backgrounds/00008.jpg";
aImages[8] = "img/backgrounds/00009.jpg";
aImages[9] = "img/backgrounds/00010.jpg";
aImages[10] = "img/backgrounds/00011.jpg";
aImages[11] = "img/backgrounds/00012.jpg";
aImages[12] = "img/backgrounds/00013.jpg";
aImages[13] = "img/backgrounds/00014.jpg";
aImages[14] = "img/backgrounds/00015.jpg";
aImages[15] = "img/backgrounds/00016.jpg";
aImages[16] = "img/backgrounds/00017.jpg";
aImages[17] = "img/backgrounds/00018.jpg";
aImages[18] = "img/backgrounds/00019.jpg";
aImages[19] = "img/backgrounds/00020.jpg";
aImages[20] = "img/backgrounds/00021.jpg";

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
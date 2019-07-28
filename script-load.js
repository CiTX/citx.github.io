$.getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js");
$.getScript("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
$.getScript("https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js");    
WebFont.load({
        google: {
            families: ['Neucha']
        }
    });
document.addEventListener('DOMContentLoaded', function () {
        var seo = document.querySelector('.index-seo').innerText;
        var items = seo.split(' ');
        (function flashWord() {
            var i = 0;
            function run(item) {
                var t = setTimeout(function () {
                    clearTimeout(t);
                    document.querySelector('.index-seo').innerHTML = seo.replace(new RegExp(' ' + item + ' ', 'g'), ' <span style="color: #fff">' + item + '</span> ');
                    if (items.length) {
                        i = getRandom(0, items.length - 1);
                        run(items[i].replace(/[^A-Za-zА-Яа-яёЁ0-9]/gim, ''));
                    }
                }, 100);
            }
            function getRandom(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            run(items[i]);
        })();
        (function countMovies() {
            var date = new Date();
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth() + 1;
            var day = date.getUTCDate();
            var hours = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            var seconds = date.getUTCSeconds();
            var total = ((year - 2014) * 121680) + (month * 10140) + (day * 338) + (hours * 14) + minutes + seconds;
            document.querySelector('#count').innerHTML = (total + '').replace(/([0-9]{3})([0-9]{3})/, '$1 $2');
            setInterval(function () {
                total += Math.floor(Math.random() * 3);
                document.querySelector('#count').innerHTML = (total + '').replace(/([0-9]{3})([0-9]{3})/, '$1 $2');
            }, 1000);
        })();
        var search = document.querySelector('#search');
        var title = document.querySelector('#search-title');
        if (window.location.hash) {
            var hash = window.location.hash.substring(1);
            if (title && hash) {
                title.value = hash;
                parse();
            }
        }
        if (search) {
            search.addEventListener('click', function () {
                return parse();
            });
        }
        if (title) {
            title.addEventListener('keyup', function (event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    return parse();
                }
            });
        }
        function parse() {
            var yohoho = document.querySelector('#yohoho');
            if (title && title.value && yohoho) {
                if (/kinopoisk\.ru/i.test(title.value)) {
                    var exec = /(film\/|movie\/).*?([0-9]{3,7})\//gi.exec(title.value);
                    if (exec && exec[2]) {
                        yohoho.dataset.kinopoisk = exec[2];
                        window.location.hash = '#' + yohoho.dataset.kinopoisk;
                    }
                } else if (/^\d+$/.test(title.value)) {
                    yohoho.dataset.kinopoisk = title.value;
                    window.location.hash = '#' + title.value;
                } else {
                    yohoho.dataset.title = title.value;
                    window.location.hash = '#' + title.value;
                }
                items = [];
                return yo();
            }
        }
    });
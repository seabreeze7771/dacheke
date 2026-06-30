// 搭车客指南 hitchhiker 主题脚本
(function () {
  'use strict';
  var hh = window.__hh || {};

  // 控制台彩蛋
  if (hh.greeting) {
    console.log('%c' + hh.greeting, 'color:#b8362e;font-weight:bold;font-size:13px;');
  }

  // 首页随机 slogan
  var sloganEl = document.querySelector('.cover-slogan[data-slogans]');
  if (sloganEl) {
    try {
      var arr = JSON.parse(sloganEl.getAttribute('data-slogans'));
      if (Array.isArray(arr) && arr.length) {
        sloganEl.textContent = arr[Math.floor(Math.random() * arr.length)];
      }
    } catch (e) {}
  }

  // 毛巾台词
  var btn = document.getElementById('towel-btn');
  var box = document.getElementById('towel-quote');
  if (btn && box) {
    var quotes = hh.towelQuotes || ['别慌。'];
    var t;
    var show = function () {
      var q = quotes[Math.floor(Math.random() * quotes.length)];
      box.textContent = q;
      box.hidden = false;
      clearTimeout(t);
      t = setTimeout(function () { box.hidden = true; }, 3000);
    };
    btn.addEventListener('click', show);
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); }
    });
  }

  // 工具箱分类筛选
  var filters = document.querySelectorAll('.tool-filter');
  if (filters.length) {
    var cards = document.querySelectorAll('.tool-card');
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        var cat = f.getAttribute('data-cat');
        filters.forEach(function (x) { x.classList.remove('is-active'); });
        f.classList.add('is-active');
        cards.forEach(function (c) {
          c.style.display = (cat === 'all' || c.getAttribute('data-cat') === cat) ? '' : 'none';
        });
      });
    });
  }
})();

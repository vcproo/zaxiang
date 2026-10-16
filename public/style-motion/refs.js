/* 动效词典新增分类「成片参考」：公开成片的短预览，进入画面后自动循环播放。 */
(function () {
  var root = document.getElementById('app');
  var nav = document.getElementById('nav');
  var panel = document.getElementById('panel-dict');
  if (!root || !nav || !panel) return;
  var base = panel.getAttribute('data-refs');
  if (!base) return;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var sec = document.createElement('section');
  sec.className = 'cat';
  sec.id = 'refs';
  sec.innerHTML = '<h2>成片参考<span id="refs-count"></span></h2>'
    + '<p>公开成片的短预览，用来对照节奏、构图和转场。进入画面后自己循环播放，最多同时两条；鼠标移到某一张上会改播那一张。这组不跟上面的「全部暂停」走。</p>'
    + '<div class="ref-tools"><input id="refs-q" type="search" placeholder="搜索标题、作者、提示词、原帖" aria-label="搜索成片参考"><span id="refs-shown"></span></div>'
    + '<div class="ref-grid" id="refs-grid"></div>';
  root.appendChild(sec);
  var link = document.createElement('a');
  link.href = '#refs';
  link.innerHTML = '成片参考<span id="refs-nav">…</span>';
  nav.appendChild(link);

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(s) {
    s = Math.max(0, s || 0);
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  }
  function media(slug, kind) {
    return base + '/' + kind + '/' + encodeURIComponent(slug) + (kind === 'previews' ? '.mp4' : '.jpg');
  }

  var items = [];
  var preview = null;
  var grid = sec.querySelector('#refs-grid');
  var q = sec.querySelector('#refs-q');

  function createPreview() {
    var cards = new Map();
    var visible = new Set();
    var playing = new Set();
    var maxPlaying = function () { return matchMedia('(max-width: 900px)').matches ? 1 : 2; };
    var stop = function (state) {
      clearTimeout(state.timer);
      state.timer = 0;
      state.generation++;
      playing.delete(state);
      var video = state.video;
      if (video) {
        video.pause();
        if (video.hasAttribute('src')) { video.removeAttribute('src'); video.load(); }
      }
      state.card.classList.remove('is-on');
      if (state.bar) state.bar.style.transform = 'scaleX(0)';
      if (state.time) state.time.textContent = '00:00';
    };
    var start = function (state, priority) {
      clearTimeout(state.timer);
      state.timer = 0;
      if (!state.card.isConnected || playing.has(state)) return;
      if (!priority && !visible.has(state)) return;
      if (playing.size >= maxPlaying()) {
        if (!priority) return;
        stop(playing.values().next().value);
      }
      var video = state.video;
      var generation = ++state.generation;
      video.src = video.getAttribute('data-src');
      video.muted = true;
      playing.add(state);
      video.play().then(function () {
        if (state.generation !== generation) return;
        state.card.classList.add('is-on');
      }).catch(function () {
        if (state.generation === generation) stop(state);
      });
    };
    var schedule = function (state) {
      clearTimeout(state.timer);
      if (!playing.has(state)) state.timer = setTimeout(function () { start(state, false); }, 400);
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var state = cards.get(entry.target);
        if (!state) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) { visible.add(state); schedule(state); }
        else { visible.delete(state); stop(state); }
      });
      visible.forEach(function (state) {
        if (playing.size >= maxPlaying()) return;
        if (!playing.has(state) && !state.timer) schedule(state);
      });
    }, { threshold: [0.45] });
    return {
      observe: function (card) {
        var video = card.querySelector('video');
        var state = { card: card, video: video, bar: card.querySelector('.barline i'), time: card.querySelector('.clock'), timer: 0, generation: 0 };
        video.addEventListener('timeupdate', function () {
          if (!playing.has(state) || !isFinite(video.duration) || video.duration <= 0) return;
          if (state.bar) state.bar.style.transform = 'scaleX(' + Math.min(1, video.currentTime / video.duration) + ')';
          if (state.time) state.time.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
        });
        card.addEventListener('pointerenter', function () { start(state, true); });
        card.querySelector('.play').addEventListener('click', function (event) {
          event.preventDefault();
          start(state, true);
        });
        cards.set(card, state);
        if (!reduced) observer.observe(card);
      },
      clear: function () {
        observer.disconnect();
        cards.forEach(stop);
        cards.clear();
        visible.clear();
      }
    };
  }

  function render() {
    if (preview) preview.clear();
    var query = q.value.trim().toLowerCase();
    var shown = items.filter(function (item) {
      if (!query) return true;
      return (item.title + '\n' + item.by + '\n' + item.prompt + '\n' + item.post).toLowerCase().indexOf(query) >= 0;
    });
    sec.querySelector('#refs-shown').textContent = shown.length + ' / ' + items.length;
    if (!shown.length) { grid.innerHTML = '<p class="ref-empty">没有匹配的成片</p>'; return; }
    grid.innerHTML = shown.map(function (item) {
      var aspect = item.aspect ? '<span class="pill">' + esc(item.aspect) + '</span>' : '';
      var post = item.post ? '<a class="post" href="' + esc(item.post) + '" target="_blank" rel="noopener">' + esc(item.post) + '</a>' : '';
      var prompt = item.prompt ? '<details><summary>提示词</summary><pre>' + esc(item.prompt) + '</pre></details>' : '';
      return '<article class="ref"><div class="shot">'
        + '<img src="' + esc(media(item.slug, 'posters')) + '" alt="" loading="lazy" onerror="this.remove()">'
        + '<video data-src="' + esc(media(item.slug, 'previews')) + '" muted loop playsinline preload="none"></video>'
        + '<div class="pills">' + aspect + '</div><span class="clock pill">00:00</span><div class="barline"><i></i></div>'
        + '<button class="play" type="button" aria-label="播放 ' + esc(item.title) + '"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M5 3.2v9.6L13 8z"/></svg></button>'
        + '</div><h3>' + esc(item.title) + '</h3><p class="by">' + esc(item.by) + '</p>' + post + prompt + '</article>';
    }).join('');
    preview = createPreview();
    grid.querySelectorAll('.ref').forEach(function (card) { preview.observe(card); });
  }

  fetch(base + '/catalog.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      items = data;
      sec.querySelector('#refs-count').textContent = String(items.length);
      nav.querySelector('#refs-nav').textContent = String(items.length);
      render();
      if (location.hash === '#refs') sec.scrollIntoView();
    })
    .catch(function () {
      grid.innerHTML = '<p class="ref-empty">成片列表没有加载出来</p>';
    });
  q.addEventListener('input', function () { if (items.length) render(); });
})();

(function () {
  "use strict";

  var site = (typeof SITE_CONFIG !== "undefined")
    ? SITE_CONFIG : { title: "音频作品集", subtitle: "" };
  var cfg = (typeof PAGE_CONFIG !== "undefined") ? PAGE_CONFIG : {};

  // 站点标题
  document.title = site.title;
  var ht = document.getElementById("site-title");
  var hs = document.getElementById("site-subtitle");
  if (ht) ht.textContent = site.title;
  if (hs) hs.textContent = site.subtitle || "";

  // 说明文字
  var introEl = document.getElementById("intro-text");
  if (introEl && cfg.introText) introEl.textContent = cfg.introText;

  function fmt(sec) {
    if (!isFinite(sec) || sec < 0) return "0:00";
    sec = Math.floor(sec);
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  function setCover(track, el) {
    if (track && track.cover) {
      el.style.backgroundImage = 'url("' + track.cover + '")';
      el.classList.add("has-cover");
      el.textContent = "";
    } else {
      el.style.backgroundImage = "";
      el.classList.remove("has-cover");
      el.textContent = "♪";
    }
  }

  // 生成一张带独立播放器的音频卡片
  function createCard(track, featured) {
    var card = document.createElement("article");
    card.className = "track-card" + (featured ? " featured" : "");

    var cover = document.createElement("div");
    cover.className = "track-cover";
    setCover(track, cover);

    var body = document.createElement("div");
    body.className = "track-body";

    var h3 = document.createElement("h3");
    h3.className = "track-title";
    h3.textContent = track.title || "未命名";

    var p = document.createElement("p");
    p.className = "track-desc";
    p.textContent = track.description || "";

    body.appendChild(h3);
    body.appendChild(p);

    if (track.tags && track.tags.length) {
      var tags = document.createElement("div");
      tags.className = "track-tags";
      track.tags.forEach(function (tag) {
        var span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tags.appendChild(span);
      });
      body.appendChild(tags);
    }

    // 播放器
    var player = document.createElement("div");
    player.className = "track-player";

    var btn = document.createElement("button");
    btn.className = "play-btn";
    btn.textContent = "▶";
    btn.setAttribute("aria-label", "播放 " + (track.title || ""));

    var seek = document.createElement("input");
    seek.type = "range";
    seek.className = "seek";
    seek.min = "0"; seek.max = "100"; seek.value = "0"; seek.step = "0.1";

    var time = document.createElement("span");
    time.className = "time";
    time.textContent = "0:00 / 0:00";

    player.appendChild(btn);
    player.appendChild(seek);
    player.appendChild(time);
    body.appendChild(player);

    card.appendChild(cover);
    card.appendChild(body);

    // 每张卡片独立的 Audio 实例（左右可同时播放，便于对比）
    var audio = new Audio();
    audio.src = track.src;
    audio.preload = "metadata";

    btn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play().catch(function (e) {
          time.textContent = "无法播放（检查文件/路径）";
          console.error(e);
        });
      } else {
        audio.pause();
      }
    });
    audio.addEventListener("play", function () {
      btn.textContent = "⏸"; card.classList.add("playing");
    });
    audio.addEventListener("pause", function () {
      btn.textContent = "▶"; card.classList.remove("playing");
    });
    audio.addEventListener("timeupdate", function () {
      if (audio.duration) {
        seek.value = (audio.currentTime / audio.duration) * 100;
        time.textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
      }
    });
    audio.addEventListener("loadedmetadata", function () {
      time.textContent = "0:00 / " + fmt(audio.duration);
    });
    audio.addEventListener("ended", function () {
      btn.textContent = "▶"; card.classList.remove("playing"); seek.value = 0;
      time.textContent = "0:00 / " + fmt(audio.duration);
    });
    audio.addEventListener("error", function () {
      time.textContent = "文件缺失";
      btn.disabled = true;
    });
    seek.addEventListener("input", function () {
      if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
    });

    return card;
  }

  function renderList(elId, list) {
    var el = document.getElementById(elId);
    if (!el) return;
    if (!list || !list.length) {
      var tip = document.createElement("p");
      tip.className = "col-empty";
      tip.textContent = "（暂未添加音频，请在 audio-data.js 中配置）";
      el.appendChild(tip);
      return;
    }
    list.forEach(function (t) { el.appendChild(createCard(t, false)); });
  }

  // 真实样本（特色大卡）
  var realSlot = document.getElementById("real-sample-slot");
  if (realSlot && cfg.realSample) {
    realSlot.appendChild(createCard(cfg.realSample, true));
  }

  // 两列
  renderList("reference-list", cfg.referenceTracks);
  renderList("simulated-list", cfg.simulatedTracks);
})();

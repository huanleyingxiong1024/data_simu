# 音频仿真对比展示（对比版 Demo）

第二个版本的音频展示网页，布局按你的要求设计：

```
        ┌─────────────────────────────────┐
        │       顶部居中标题 / 副标题        │
        ├─────────────────────────────────┤
        │  真实样本（一条，特色大卡 + 播放器） │
        ├─────────────────────────────────┤
        │      一段说明文字（描述段落）       │
        ├──────────────┬──────────────────┤
        │  参考音频      │   仿真后音频       │
        │  （左列）      │   （右列）         │
        └──────────────┴──────────────────┘
```

每首音频都有**独立播放器**，左右两列可以**同时播放**，方便直接对照「参考 vs 仿真」的听感差异。

---

## 一、文件结构

```
audio-demo-v2/
├── index.html              # 主页面（一般不用改）
├── .nojekyll
├── assets/
│   ├── css/style.css       # 样式（换配色改 :root 变量）
│   └── js/
│       ├── audio-data.js   # ★ 你主要改这个：配置真实样本/说明/两列音频
│       └── app.js          # 渲染与播放逻辑（一般不用改）
├── audio/                  # 你的音频放这里
│   ├── real-sample.wav     # 内置示例：真实样本
│   ├── ref-1.wav  ref-2.wav   # 内置示例：参考音频（干净）
│   └── sim-1.wav  sim-2.wav   # 内置示例：仿真后音频（变闷，便于对比）
└── covers/                 # 可选：封面图
```

---

## 二、如何改成你自己的内容

打开 `assets/js/audio-data.js`，按下面四块修改：

```js
const PAGE_CONFIG = {
  // 1) 顶部一条真实样本
  realSample: {
    title: "真实样本",
    description: "描述……",
    src: "audio/real-sample.wav",   // 改成你的真实样本文件
    cover: "",                       // 可选封面
    tags: ["真实", "基准"],
  },

  // 2) 真实样本下方的说明文字
  introText: "这里写整段说明文字……",

  // 3) 左列：参考音频（数组，可多条）
  referenceTracks: [
    { title: "参考 1", description: "…", src: "audio/ref-1.wav", cover: "", tags: ["参考"] },
    // { title: "参考 2", description: "…", src: "audio/ref-2.wav", cover: "", tags: ["参考"] },
  ],

  // 4) 右列：仿真后音频（数组，可多条）
  simulatedTracks: [
    { title: "仿真 1", description: "…", src: "audio/sim-1.wav", cover: "", tags: ["仿真"] },
    // { title: "仿真 2", description: "…", src: "audio/sim-2.wav", cover: "", tags: ["仿真"] },
  ],
};
```

- 添加一条：复制一个 `{ ... }` 块，改内容，块之间用逗号 `,` 隔开。
- 删除示例：把整块连同逗号删掉。
- 顶部标题/副标题：编辑文件顶部的 `SITE_CONFIG`。
- 封面图：把图片放进 `covers/`，`cover` 填 `"covers/xxx.jpg"`；留空则显示默认封面。

---

## 三、本地预览 & 部署

与第一个版本完全相同：

- **本地预览**：双击 `index.html`；或在该目录运行 `python -m http.server 8000`，访问 `http://localhost:8000`。
- **部署到 GitHub Pages**：把 `audio-demo-v2/` 里的全部内容上传到 GitHub 仓库 → `Settings → Pages` → 选 `main` 分支根目录 → 得到 `https://用户名.github.io/仓库名/` 链接。

> 注意：GitHub Pages 对文件名**大小写敏感**；单文件建议 < 100MB；公开分享优先用 MP3。
> 更完整的说明可参考第一个版本的 `audio-demo/README.md`。

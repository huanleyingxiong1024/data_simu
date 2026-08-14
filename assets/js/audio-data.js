// ============================================================
//  音频展示（对比版）配置 —— 你只需要修改这个文件
// ============================================================
//
//  页面布局（从上到下）：
//    1) 顶部居中标题 / 副标题
//    2) 一条「真实样本」
//    3) 一段说明文字
//    4) 两列：左「参考音频」 / 右「仿真后音频」
//
//  每个音频对象字段：
//    title       必填  标题
//    description 必填  描述
//    src         必填  音频路径（建议放 audio/ 文件夹）
//    cover       可选  封面图路径（放 covers/）；留空显示默认封面
//    tags        可选  标签数组，例如 ["钢琴"]
//
//  添加 / 删除：复制一个 { ... } 块，注意块之间用逗号隔开。
// ============================================================

const SITE_CONFIG = {
  title: "音频仿真对比",
  subtitle: "",
};

const PAGE_CONFIG = {
  // ---------- 1) 顶部一条真实样本 ----------
  realSample: {
    title: "真实样本",
    description: "",
    src: "audio/1001154499_1215352545_part_000.wav",
    cover: "",
    tags: ["真实数据样本"],
  },

  // ---------- 2) 真实样本下方的说明文字 ----------
  introText:
    "仿真时主要考虑了两个因素：" +
    "1. 环境因素：" +
    "  1）混响：会低频变糊的最主要原因" +
    "2. 设备因素：" + 
    "  1）低频衰减" + 
    "  2）低码率编码",


// 仿真时主要考虑了两个因素：
// 1. 环境因素：
// 1）混响：会低频变糊的最主要原因
// 2. 设备因素：
// 1）低频衰减
// 2）低码率编码


  // ---------- 3) 左列：参考音频 ----------
  referenceTracks: [
    {
      title: "1",
      description: "",
      src: "audio/select/000007.wav",
      cover: "",
      tags: ["参考"],
    },
    {
      title: "2",
      description: "",
      src: "audio/select/0000010.wav",
      cover: "",
      tags: ["参考"],
    },
    {
      title: "3",
      description: "",
      src: "audio/select/0000011.wav",
      cover: "",
      tags: ["参考"],
    },
    {
      title: "4",
      description: "",
      src: "audio/select/0000027.wav",
      cover: "",
      tags: ["参考"],
    },
    {
      title: "5",
      description: "",
      src: "audio/select/0000028.wav",
      cover: "",
      tags: ["参考"],
    },
  ],

  // ---------- 4) 右列：仿真后音频 ----------
  simulatedTracks: [
    {
      title: "1",
      description: "",
      src: "audio/select/000007_degrade.wav",
      cover: "",
      tags: ["仿真"],
    },
    {
      title: "2",
      description: "",
      src: "audio/select/000010_degrade.wav",
      cover: "",
      tags: ["仿真"],
    },
    {
      title: "3",
      description: "",
      src: "audio/select/000011_degrade.wav",
      cover: "",
      tags: ["仿真"],
    },
    {
      title: "4",
      description: "",
      src: "audio/select/000027_degrade.wav",
      cover: "",
      tags: ["仿真"],
    },
    {
      title: "5",
      description: "",
      src: "audio/select/000028_degrade.wav",
      cover: "",
      tags: ["仿真"],
    },
    // {
    //   title: "仿真 2 · 人声片段",
    //   description: "第二条仿真音频的描述……",
    //   src: "audio/sim-2.wav",
    //   cover: "",
    //   tags: ["仿真"],
    // },
  ],
};

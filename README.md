# 萌宠健康日记 (PetHealth-AI Diary) 🐾

一款基于 **AI 协同开发 (AI-Augmented Development)** 模式构建的微信小程序，旨在为宠主提供极简、直观、且具备数据分析能力的毛孩子健康管理方案。

---

## 🌟 核心特色 (Core Features)

- **全维度动态记录**：集成“用药、饮食、饮水、排泄”四大基础模块，支持无限量自定义记录卡片。
- **智能数据解析**：内置正则表达式解析引擎，支持从自然语言输入中自动提取数值（如：“喂食 50.5g” -> 自动记录 50.5）。
- **多线条趋势可视化**：集成 ECharts 微信版，支持单一项目趋势图与多指标综合健康趋势对比切换。
- **历史回顾系统**：采用“日期列表 + 单日卡片详情”的双层回顾逻辑，通过状态图标点亮机制快速定位异常天数。
- **沉浸式 UI/UX**：以“暖香芋紫”为主基调的视觉体系，采用全局 CSS Variables 实现一秒换肤。

## 🤖 AI 驱动开发模式 (AI-Native Workflow)

本项目作为个人技术探索，深度实践了 **LLM-Augmented 开发流程**，主要成果体现在：

1. **需求拆解与架构设计**：通过 Prompt Engineering 引导 AI 完成了从单一记录页到“中心化录入+分布式展示”的多页面架构演进。
2. **底层技术攻坚**：在 AI 指令引导下，成功定位并解决了微信新版 **Skyline 渲染引擎** 与旧版插件组件的底层兼容性冲突，将渲染模式无缝切回 WebView 以保障图表稳定性。
3. **代码重构与性能优化**：利用 AI 辅助重构，将原本 200+ 行的零散输入处理逻辑重构为 100 余行的高复用通用函数，冗余度降低 50% 以上。
4. **快速视觉迭代**：通过 AI 推荐的色值体系与 CSS 变量技术，实现了高效的品牌视觉定制化开发。

## 🛠️ 技术栈 (Tech Stack)

- **Framework**: 微信小程序开发框架 (WXML/WXSS/JavaScript)
- **Data Viz**: ECharts for WeChat (高性能移动端图表库)
- **Storage**: LocalStorage (多宠物数据隔离存储方案)
- **Workflow**: ChatGPT-4o / Claude 3.5 (技术路线决策与代码生成)

## 📸 预览 (Showcase)
<img width="628" height="1344" alt="66a38f70-b37a-42fe-8195-5b47c70726e3" src="https://github.com/user-attachments/assets/3841530b-a348-4e41-90c5-3f5915fa5997" />
<img width="610" height="1286" alt="c8faec99-6b4e-49e6-b270-81be3f8d4034" src="https://github.com/user-attachments/assets/01655d8b-dfee-430e-9eea-14857c93ff4b" />
<img width="610" height="1296" alt="0e7dad02-00f0-4771-9093-660d6e5c8eb9" src="https://github.com/user-attachments/assets/1343c24e-3b6b-4295-b472-c1cdf78ab929" />
<img width="614" height="1288" alt="57483883-49ef-4862-ae34-99128a495a6a" src="https://github.com/user-attachments/assets/c285f334-8df4-42e4-af42-8af72658d673" />

## 🚀 开发者心得

在开发本项目期间，我不仅担任了编码者的角色，更承担了**“技术导演”**的任务。我发现：AI 的介入将开发效率提升了近 300%，但开发者对业务逻辑的精准拆解和对技术方向的把控（如渲染引擎的选择）依然是决定项目成败的核心。

---
© 2026 黄琪辉 (SYSU-AI) | 基于 AI 协同开发实践

# 抖音直播界面脚本 使用说明

## 简介

本脚本用于屏蔽抖音直播页面中的礼物栏及相关干扰元素，提升观看体验。适用于各类用户脚本管理器，推荐使用 [脚本猫 ScriptCat](https://scriptcat.org/)。

## 推荐脚本管理器

**推荐使用 [脚本猫 ScriptCat](https://scriptcat.org/)。**

- ScriptCat 完全兼容 Tampermonkey 脚本格式，支持一键迁移。
- 提供更丰富的 API、后台脚本、云端同步、脚本商店等增强功能。
- 开源免费，支持多平台，安全可靠。
- 详细文档见：[脚本猫官方文档](https://docs.scriptcat.org/)

### 安装 ScriptCat

- [Chrome 扩展商店](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf)
- [Edge 扩展商店](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh)
- [Firefox 扩展商店](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/)
- [GitHub 下载](https://github.com/scriptscat/scriptcat/releases)

## 功能

- 自动隐藏抖音直播间的礼物栏、赠送按钮、充值按钮等相关元素。
- 自动关闭送礼信息和福袋口令。
- 自动点击“屏蔽礼物特效”后一个容器，进一步减少干扰。
- 对动态加载的页面元素同样有效。

## 安装方法

### 一键安装（推荐）

点击下方链接，使用脚本猫 ScriptCat 一键安装本脚本：

[一键安装抖音直播界面优化脚本](https://github.com/fangfuzha/Douyin-Interface-Optimizer/raw/main/%E6%8A%96%E9%9F%B3%E7%9B%B4%E6%92%AD%E7%95%8C%E9%9D%A2%E8%84%9A%E6%9C%AC.user.js)

> 如未安装脚本猫，请先前往 [脚本猫官网](https://scriptcat.org/) 安装扩展。

### 手动安装（补充）

1. 安装 [脚本猫 ScriptCat](https://scriptcat.org/) 浏览器扩展。
2. 点击“新建脚本”，将 `抖音直播界面脚本.js` 文件内容全部复制粘贴进去。
3. 保存脚本。
4. 访问 https://live.douyin.com/ 任意直播间，脚本会自动生效。

## 配置说明

如需自定义屏蔽的元素，可修改脚本中的 `屏蔽元素选择器列表`，添加或删除 CSS 选择器。

## 注意事项

- 本脚本仅在抖音网页版直播间生效。
- 若页面结构有较大变动，部分屏蔽功能可能失效，可根据实际情况调整选择器。

## 免责声明

本脚本仅供学习与个人使用，请勿用于商业用途。

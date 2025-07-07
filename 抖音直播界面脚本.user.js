// ==UserScript==
// @name         屏蔽抖音礼物栏
// @downloadURL  https://example.com/myscript.user.js
// @updateURL    https://example.com/myscript.user.js
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  屏蔽抖音直播界面的礼物栏和相关元素
// @author       fangfuzha
// @match        https://live.douyin.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // ====== 配置区 ======
  // 选择器列表
  const 屏蔽元素选择器列表 = [
    '.h9wtZ0fY', // 礼物栏容器
    '.gift_item_gift_bar', // 单个礼物项
    '[data-e2e="gift-btn"]', // 赠送按钮
    '[data-e2e="gifts-container"]', // 礼物容器
    '[data-e2e="gifts-switch"]', // 更多礼物按钮
    '[data-e2e="recharge-btn"]' // 充值按钮
  ];
  // 样式内容
  const 屏蔽样式内容 = `\n${屏蔽元素选择器列表.join(', ')} {\n  display: none !important;\n}`;

  // ====== 工具函数区 ======
  // 添加样式
  function 添加样式(css) {
    if (typeof GM_addStyle === 'function') { //如果GM_addStyle可用
      GM_addStyle(css); //使用GM_addStyle添加样式
    } else {
      const style = document.createElement('style'); //创建样式节点
      style.textContent = css; //设置样式内容
      document.head.appendChild(style); //将样式节点添加到文档头部
    }
  }
  // 隐藏指定元素节点下的所有目标元素
  function 隐藏目标元素(元素节点) {
    屏蔽元素选择器列表.forEach(元素选择器 => {
      const 匹配元素列表 = 元素节点.querySelectorAll(元素选择器);
      匹配元素列表.forEach(el => {
        el.style.display = 'none !important';
      });
    });
  }
  // 初始化隐藏页面已有目标元素
  function 初始化隐藏() {
    屏蔽元素选择器列表.forEach(元素选择器 => {
      const 匹配元素列表 = document.querySelectorAll(元素选择器);
      匹配元素列表.forEach(el => {
        el.style.display = 'none !important';
      });
    });
  }

  // 保持送礼信息始终关闭（只移除多余 class，不全量赋值）
  function 关闭送礼信息and福袋口令() {
    // 1. 只处理弹幕设置容器下的第4个弹幕设置项容器（E7wCEOQU）
    const 弹幕设置容器列表 = document.querySelectorAll('div.oUAvfk_K');
    弹幕设置容器列表.forEach(弹幕设置容器 => {
      const 弹幕设置项容器列表 = 弹幕设置容器.querySelectorAll('div.E7wCEOQU');
      [3].forEach(idx => {
        const 弹幕设置项容器 = 弹幕设置项容器列表[idx];
        if (!弹幕设置项容器) return;
        // 设置项
        const 设置项列表 = 弹幕设置项容器.querySelectorAll('div.i5Dc_A5T');
        设置项列表.forEach(设置项 => {
          // 按钮容器
          const 按钮容器列表 = 设置项.querySelectorAll('div.dNuSIvAp.K9BEa4Mr');
          按钮容器列表.forEach(按钮容器 => {
            // 只保留 dNuSIvAp 和 K9BEa4Mr
            按钮容器.classList.forEach(cls => {
              if (cls !== 'dNuSIvAp' && cls !== 'K9BEa4Mr') {
                按钮容器.classList.remove(cls);
              }
            });
            const 按钮内部滑块列表 = 按钮容器.querySelectorAll('div.Cri3cNdU');
            按钮内部滑块列表.forEach(btn => {
              btn.classList.forEach(cls => {
                if (cls !== 'Cri3cNdU') {
                  btn.classList.remove(cls);
                }
              });
            });
          });
        });
      });
    });
  }

  // 自动查找内容为“屏蔽礼物特效”并且同时拥有WoNKVQmY、Z20k_Nsy类的容器，并点击同一父类下一个容器
  function 自动点击屏蔽礼物特效后一个容器() {
    // 查找所有内容为“屏蔽礼物特效”的元素
    const 候选列表 = Array.from(document.querySelectorAll('.WoNKVQmY.Z20k_Nsy'));
    候选列表.forEach(el => {
      if (el.textContent.trim() === '屏蔽礼物特效') {
        const 父容器 = el.parentElement;
        if (!父容器) return;
        // 查找父容器的所有子元素
        const 兄弟节点 = Array.from(父容器.children);
        // 找到当前元素在父容器中的索引
        const idx = 兄弟节点.indexOf(el);
        if (idx !== -1 && idx < 兄弟节点.length - 1) {
          // 下一个兄弟节点
          const 下一个 = 兄弟节点[idx + 1];
          if (下一个 && typeof 下一个.click === 'function') {
            下一个.click();
          }
        }
      }
    });
  }

  // ====== 主流程 ======
  添加样式(屏蔽样式内容);

  // 处理动态加载的元素
  const 观察器 = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        const 新增节点列表 = mutation.addedNodes || [];
        for (let i = 0; i < 新增节点列表.length; i++) {
          if (新增节点列表[i].nodeType === 1) {
            隐藏目标元素(新增节点列表[i]);
          }
        }
        // 弹幕容器弹出时关闭
        关闭送礼信息and福袋口令();
        自动点击屏蔽礼物特效后一个容器();
      }
    });
  });

  初始化隐藏();

  if (document.body) {
    观察器.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    window.addEventListener('beforeunload', () => {
      观察器.disconnect();
    });
  }
})();
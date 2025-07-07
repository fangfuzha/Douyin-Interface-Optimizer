// ==UserScript==
// @name         抖音页面脚本
// @downloadURL  https://github.com/fangfuzha/Douyin-Interface-Optimizer/raw/main/%E6%8A%96%E9%9F%B3%E7%9B%B4%E6%92%AD%E7%95%8C%E9%9D%A2%E8%84%9A%E6%9C%AC.user.js
// @updateURL    https://github.com/fangfuzha/Douyin-Interface-Optimizer/raw/main/%E6%8A%96%E9%9F%B3%E7%9B%B4%E6%92%AD%E7%95%8C%E9%9D%A2%E8%84%9A%E6%9C%AC.user.js
// @namespace    https://github.com/fangfuzha/Douyin-Interface-Optimizer
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
  // 隐藏指定元素节点下的所有目标元素（保留）
  function 隐藏目标元素(元素节点) {
    屏蔽元素选择器列表.forEach(元素选择器 => {
      const 匹配元素列表 = 元素节点.querySelectorAll(元素选择器);
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
            if (按钮容器.classList.contains('SpsbqNUm')) {
              // 如果按钮为打开状态，自动点击关闭
              if (typeof 按钮容器.click === 'function') {
                按钮容器.click();
              }
              return;
            }
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
        // const 新增节点列表 = mutation.addedNodes || [];
        // for (let i = 0; i < 新增节点列表.length; i++) {
        //   if (新增节点列表[i].nodeType === 1) {
        //     隐藏目标元素(新增节点列表[i]);
        //   }
        // }
        // 以上注释内容非必要，但是保留以防万一

        // 弹幕容器弹出时关闭
        关闭送礼信息and福袋口令();
        自动点击屏蔽礼物特效后一个容器();
      }
    });
  });

  if (document.body) {
    观察器.observe(document.body, {
      childList: true, // 监听子节点变化
      subtree: true, // 监听所有子节点
      attributes: true, // 监听属性变化
      attributeFilter: ['class'] // 只监听 class 属性变化，减少性能消耗
    });
    // 页面卸载时断开观察器
    window.addEventListener('beforeunload', () => {
      观察器.disconnect();
    });
  }
})();
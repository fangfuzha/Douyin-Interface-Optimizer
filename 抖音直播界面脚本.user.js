// ==UserScript==
// @name         抖音页面脚本
// @downloadURL  https://github.com/fangfuzha/Douyin-Interface-Optimizer/raw/main/%E6%8A%96%E9%9F%B3%E7%9B%B4%E6%92%AD%E7%95%8C%E9%9D%A2%E8%84%9A%E6%9C%AC.user.js
// @updateURL    https://github.com/fangfuzha/Douyin-Interface-Optimizer/raw/main/%E6%8A%96%E9%9F%B3%E7%9B%B4%E6%92%AD%E7%95%8C%E9%9D%A2%E8%84%9A%E6%9C%AC.user.js
// @namespace    https://github.com/fangfuzha/Douyin-Interface-Optimizer
// @version      1.0
// @description  屏蔽抖音直播界面的礼物栏和相关元素
// @author       fangfuzha
// @license      MIT
// @supportURL   https://github.com/fangfuzha/Douyin-Interface-Optimizer/issues
// @match        https://www.douyin.com*
// @match        https://live.douyin.com/*
// @require      https://cdn.jsdelivr.net/gh/fangfuzha/Douyin-Interface-Optimizer@main/utils.js
// @grant        GM_addStyle
// ==/UserScript==

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
const 元素屏蔽样式 = `\n${屏蔽元素选择器列表.join(', ')} {\n  display: none !important;\n}`;

// 关闭送礼信息and福袋口令相关类名配置
const 关闭送礼信息相关类名 = {
  正常访问: {
    弹幕总设置容器: 'div.oUAvfk_K',
    弹幕分类设置项容器: 'div.E7wCEOQU',
    最小设置项: 'div.i5Dc_A5T',
    按钮容器: 'div.dNuSIvAp.K9BEa4Mr',
    打开状态类: 'SpsbqNUm'
  },
  SPA跳转: {
    弹幕总设置容器: 'div.DeXn1KJk',
    弹幕分类设置项容器: 'div.wxnfdyi0',
    最小设置项: 'div.fo1NsCjd',
    按钮容器: 'div.rfBZx4SZ.fdeeDPHF',
    打开状态类: 'LZHDb0Bh'
  }
};

// 切换画质相关类名配置
const 切换画质相关类名 = {
  正常访问: {
    当前画质元素: '[data-e2e="quality"]',
    画质选择器: '[data-e2e="quality-selector"]',
    画质选项: '.NsCkThfl',
    画质文本: '.D7UhJyco',
    可点击元素: '.PAeJVT8Y',
    目标画质: '原画'
  },
  SPA跳转: {
    当前画质元素: '[data-e2e="quality"]',
    画质选择器: '[data-e2e="quality-selector"]',
    画质选项: '.RC5nBmmY',
    画质文本: '.xJMJ5DRo',
    可点击元素: '.w1CXlaOs',
    目标画质: '原画'
  }
};

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
  const cfg = 关闭送礼信息相关类名.正常访问;
  const 弹幕总设置容器 = document.querySelectorAll(cfg.弹幕总设置容器);
  弹幕总设置容器.forEach(弹幕设置容器 => {
    const 弹幕分类设置项容器列表 = 弹幕设置容器.querySelectorAll(cfg.弹幕分类设置项容器);
    [3].forEach(idx => {
      const 送礼信息和福袋口令设置容器 = 弹幕分类设置项容器列表[idx];
      if (!送礼信息和福袋口令设置容器) return;
      const 最小设置项列表 = 送礼信息和福袋口令设置容器.querySelectorAll(cfg.最小设置项);
      最小设置项列表.forEach(设置项 => {
        const 按钮容器列表 = 设置项.querySelectorAll(cfg.按钮容器);
        按钮容器列表.forEach(按钮容器 => {
          if (按钮容器.classList.contains(cfg.打开状态类)) {
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

// SPA跳转时适配新结构
function 关闭送礼信息and福袋口令_spa跳转页面() {
  const cfg = 关闭送礼信息相关类名.SPA跳转;
  const 弹幕总设置容器 = document.querySelectorAll(cfg.弹幕总设置容器);
  弹幕总设置容器.forEach(弹幕设置容器 => {
    const 弹幕分类设置项容器列表 = 弹幕设置容器.querySelectorAll(cfg.弹幕分类设置项容器);
    [3].forEach(idx => {
      const 送礼信息和福袋口令设置容器 = 弹幕分类设置项容器列表[idx];
      if (!送礼信息和福袋口令设置容器) return;
      const 最小设置项列表 = 送礼信息和福袋口令设置容器.querySelectorAll(cfg.最小设置项);
      最小设置项列表.forEach(设置项 => {
        const 按钮容器列表 = 设置项.querySelectorAll(cfg.按钮容器);
        按钮容器列表.forEach(按钮容器 => {
          if (按钮容器.classList.contains(cfg.打开状态类)) {
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

// 通用：点击指定元素在父容器下的下一个兄弟节点
function 点击下一个兄弟节点(当前元素) {
  if (!当前元素) return;
  const 父容器 = 当前元素.parentElement;
  if (!父容器) return;
  const 兄弟节点 = Array.from(父容器.children);
  const idx = 兄弟节点.indexOf(当前元素);
  if (idx !== -1 && idx < 兄弟节点.length - 1) {
    const 下一个 = 兄弟节点[idx + 1];
    if (下一个 && typeof 下一个.click === 'function') {
      下一个.click();
    }
  }
}

// 自动查找内容为“屏蔽礼物特效”并且同时拥有WoNKVQmY、Z20k_Nsy类的容器，并点击同一父类下一个容器
function 自动点击屏蔽礼物特效后一个容器() {
  const 候选列表 = Array.from(document.querySelectorAll('.WoNKVQmY.Z20k_Nsy'));
  候选列表.forEach(候选项 => {
    if (候选项.textContent.trim() === '屏蔽礼物特效') {
      utils.clickNextSibling(候选项);
    }
  });
}

// 新结构：PyUjXuWV hRnC6O2k
function 自动点击屏蔽礼物特效后一个容器_spa跳转页面() {
  const 候选列表 = Array.from(document.querySelectorAll('.PyUjXuWV.hRnC6O2k'));
  候选列表.forEach(候选项 => {
    if (候选项.textContent.trim() === '屏蔽礼物特效') {
      utils.clickNextSibling(候选项);
    }
  });
}

function 自动切换到原画画质() {
  const cfg = 切换画质相关类名.正常访问;
  const 当前画质元素 = document.querySelector(cfg.当前画质元素);
  if (!当前画质元素) return;
  const 当前画质 = 当前画质元素.textContent.trim();
  if (当前画质 === cfg.目标画质) return;
  const 画质选择器 = document.querySelector(cfg.画质选择器);
  if (!画质选择器) return;
  const 画质选项列表 = 画质选择器.querySelectorAll(cfg.画质选项);
  画质选项列表.forEach(画质选项 => {
    const 画质文本元素 = 画质选项.querySelector(cfg.画质文本);
    if (画质文本元素 && 画质文本元素.textContent.trim() === cfg.目标画质) {
      const 可点击元素 = 画质选项.querySelector(cfg.可点击元素) || 画质选项;
      if (可点击元素 && typeof 可点击元素.click === 'function') {
        setTimeout(() => {
          可点击元素.click();
          当前画质元素.textContent = cfg.目标画质;
          console.log('已自动切换到原画画质');
        }, 100);
      }
    }
  });
}

function 自动切换到原画画质_spa跳转页面() {
  const cfg = 切换画质相关类名.SPA跳转;
  const 当前画质元素 = document.querySelector(cfg.当前画质元素);
  if (!当前画质元素) return false;
  const 当前画质 = 当前画质元素.textContent.trim();
  if (当前画质 === cfg.目标画质) return true;
  const 画质选择器 = document.querySelector(cfg.画质选择器);
  if (!画质选择器) return false;
  const 画质选项列表 = 画质选择器.querySelectorAll(cfg.画质选项);
  画质选项列表.forEach(画质选项 => {
    const 画质文本元素 = 画质选项.querySelector(cfg.画质文本);
    if (画质文本元素 && 画质文本元素.textContent.trim() === cfg.目标画质) {
      const 可点击元素 = 画质选项.querySelector(cfg.可点击元素) || 画质选项;
      if (可点击元素 && typeof 可点击元素.click === 'function') {
        setTimeout(() => {
          可点击元素.click();
          当前画质元素.textContent = cfg.目标画质;
          console.log('已自动切换到原画画质（spa跳转界面）');
        }, 100);
      }
    }
  });
}


// 防抖函数，当函数在指定时间内不被调用，则执行该函数
function 防抖(函数, 延时) {
  let 定时器 = null;
  return function (...args) {
    if (定时器) clearTimeout(定时器); // 清除上一次的定时器
    定时器 = setTimeout(() => { // 设置新的定时器
      函数.apply(this, args); // 定时器到期后执行函数
    }, 延时);
  };
}

function 主流程启动(是否SPA跳转 = false) {
  添加样式(元素屏蔽样式);
  if (window.__抖音脚本_观察器) {
    window.__抖音脚本_观察器.disconnect();
  }
  // 防抖回调，200ms
  const 变更处理函数 = 防抖(function () {
    if (是否SPA跳转) {
      关闭送礼信息and福袋口令_spa跳转页面();
      自动点击屏蔽礼物特效后一个容器_spa跳转页面();
      自动切换到原画画质_spa跳转页面();
    } else {
      关闭送礼信息and福袋口令();
      自动点击屏蔽礼物特效后一个容器();
      自动切换到原画画质();
    }
  }, 200);
  const 观察器 = new MutationObserver((变更列表) => {
    let 需要处理 = false; //为防抖服务
    for (const 变更 of 变更列表) {
      if (变更.type === 'childList' || 变更.type === 'attributes') {
        需要处理 = true;
        break;
      }
    }
    if (需要处理) 变更处理函数();
  });
  if (document.body) {
    观察器.observe(document.body, {
      childList: true, // 监听子节点
      subtree: true, // 监听所有子孙节点
      attributes: true,
      attributeFilter: ['class'] // 只监听class属性的变化
    });
    window.addEventListener('beforeunload', () => {
      观察器.disconnect();
    });
  }
  window.__抖音脚本_观察器 = 观察器;
}

(function () {
  'use strict'; //启用严格模式，防止变量提升和其他问题

  let 上次页面地址 = location.href;
  主流程启动(false);

  function 触发页面跳转检测() {
    // 延时检测，避免页面还未完全加载
    setTimeout(() => {
      if (location.href !== 上次页面地址) {
        上次页面地址 = location.href;
        主流程启动(true);
      }
    }, 50);
  }

  // 劫持history的pushState和replaceState方法
  // 适配SPA跳转
  const 原始_pushState = history.pushState;
  const 原始_replaceState = history.replaceState;
  history.pushState = function () {
    原始_pushState.apply(this, arguments); // 调用原始方法
    触发页面跳转检测(); // 触发页面跳转检测
  };
  history.replaceState = function () {
    原始_replaceState.apply(this, arguments); // 调用原始方法
    触发页面跳转检测(); // 触发页面跳转检测
  };
  // 监听popstate事件，当浏览器会话历史发生变化时触发
  window.addEventListener('popstate', 触发页面跳转检测);
})();
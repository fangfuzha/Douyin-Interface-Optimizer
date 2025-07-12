// utils 命名空间
const utils = {
  /**
   * 防抖函数，当函数在指定时间内不被调用，则执行该函数
   * @param {Function} 函数 - 需要防抖的函数
   * @param {number} 延时 - 防抖延迟（毫秒）
   * @returns {Function}
   */
  防抖: function (函数, 延时) {
    let 定时器 = null;
    return function (...args) {
      if (定时器) clearTimeout(定时器);
      定时器 = setTimeout(() => {
        函数.apply(this, args);
      }, 延时);
    };
  },

  /**
   * 点击指定元素在父容器下的下一个兄弟节点
   * @param {Element} currentEl - 当前元素
   */
  点击下一个兄弟节点: function (currentEl) {
    if (!currentEl) return;
    const parent = currentEl.parentElement;
    if (!parent) return;
    const siblings = Array.from(parent.children);
    const idx = siblings.indexOf(currentEl);
    if (idx !== -1 && idx < siblings.length - 1) {
      const next = siblings[idx + 1];
      if (next && typeof next.click === 'function') {
        next.click();
      }
    }
  },

  /**
   * 向页面添加样式
   * @param {string} css - 样式内容
   */
  添加样式: function (css) {
    if (typeof GM_addStyle === 'function') { //如果GM_addStyle可用
      GM_addStyle(css); //使用GM_addStyle添加样式
    } else {
      const style = document.createElement('style'); //创建样式节点
      style.textContent = css; //设置样式内容
      document.head.appendChild(style); //将样式节点添加到文档头部
    }
  },

  /**
   * 隐藏指定元素节点下的所有目标元素
   * @param {Element} rootEl - 根节点
   * @param {string[]} selectorList - 选择器数组
   */
  隐藏目标元素: function (rootEl, selectorList) {
    selectorList.forEach(selector => {
      const matches = rootEl.querySelectorAll(selector);
      matches.forEach(el => {
        el.style.display = 'none !important';
      });
    });
  }
};

// utils 命名空间
const utils = {
  /**
   * 防抖函数，当函数在指定时间内不被调用，则执行该函数
   * @param {Function} fn - 需要防抖的函数
   * @param {number} delay - 防抖延迟（毫秒）
   * @returns {Function}
   */
  debounce: function (fn, delay) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  },

  /**
   * 点击指定元素在父容器下的下一个兄弟节点
   * @param {Element} currentEl - 当前元素
   */
  clickNextSibling: function (currentEl) {
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
  addStyle: function (css) {
    if (typeof GM_addStyle === 'function') {
      GM_addStyle(css);
    } else {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    }
  },

  /**
   * 隐藏指定元素节点下的所有目标元素
   * @param {Element} rootEl - 根节点
   * @param {string[]} selectorList - 选择器数组
   */
  hideTargetElements: function (rootEl, selectorList) {
    selectorList.forEach(selector => {
      const matches = rootEl.querySelectorAll(selector);
      matches.forEach(el => {
        el.style.display = 'none !important';
      });
    });
  }
};

// 导出 utils 对象作为命名空间
export default utils;

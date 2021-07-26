# 小程序

## 防抖节流

函数防抖和函数节流都是老生常谈的问题了。这两种方式都能优化 js 的性能。有些人可能会搞混两个的概念。所以，我以自己的理解，来解释这两个概念的含义。并且列举在小程序中这两个方法的使用。

函数防抖： 英文 debounce 有防反跳的意思，大致就是指防止重复触发。

那么，函数防抖，真正的含义是：延迟函数执行。即不管 debounce 函数触发了多久，只在最后一次触发 debounce 函数时，才定义 setTimeout，到达间隔时间再执行 需要防抖的函数。

用处：多用于 input 框 输入时，显示匹配的输入内容的情况。

函数节流： 英文 throttle 有节流阀的意思。大致意思也是 节约触发的频率

那么，函数节流，真正的含义是：单位时间 n 秒内，第一次触发函数并执行，以后 n 秒内不管触发多少次，都不执行。直到下一个单位时间 n 秒，第一次触发函数并执行，这个 n 秒内不管函数多少次都不执行。

用处：多用于页面 scroll 滚动，或者窗口 resize，或者防止按钮重复点击等情况

其实如果只根据 控制函数触发的频率是不好区分这两个概念的。我认为两个函数都能达到防止重复触发的功能。但是函数防抖是 n 秒后延迟执行；而函数节流是立马执行，n 秒后再立马执行。

在小程序中，函数防抖、函数节流的使用方式：

一般都会把这两种方法封装在公用的 js 中：

```js
/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0; //触发的时间
  var gapTime = interval || 300; //间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context, args);
    }, gapTime);
  };
}

export default {
  throttle,
  debounce,
};
```

使用：

```js
import tool from "../../static/js/tool.js";
Page({
  data: {
    win_scrollTop: 0,
  },
  onPageScroll: tool.throttle(function(msg) {
    this.setData({
      win_scrollTop: msg[0].scrollTop,
    });
  }),
  gotoUnlock: tool.debounce(function() {
    this.saveUserInfo();
  }),
  saveUserInfo: function() {
    console.log(111);
  },
});
```

上面的两种方式只是精简版的，可能还有某些情况没考虑到，以后遇到了再优化。

函数节流的说明：

（1） 第一次执行时，是一定能执行函数的。

（2） 然后 n 秒内第二次触发的时候，当第一次与第二次间隔不足 设置的间隔时间时，就不会执行。之后第三、第四次触发还是不执行。

（3） 直到 n 秒之后 有且仅有一次，并且是第一次再次触发函数。

函数防抖的说明：

（1） 第一次触发函数时，定义了一个定时器。在 n 秒后执行。

（2） 然后 函数第二次触发的时候，由于闭包的特性，这时候的 timer 已经是第一次触发时的 定时器的标识了。然后直接清除第一次的 setTimeout，这时候第一次的 setTimeout 里面的内容就不会执行了。然后再定义第二次的 setTimeout。

（3） 然后重复第二个步骤，一直清除，又一直设置。直到函数最后一次触发，定义了最后的一个定时器，并且间隔 n 秒 执行。

（4） 如果在 最后一个定时器没执行时，函数又触发了，那么又重复第三步。相当于 设置的间隔时间，只是延迟函数执行的时间，而不是间隔多少秒再执行。

到这里，这两个方式的区别就很明显了。函数节流是减少函数的触发频率，而函数防抖则是延迟函数执行，并且不管触发多少次都只执行最后一次。

## 图片缓存策略

例子[传送门](https://www.jianshu.com/p/65710ab69c3b/)

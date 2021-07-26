# vue 常用插件

## JsBarcode 条形码

JsBarcode 条形码 文档[传送门](https://github.com/lindell/JsBarcode/)

1、命令：

```bash
npm install jsbarcode --save
```

2、引入：

```html
<script src="https://www.jq22.com/jquery/vue.min.js"></script>
<script src="js/JsBarcode.all.min.js"></script>
<!--  安装了依赖可不引入 -->
```

### 使用例子

First create a canvas (or image)

```html
<svg id="barcode"></svg>
<!-- or -->
<canvas id="barcode"></canvas>
<!-- or -->
<img id="barcode" />
```

简单使用例子:

```js
JsBarcode("#barcode", "1234", {
  format: "pharmacode",
  lineColor: "#0aa",
  width: 4,
  height: 40,
  displayValue: false,
});
```

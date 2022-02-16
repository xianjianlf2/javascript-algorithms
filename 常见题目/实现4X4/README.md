> 动态生成4x4表格，每个表格中有坐标（0,0）-（3,3）点击格增加次数，且每个格子互不干扰，次数通过弹窗显示

### 首先定义基础页面

```html
<div id="container">
    <div></div>
    ...
    <div></div>
</div>
```

```css
#container {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    background: purple;
}
/* 40*4+8*5=200 */
#container > div {
    width: 40px;
    height: 40px;
    background: #fff;
    margin-top: 8px;
    margin-left: 8px;
    /* 把格子横过来，且超出的格子，自动换行 */
    float: left;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
}
```

![image-20220216150807937](https://gitee.com/mark_xian/graphic-bed/raw/master/202202161508203.png)

### 动态生成16个格子

```js
var div = document.getElementById('container')
for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 4; c++) {
        var cell = document.createElement('div')
        cell.innerText = `(${r},${c})`
        div.appendChild(cell)
    }
}
```

添加点击事件

- 每个格子互不干扰（闭包问题）

> 方案一
>
> 给每个格子添加点击事件处理函数，每个处理函数来自于一个闭包的外层函数调用的返回值，且闭包会保存变量n，记录当前格子的点击次数

- 优点：实现了变量隔离
- 缺点：每个格子之间完全隔离，无法完成像2048游戏的操作

```js
cell.onclick = (function () {
    var n = 0 //用外层函数保护变量，当前格子的点击次数
    return function () {
        //返回内层函数
        n++
        alert(`点击了${n}次`)
    }
})() //调用外层函数
```

> 方案二
>
> 看到二维布局，2048或者消消乐，都应该使用二维数组来存储所有格子的值
>
> 每个按钮的单击事件处理函数中应该只保存自己对应的元素下标位置。当点击时，通过自己保存的行列号来找到自己所处二维数组的位置，修改其元素值

- 优点：所有格子的值利用一个二维数组管理，可以后续做其他操作
- 缺点：二维数组在全局变量声明，容易被直接访问

```js
var arr = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
]
```

```js
 cell.onclick = (function (r, c) {
            return function () {
              arr[r][c]++
              alert(`点击了${arr[r][c]}次`)
            }
 })(r, c) //将外部循环过程中r,c的值传入
```



> 方案三
>
> 在方案二的基础上，在最外层添加匿名函数自调，arr数组成了私有变量，外部不可访问到
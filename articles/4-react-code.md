title:
date: 2017.09.20
---

```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

先从入口开始，reactDom暴露了六个方法。
```js
//ReactDom.js
var ReactDOM = {
  findDOMNode: findDOMNode,
  render: ReactMount.render,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: ReactVersion,

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
  /* eslint-enable camelcase */
};
```
ReactDom对外暴露的render实际是reactMount里的render方法。
reactMount通过创建具有代表性的DOM元素并将其插入到提供的容器中来初始化响应组件的过程。“容器”中的任何先前内容在该过程中被销毁。
```js
//ReactMount.js
//render方法接受3个参数。html元素，container容器，和回调函数。
render: function (nextElement, container, callback) {
    return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
}
//calback可传可不传，传进去的必须是function
```
_renderSubtreeIntoContainer里头会执行以下动作，对应parentComponent, nextElement, container, callback4个参数
 - ReactUpdateQueue.validateCallback 它会检测callback是否为function或者不存在的情况，若不是这两种报提示错误
 - React.isValidElement 它会检测nextElement是否传的是元素标签形式，或者组件形式<Foo />这么传
 - 将nextElement通过var nextWrappedElement = React.createElement(TopLevelWrapper, {child: nextElement})封装成了obj，将nextElement挂载到wrapper的props属性下，将topTopLevelWrapper 注入到obj.type中。
 ```js
 var TopLevelWrapper = function () {
  this.rootID = topLevelRootCounter++;
};。
```
 - prevComponent：获取要插入到的容器的前一次的ReactComponent，对于ReactDOM.render()调用，prevComponent为null
 - nextContext：若没有prevComponent 返回{}
 - reactRootElement 获取contianer内的元素，如果是元素节点返回firstchild，若是文档根节点返回documentElement，首次reactDom加载，null元素节点
 - containerHasReactMarkup 根据reactRootElement来判断是否null
 - containerHasNonRootReactChild 根据reactRootElement来判断是否undefined


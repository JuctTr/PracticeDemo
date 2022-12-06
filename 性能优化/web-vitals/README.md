# Web-vitals

## 使用

### 基本使用

Web Vitals 的每一个指标都被暴露为一个单独的函数，该函数接收一个回调函数，该函数将在指标值可用并准备报告时被调用。

下面的例子测量每个核心Web Vitals指标，并在其值准备好上报后将结果记录到控制台。

下面的例子导入了 "standard "build，但它们也适用于 "attribution"build。

```javascript
import {onCLS, onFID, onLCP} from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
```

请注意，其中一些指标是在用户与页面互动、切换标签或页面开始卸载时才会报告。如果你没有立即看到记录到控制台的数值，请尝试重新加载页面（启用保存日志）或切换标签，然后再切换回来。

另外，在某些情况下，一个指标回调可能永远不会被调用。

- 如果用户从未与该页面互动，那么不会报告（打印）FID。
- 如果是在后台加载的，那么不会报告（打印）CLS、FCP、FID和LCP。

在其他情况下，一个指标回调可能会被调用一次以上。

- 当页面的[`visibilityState`](https://developer.chrome.com/blog/page-lifecycle-api/#advice-hidden)改变为`hidden`时，CLS应该被报告。
- 在页面从[后退/前进缓存](https://web.dev/bfcache/)中恢复后，所有的指标都会被再次报告（除了上述例外）。

> 注意：
>
> 不要在每次页面加载时调用任何Web Vitals函数（例如onCLS()、onFID()、onLCP()）超过一次。这些函数中的每一个都会创建一个PerformanceObserver实例，并在页面的生命周期内注册事件监听器。虽然调用这些函数一次的开销可以忽略不计，但在同一个页面上重复调用它们最终可能会导致内存泄漏。

## 每次变化时报告数值

大多数情况下，你只希望回调函数在指标准备好被报告时被调用。然而，通过在可选的配置对象（第二个参数）中设置reportAllChanges为true，可以报告每一个变化（例如，每一个布局转变发生时）。

这在调试时可能很有用，但一般来说，在生产环境中测量这些指标时，不需要/不建议使用reportAllChanges。

## 只报告变化的delta

有些分析供应商允许你更新一个指标的值，甚至在你已经把它发送到他们的服务器之后（用相同的ID覆盖以前发送的值）。



然而，另外其他分析供应商不允许这样做，所以你不需要报告新的值，而只需要报告delta（当前值和最后报告的值之间的差异）。然后，你可以通过将所有以相同ID发送的指标deltas相加来计算总价值。



```javascript
import {onCLS, onFID, onLCP} from 'web-vitals';

function logDelta({name, id, delta}) {
  console.log(`${name} matching ID ${id} changed by ${delta}`);
}

onCLS(logDelta);
onFID(logDelta);
onLCP(logDelta);
```

>  注意：在第一次调用回调函数时，其值和delta属性将是相同的。

除了使用id字段来分组同一指标的多个deltas之外，它还可以用来区分同一页面上报告的不同指标。例如，在后退/前进缓存恢复后，一个新的指标对象被创建，有一个新的id（因为后退/前进缓存恢复被认为是独立的页面访问）。



## 将结果发送到一个分析端点

下面的例子测量每个核心Web Vitals指标，并在每个指标准备好被发送时将其上报给一个假设的/analytics终端。

`sendToAnalytics()`函数使用`navigator.sendBeacon()`方法（如果有的话），但在没有的情况下会降级到`fetch()`API。

```javascript
import {onCLS, onFID, onLCP} from 'web-vitals';

function sendToAnalytics(metric) {
  // Replace with whatever serialization method you prefer.
  // Note: JSON.stringify will likely include more data than you need.
  const body = JSON.stringify(metric);

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
      fetch('/analytics', {body, method: 'POST', keepalive: true});
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
```

## 将结果发送到`Google Analytics`

Google Analytics不支持在其任何内置报告中上报指标分布情况；但是，如果你在发送给Google Analytics的每个指标实例上设置一个唯一的维度值（在这种情况下，指标ID，如下面的例子所示），你可以使用[Google Analytics Reporting API](https://developers.google.com/analytics/devguides/reporting)和你选择的任何数据可视化库自己创建一个报告。

作为一个例子，Web Vitals Report是一个免费的开源工具，你可以用它来创建你发送给Google Analytics的Web Vitals数据的可视化。

为了使用Web Vitals Report（或使用API建立您自己的自定义报告），您需要按照下面概述的例子之一将您的数据发送到Google Analytics。



### 使用 `analytics.js`

```javascript
import {onCLS, onFID, onLCP} from 'web-vitals';

function sendToGoogleAnalytics({name, delta, id}) {
  // Assumes the global `ga()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/analyticsjs
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    eventLabel: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true,
    // Use `sendBeacon()` if the browser supports it.
    transport: 'beacon',

    // OPTIONAL: any additional attribution params here.
    // See: https://web.dev/debug-performance-in-the-field/
    // dimension1: '...',
    // dimension2: '...',
    // ...
  });
}

onCLS(sendToGoogleAnalytics);
onFID(sendToGoogleAnalytics);
onLCP(sendToGoogleAnalytics);
```

### 使用 `gtag.js` (Universal Analytics)

```javascript
import {onCLS, onFID, onLCP} from 'web-vitals';

function sendToGoogleAnalytics({name, delta, id}) {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/gtagjs
  gtag('event', name, {
    event_category: 'Web Vitals',
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    non_interaction: true,

    // OPTIONAL: any additional attribution params here.
    // See: https://web.dev/debug-performance-in-the-field/
    // dimension1: '...',
    // dimension2: '...',
    // ...
  });
}

onCLS(sendToGoogleAnalytics);
onFID(sendToGoogleAnalytics);
onLCP(sendToGoogleAnalytics);
```



### 将结果发送到`Google Tag Manager` 

使用 Google Tag Manager 测量Web Vitals指标的推荐方法是使用由Simo Ahava创建和维护的Core Web Vitals定制模板标签。

有关完整的安装和使用说明，请参阅Simo的帖子：[用Google Tag Manager追踪GA4中的核心Web Vitals](https://www.simoahava.com/analytics/track-core-web-vitals-in-ga4-with-google-tag-manager/)。



。。。。。。。。。。。

。。。。。。。。。。。

### 批量上报

与其单独报告每个单独的 Web Vitals 指标，您可以通过在单个网络请求中批量处理多个指标报告来尽量减少网络使用。

然而，由于并非所有的Web Vitals指标都同时可用，而且并非所有的指标都在每个页面上报告，因此您不能简单地延迟上报，直到所有指标都可用。

相反，你应该保留一个所有被报告指标的队列，并在页面进入后台或卸载时刷新该队列：

```javascript
import {onCLS, onFID, onLCP} from 'web-vitals';

const queue = new Set();
function addToQueue(metric) {
  queue.add(metric);
}

function flushQueue() {
  if (queue.size > 0) {
    // Replace with whatever serialization method you prefer.
    // Note: JSON.stringify will likely include more data than you need.
    const body = JSON.stringify([...queue]);

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
    (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
          fetch('/analytics', {body, method: 'POST', keepalive: true});

    queue.clear();
  }
}

onCLS(addToQueue);
onFID(addToQueue);
onLCP(addToQueue);

// Report all available metrics whenever the page is backgrounded or unloaded.
addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    flushQueue();
  }
});

// NOTE: Safari does not reliably fire the `visibilitychange` event when the
// page is being unloaded. If Safari support is needed, you should also flush
// the queue in the `pagehide` event.
addEventListener('pagehide', flushQueue);
```

> 注意：
>
> 关于为什么推荐visibilitychange和pagehide而不是beforeunload和unload这样的事件，请参见[页面生命周期指南](https://developer.chrome.com/blog/page-lifecycle-api/#legacy-lifecycle-apis-to-avoid)。



### polyfill如何工作



。。。。。

web-vitals库的 "standard"build 包括一些在polyfill.js中发现的相同逻辑。为了避免在使用 "base+polyfill "构建时重复这些代码，web-vitals.base.js捆绑包不包括任何polyfill逻辑，而是与polyfill.js中的代码进行协调，这就是为什么这两个脚本必须一起使用。














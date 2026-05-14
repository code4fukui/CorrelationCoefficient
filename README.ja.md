# CorrelationCoefficient

アンケートの設問間の相関係数を計算します。

## 使い方

```js
import { CSV } from "https://js.sabae.cc/CSV.js";
import { calcCorrelationCoefficient } from "./calcCorrelationCoefficient.js";

const qs = await CSV.fetchJSON("test-format.csv");
const list = await CSV.fetchJSON("test-data.csv");

const res = calcCorrelationCoefficient(qs, list);
console.log(res, list.length);
await Deno.writeTextFile("test-cc.csv", CSV.stringify(res));
```

## 参考

- [相関係数の意味と求め方 - 公式と計算例](https://sci-pursuit.com/math/statistics/correlation-coefficient.html)

## ライセンス

MIT License

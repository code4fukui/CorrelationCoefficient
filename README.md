# CorrelationCoefficient 相関係数

```sh
deno run -A calcTest.js
```

## Usage

```js
import { CSV } from "https://js.sabae.cc/CSV.js";
import { calcCorrelationCoefficient } from "./calcCorrelationCoefficient.js";

const qs = await CSV.fetchJSON("test-format.csv");
// 書式 S:単数回答　I:数値回答　M:複数回答　F:自由回答 N:数値
const list = await CSV.fetchJSON("test-data.csv");

const res = calcCorrelationCoefficient(qs, list);
console.log(res, list.length);
await Deno.writeTextFile("test-cc.csv", CSV.stringify(res));
```

## Reference

- [相関係数の意味と求め方 - 公式と計算例](https://sci-pursuit.com/math/statistics/correlation-coefficient.html)

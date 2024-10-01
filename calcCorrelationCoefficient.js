// 書式 S:単数回答　I:数値回答　M:複数回答　F:自由回答 N:数値

// threshold
// 0.7 強い相関
// 0.4 相関
// 0.2 弱い相関

export const calcCorrelationCoefficient = (qs0, list, threshold = 0.4) => {
  const qs = qs0.filter(i => i.書式 != "F");
  for (const q of qs) {
    //console.log(q);
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let sum = 0;
    const nq = q["No."] || q["設問"];
    for (const item of list) {
      const n = parseInt(item[nq]);
      if (n < min) min = n;
      if (n > max) max = n;
      sum += n;
    }
    const ave = sum / list.length;
    let sum2 = 0;
    for (const item of list) {
      const d = parseInt(item[nq]) - ave;
      sum2 += d * d;
    }
    const s = Math.sqrt(sum2 / list.length);
    q.ave = ave;
    q.s = s;
    q.min = min;
    q.max = max;

    //console.log(nq, q["設問"], min, max, ave, s);
  }
  const res = [];
  for (const q of qs) {
    const ss = [];
    for (const q2 of qs) {
      if (q == q2) continue;
      let sum3 = 0;
      for (const item of list) {
        const d1 = parseInt(item[q["No."] || q["設問"]]) - q.ave;
        const d2 = parseInt(item[q2["No."] || q2["設問"]]) - q2.ave;
        sum3 += d1 * d2;
      }
      const s2 = sum3 / list.length / (q.s * q2.s);
      ss.push({ n: q2["No."] || q2["設問"], s2 });
    }
    const ss2 = ss.sort((a, b) => Math.abs(b.s2) - Math.abs(a.s2)).filter(i => Math.abs(i.s2) >= threshold);
    //console.log(q["No."], q["設問"], q.ave, q.s, ss[0], qs.find(i => i["No."] == ss[0].n)["設問"]);
    const f = n => n.toFixed(2);
    const r = {
      "No.": q["No."],
      "設問": q["設問"],
      "最小": q.min,
      "最大": q.max,
      "平均": f(q.ave),
      "分散": f(q.s),
    };
    if (q["No."] === undefined) delete r["No."];
    let idx = 1;
    for (const s of ss2) {
      const a = qs.find(i => i["No."] == s.n || i["設問"] == s.n);
      r["相関係数" + idx + "の設問"] = (a["No."] ? a["No."] + " " : "") + a["設問"];
      r["相関係数" + idx] = f(s.s2);
      idx++;
    }
    res.push(r);
  }
  return res;
};

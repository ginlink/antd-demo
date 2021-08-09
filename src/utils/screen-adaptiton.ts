import { css } from 'styled-components/macro'
enum ADAPTION_MODE_VALUE {
  all = 0, // 转化所有px为vw
  media = 1, // 只转化媒体查询的px为vw
  out = 2, // TODO 只转化除媒体查询外的px为vw
}

/**************配置**************** */

// eslint-disable-next-line prefer-const
let ADAPTION_MODE = ADAPTION_MODE_VALUE.media // 转化模式，默认为媒体查询
const DESIGNED_MEASURE = 375 // 设计稿尺寸
const MIN_PX = 1 // 最小转化值，例如：小于等于1px则不处理

// vscode批量替换迁移方法
// ((?<=[\)vn])`[\s\S\r]*?`)
// (\n  ...t$1\n)

/**************配置**************** */

const PX_REG = /(\d+)px(?!\))/ // px匹配正则
// const MEDIA_REG = /{[^}]+\}/ // 媒体查询匹配正则
const MEDIA_REG = /\@media[\s\S\r]*?{[^}]+\}/ // 媒体查询匹配正则

// 绕过ts类型检查而创建的类
// A spread argument must either have a tuple type or be passed to a rest parameter.
export type MyTemplateStringsArrayTuple = [MyTemplateStringsArray, MyTemplateStringsArray]
export class MyTemplateStringsArray extends Array {
  raw = []

  constructor(initialArr: any[]) {
    super()

    initialArr.forEach((e, i) => {
      this[i] = e
    })
  }
}

const px2vw = (pixels: string | number | TemplateStringsArray) => {
  if (pixels instanceof Array) {
    // 从模板中拿去值
    pixels = pixels[0]
  }

  const num = parseInt(pixels as string)
  if (num <= MIN_PX) return `${num}left` // left占位，否则死循环

  return `${((num / DESIGNED_MEASURE) * 100).toFixed(3)}vw`
  // 结果保留三位小数
}

const allPx2vw = (stylesStr: string) => {
  let res: string = stylesStr

  const pxMatchReg = new RegExp(PX_REG)

  while (pxMatchReg.test(res)) {
    const pxMatchResult = pxMatchReg?.exec(res)
    if (!pxMatchResult) continue

    res = res.replace(PX_REG, `${px2vw(pxMatchResult[1])}`)
  }

  // 把占位符替换回来
  res = res.replace(/left/g, 'px')

  return res
}

const mediaPx2vw = (stylesStr: string) => {
  const mediaReg = new RegExp(MEDIA_REG)
  while (mediaReg.test(stylesStr)) {
    let mediaRegResult = mediaReg?.exec(stylesStr)?.[0]
    if (!mediaRegResult) continue

    const pxMatchReg = new RegExp(PX_REG)

    while (pxMatchReg.test(mediaRegResult)) {
      const pxMatchResult = pxMatchReg?.exec(mediaRegResult)
      if (!pxMatchResult) continue

      mediaRegResult = mediaRegResult.replace(PX_REG, `${px2vw(pxMatchResult[1])}`)
    }

    let replacedRegRes = mediaRegResult

    // 将{}替换为占位符，否则会死循环
    replacedRegRes = replacedRegRes?.replace('{', '^')
    replacedRegRes = replacedRegRes?.replace('}', '#')

    // console.log('[replacedRegRes]:', replacedRegRes)

    if (!replacedRegRes) continue

    stylesStr = stylesStr.replace(MEDIA_REG, replacedRegRes)
  }

  // 将占位符替换回来
  stylesStr = stylesStr.replace('^', '{')
  stylesStr = stylesStr.replace('#', '}')

  return stylesStr
}

// TODO 只转化除媒体查询外的px为vw

export const t = (strings: TemplateStringsArray, ...interpolations: any): MyTemplateStringsArrayTuple => {
  console.time('t1-spend')

  const styles = css(strings, ...interpolations) // css是styled-components的一个helper

  console.log('[styles]:', styles, strings)

  const stylesStr = styles.join('+') // 转化为字符串处理，+只是占位符

  // 有三种转化情况：1.内外都转化  2.内部转化  3.外部转化【较难】
  // 这里内指的是媒体查询，外指的是媒体查询外部css
  let handledStyledStr = ''

  switch (ADAPTION_MODE) {
    case ADAPTION_MODE_VALUE.all:
      handledStyledStr = allPx2vw(stylesStr)
      break

    case ADAPTION_MODE_VALUE.media:
      handledStyledStr = mediaPx2vw(stylesStr)
      break
  }

  console.timeEnd('t1-spend') // 性能分析

  // 根据+占位符将字符串还原为数组
  const res = new MyTemplateStringsArray(handledStyledStr.split('+'))
  console.log('[res]:', res)
  return [new MyTemplateStringsArray([]), res]
}

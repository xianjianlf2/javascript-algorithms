/*
 * @Author: Mark
 * @Date: 2022-02-10 00:35:59
 * @LastEditors: Mark
 * @LastEditTime: 2022-02-10 01:18:49
 * @FilePath: \javascript-algorithms\算法思想\二分查找.js
 * @Description: 二分查找
 * Copyright (c) 2022 by Mark, All Rights Reserved.
 */
// 实现字符串前面补全

// leftpad

function leftpad(str, length, ch) {
  if (!ch && ch.length !== 0) {
    ch = ' '
  }
  let len = length - str.length //需要补齐的长度
  return ch + Array(len).join(ch) + str
}

// console.log(leftpad('hello', 10, '0'))

//二分查找法
function leftpad2(str, length, ch) {
  if (!ch && ch.length !== 0) {
    ch = ' '
  }
  let len = length - str.length //需要补齐的长度
  let total = ''
  while (true) {
    if (len % 2 == 1) {
      total += ch
    }
    if (len == 1) {
      return total + str
    }
    ch += ch
    len = parseInt(len / 2)
  }
}

// console.log(leftpad2('hello', 10, '0'))

//按位运算
// 任何数字  与 1 异或运算

// 比如：5   二进制表示101
// 比如：6   二进制表示110
//      1   二进制表示001
// 6 && 1 == 0
// 5 && 1 == 1
// len / 2 == num>>1
// len * 2 == num<<1

function leftpad3(str, length, ch) {
  if (!ch && ch.length !== 0) {
    ch = ' '
  }
  let len = length - str.length //需要补齐的长度
  let total = ''
  while (len) {
    if (len & 1) {
      total += ch
    }
    if (len == 1) {
      return total + str
    }
    ch += ch
    len = len >> 1
  }
}

// console.log(leftpad3('hello', 10, '0'))
function countTime(fn) {
  console.time(fn.name)
  for (let i = 0; i < 10000; i++) {
    fn('hello', 10000, '0')
  }
  console.timeEnd(fn.name)
}
// 性能对比
countTime(leftpad)
countTime(leftpad2)
countTime(leftpad3)

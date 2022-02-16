class Node {
  constructor(element) {
    this.data = element
    this.next = null
  }
}

class LinkNodeList {
  constructor() {
    //链表
    //链表的相关的操作
    this.head = null
    this.length = 0
  }

  //增删改查
  append(element) {
    let node = new Node(element)
    let cur
    //两种情况
    //1. 链表是空的
    // 2. 链表存在

    if (this.head == null) {
      this.head = node
    } else {
      //遍历链表
      cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.length += 1
  }
  removeAt(index) {
    //上一个节点 指向  下一个节点
    let cur = this.head
    let prev
    let i = 0
    if (index == 0) {
      // 删除第一项
      this.head = cur.next
    } else {
      while (i < index) {
        //   保存上一个和下一个状态
        prev = cur
        cur = cur.next
        i++
      }
      prev.next = cur.next
      cur.next = null
    }
    return this.head
  }
  print() {
    let cur = this.head
    let ret = []

    while (cur) {
      ret.push(cur.data)
      cur = cur.next
    }
    console.log(ret.join('==>'))
    return ret.join('==>')
  }
}

let linkNode = new LinkNodeList()
linkNode.append('哈喽')
linkNode.append('看啥看')
linkNode.append('123')
linkNode.print()
linkNode.removeAt(1)
linkNode.print()

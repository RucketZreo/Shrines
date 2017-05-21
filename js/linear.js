'use strict';

let _head, _cur, _tail = null;

function ListNode(data) {
  this.data = data;
  this.next = null;
}

ListNode.prototype.append = function (e) {
  const node = new ListNode(e);
  if (this.data && !_head && !_tail && !_cur) {
    _head = _cur = _tail = this;
    _cur.next = node;
    _tail = _cur = _cur.next;
  } else if (!_head && !_tail && !_cur && !this.data) {
    _head = _tail = _cur = node;
  } else {
    _tail = node;
    _cur.next = _tail;
    _cur = _cur.next;
  }
  return this;
}

ListNode.prototype.show = function(msg) {
  let _t = _head;
  console.log(`msg: ${msg}`);
  while (_t) {
    console.log(_t.data);
    _t = _t.next;
  }
}

ListNode.prototype.unshift = function(e) {
  const node = new ListNode(e);
  if (_head) {
    node.next = _head;
    _head = node;
  } else {
    _head = _tail = _cur = node;
  }
}

ListNode.prototype.shift = function() {
  const node = _head;
  if (!node) return false;
  else {
    _head = _head.next;
    return node.data;
  }
}

ListNode.prototype.pop = function() {
  const _old_tail = _tail;
  if (!_tail) return false;
  else {
    let t = _head;
    while (t && t != _old_tail) {
      _tail = t;
      t = t.next;
    }
    delete _tail.next;
    return _old_tail.data;
  }
}

const list = new ListNode(1);
list.append(2).append(3).append(4).append(5).append(6);
list.show('appending');
list.unshift(0);
console.log('pop', list.pop());
list.show('unshifting & poping');

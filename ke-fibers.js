'use strict';
/* global FIBERS */
global.FIBERS=require('fibers');
module.exports=class keFibers {
/**
 * コンストラクタ
 * @return {Void} none
 * @constructor
 */
  constructor () {
  }
  /**
 * セッションルーチンの手続き
 * @param  {Function} proc セッションルーチン
 * @method
 */
  PROC(proc) {
    FIBERS(function(me){
      proc(me, this);
    }).run(this);
  }
  /**
 * 逐次制御開始
 * @return {Integer} 監視番号
 * @method
 */
  ready() {
    var id=Math.random();
    this.Event[id]=FIBERS.current;
    return id;
  }
  /**
 * 逐次制御待ち合わせ
 * @return {Anything} 待ち合わせ解除時引き渡し情報
 * @method
 */
  wait() {
    var rc=FIBERS.yield();
    return rc;
  }
  /**
 * 逐次制御解除
 * @param  {Integer}  id 監視番号
 * @param  {Anything} dt 引き渡しデータ
 * @return {Void}        none
 * @method
 */
  post(id, dt) {this.Event[id].run(dt); delete this.Event[id];}
  /**
 * 時間待ち合わせ
 * @param  {Integer} ms 待ち合わせ時間（ミリ秒）
 * @return {Void}       none
 * @method
 */
  sleep(ms) {
    let wid=this.ready();
    setTimeout(() => {this.post(wid);}, ms);
    this.wait();
  }
};

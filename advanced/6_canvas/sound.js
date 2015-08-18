var ctx = new AudioContext();

// フィードバック付ディレイの作成
var delay = ctx.createDelay();
delay.delayTime.value = 0.3;
var feedback = ctx.createGain();
feedback.gain.value = 0.6;
delay.connect(feedback);
feedback.connect(delay);
feedback.connect(ctx.destination);

var Sound = function() {
  this.osc = ctx.createOscillator();
//  note no   ド　ミ　ソ　シ　ド　ミ　ソ　シ　ド
  var note = [60,64,67,71,72,76,79,83,84];
  // ランダムに音を決める
  var r = Math.floor(Math.random() * note.length);
  // ノートナンバーから周波数を求める
  this.freq = 
    440.0 * Math.pow(2.0, (note[r] - 69.0) / 12.0);   
  Math.floor(200 + 800 * Math.random());
  // オシレーターを生成
  this.osc.frequency.value = this.freq;
  this.vol = ctx.createGain();
  // 音量をゼロにしておく
  this.vol.gain.value = 0;
  this.osc.connect(this.vol);
  this.vol.connect(ctx.destination);
  this.vol.connect(delay);
  this.osc.start(0);
  // 音を鳴らす
  this.play();
};

// 音を鳴らす処理
Sound.prototype.play = function() {
  this.osc.frequency.value = this.freq;
  var t = ctx.currentTime;
  // 0.1秒かけて音量をゼロから0.2にする（フェードイン）
  this.vol.gain.setTargetAtTime(0.2, t, 0.1);
  // その0.1秒後から、0.1秒かけて音量をゼロに戻す（フェードアウト）
  this.vol.gain.setTargetAtTime(0.0, t + 0.1, 0.1);
};









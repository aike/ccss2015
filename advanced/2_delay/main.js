var ctx = new AudioContext();
var wav;
// サウンドファイル取得
fetch('vocal.mp3').then(function(res) {
  return res.arrayBuffer();
}).then(function(arr) {
  ctx.decodeAudioData(arr, function(buf) {
    wav = buf;
    play();
  });
});

// フィードバック付ディレイエフェクト
var delay = ctx.createDelay();
delay.delayTime.value = 0.4; // 400ミリ秒
var feedback = ctx.createGain();
feedback.gain.value = 0.35; // 35%フィードバック
delay.connect(feedback);
feedback.connect(delay);
feedback.connect(ctx.destination);

// PLAYボタンを押すとPLAY/STOP
var osc = null;
function play() {
   if (osc === null) {
      osc = ctx.createBufferSource();
      osc.buffer = wav;
      // 再生速度 0.1〜5
      osc.playbackRate.value = 1.0;
      osc.connect(ctx.destination);
      osc.connect(delay);
      osc.start();
  } else {
      osc.stop();
      osc = null;
   }
}

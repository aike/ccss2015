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

var osc = null;
function play() {
   if (osc === null) {
      osc = ctx.createBufferSource();
      osc.buffer = wav;
      // 再生速度 0.1〜5
      osc.playbackRate.value = 1.0;
      osc.connect(ctx.destination);
      osc.start();
  } else {
      osc.stop();
      osc = null;
   }
}

document.onkeydown = function(e) {
  if (e.keyCode === 38)
    osc.playbackRate.value *= 1.2;
  if (e.keyCode === 40)
    osc.playbackRate.value /= 1.2;
};


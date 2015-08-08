var ctx = new AudioContext();
// サウンドファイルの取得
fetch('drum.mp3').then(function(res) {
  return res.arrayBuffer();
}).then(function(arr) {
  ctx.decodeAudioData(arr, function(buf) {
    ready(buf);
  });
});

// サウンドファイルの再生
function ready(audiobuf) {
  var osc = ctx.createBufferSource();
  osc.buffer = audiobuf;
  osc.loop = true;
  osc.connect(sensor);
  osc.connect(ctx.destination);
  osc.start(0);
}

// 音量に応じて反応する処理
var sensor = ctx.createScriptProcessor(1024, 1, 1);
sensor.onaudioprocess = function(event) {
  var sin = event.inputBuffer.getChannelData(0);
  var level = 0;
  for (var i = 0; i < sin.length; i++) {
    // 1024サンプルごとに波形の絶対値を合計
    level += Math.abs(sin[i]);
  }
  showChar(level);
};
sensor.connect(ctx.destination);

// 文字列の表示
var div = document.querySelector('#draw');
var size = 10;
function showChar(level) {
  if (level > 90) {
    // 波形の合計値（音量）が90より大きい場合、500pxの文字列を表示
    var chars = ['CCSS','Web','Audio','0','1','2','3','4','5','6','7','8','9'];
    var r = Math.floor(Math.random() * chars.length);
    div.innerText = chars[r];
    size = 500;
  } else {
    // 波形の合計値（音量）が90以下の場合、徐々に文字サイズを小さく
    size -= 20;
  }
  // CSSの文字サイズと位置を変更
  div.style.fontSize = size + 'px';
  div.style.top  = (200 - size / 2) + 'px';
  div.style.left = (500 - div.offsetWidth / 2) + 'px';
}


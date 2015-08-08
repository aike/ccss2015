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

// 文字列のエフェクト
var left = true;
$('#left' ).jrumble({x:10,y:10,rotation:4});
$('#right').jrumble({x:10,y:10,rotation:4});
function showChar(level) {
  if (level > 100) {
    var elem;
    if (left) {
      elem = $('#left');
    } else {
      elem = $('#right');
    }
    elem.trigger('startRumble');
    setTimeout(function() {
      elem.trigger('stopRumble');
      left = !left;
    }, 300);
  }
}

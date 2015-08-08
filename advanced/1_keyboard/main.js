var ctx = new AudioContext();
var osc = null;
var freq = 440;

// キーボードを押すと音程を設定して音を鳴らす
document.onkeydown = function(e) {
   var note_no = e.keyCode - 49 + 60;
   freq = 440.0 * Math.pow(2.0, (note_no - 69.0) / 12.0);
   noteon();
}

// キーボードを離すと音を止める
document.onkeyup = function(e) {
   noteoff();
}

// 発音処理
function noteon() {
   if (osc === null) {
      osc = ctx.createOscillator();
      // 波形の指定 sine/square/sawtooth/triangle
      osc.type = "square";
      // 周波数の指定 50〜10000
      osc.frequency.value = freq;

      var volume = ctx.createGain();
      volume.gain.value = 0.2;    // 0〜1の値
      osc.connect(volume);
      volume.connect(ctx.destination);
      osc.start();
  }
}

function noteoff() {
   if (osc !== null) {
      osc.stop();
      osc = null;
   }
}

var ctx = new AudioContext();
var osc = null;
function play() {
   if (osc === null) {
      osc = ctx.createOscillator();
      // 波形の指定 sine/square/sawtooth/triangle
      osc.type = "square";
      // 周波数の指定 50〜10000
      osc.frequency.value = 880;

      var volume = ctx.createGain();
      volume.gain.value = 0.2;    // 0〜1の値
      osc.connect(volume);
      volume.connect(ctx.destination);
      osc.start();
  } else {
      osc.stop();
      osc = null;
   }
}

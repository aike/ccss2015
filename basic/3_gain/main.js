var ctx = new AudioContext();
var osc = null;
function play() {
   if (osc === null) {
      osc = ctx.createOscillator();
      var volume = ctx.createGain();
      volume.gain.value = 0.2;
      osc.connect(volume);
      volume.connect(ctx.destination);
      osc.start();
  } else {
      osc.stop();
      osc = null;
   }
}

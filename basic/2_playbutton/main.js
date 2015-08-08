var ctx = new AudioContext();
var osc = null;
function play() {
   if (osc === null) {
      osc = ctx.createOscillator();
      osc.connect(ctx.destination);
      osc.start();
  } else {
      osc.stop();
      osc = null;
   }
}

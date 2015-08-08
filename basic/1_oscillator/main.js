var ctx = new AudioContext();
var osc = ctx.createOscillator();
osc.connect(ctx.destination);
osc.start();
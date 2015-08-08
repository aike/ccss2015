var ctx = new AudioContext();
// サウンドファイルの取得
function getwav(name, callback) {
  fetch(name).then(function(res) {
  return res.arrayBuffer(); }).then(function(arr) {
    ctx.decodeAudioData(arr, function(buf) {
      callback(buf);
    });
  });
}
var kick, hat, snare, clap;
getwav("kick.wav", function(buf){kick = buf;});
getwav("hat.wav", function(buf){hat = buf;});
getwav("snare.wav", function(buf){snare = buf;});
getwav("clap.wav", function(buf){clap = buf;});

// PLAYボタンを押すとインターバルタイマーをON/OFF
var timer;
var beat;
function play() {
  if (timer== null) {
    beat = 0;
    timer = setInterval(playsound, 200);
  } else {
    clearInterval(timer);
    timer = null;
  }
}

// 200ミリ秒ごとに呼ばれる発音処理
function playsound() {
  if (beat % 2 == 0) {
    var wav = ctx.createBufferSource();
    wav.buffer = kick;
    wav.connect(ctx.destination);
    wav.start();
  }
  if (beat % 2 == 1) {
    var wav = ctx.createBufferSource();
    wav.buffer = hat;
    wav.connect(ctx.destination);
    wav.start();
  }
  if (beat == 2) {
    var wav = ctx.createBufferSource();
    wav.buffer = snare;
    wav.connect(ctx.destination);
    wav.start();
  }
  if (beat >= 6) {
    var wav = ctx.createBufferSource();
    wav.buffer = clap;
    wav.connect(ctx.destination);
    wav.start();
  }
  beat = (beat + 1) % 8;
}


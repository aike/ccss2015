  var canvas = document.querySelector('#drawarea');
  var gtx = canvas.getContext('2d');

  var Circle = function(x, y, rnd) {
    // 円の属性（色、サイズ、速度）をランダムに設定
    var cols = ['#48f', '#b9e', '#4bc', '#55d'];
    this.col = cols[Math.floor(Math.random() * cols.length)];
    this.x = x;
    this.y = y;
    this.r = rnd * 30 + 3;
    this.speed = rnd * 2 + 1;
    this.draw();
 
    // 生成時に音を鳴らす   
    this.sound = new Sound();
    this.sound.play();
  };
  
  // 円の描画
  Circle.prototype.draw = function() {
    gtx.fillStyle = this.col;
    // shadowを設定してぼかしをかける
    gtx.shadowColor = this.col;
    gtx.shadowBlur = 50;
    // 描画
    gtx.beginPath();
    gtx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    gtx.fill();

    // 上方向に移動する
    this.y -= this.speed;
    if (this.y < 0) {
      // 上端にきたら音を鳴らして下から再表示
      this.y += gtx.canvas.height;
      this.sound.play();
    }
  };
  
  var circles = [];
  canvas.onclick = function(e) {
    // 画面クリックすると円を追加
    circles.push(new Circle(e.clientX, e.clientY, Math.random()));
  };

  // 描画ループ
  function loop() {
    // 60FPSのタイマー
    requestAnimationFrame(loop);
    // 画面消去
    gtx.clearRect(0,0, gtx.canvas.width, gtx.canvas.height);
    // すべての円を再描画
    for (var i=0; i < circles.length; i++) {
      circles[i].draw();
    }
  }
  loop();



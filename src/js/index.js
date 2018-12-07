import {Shape, Stage,Graphics, Text, Container, Ticker} from "@createjs/easeljs";
//import  {Tween} from "@createjs/tweenjs";


const init = () => {
    const stage = new Stage('myCanvas');
    const container = new Container();
    container.x = 300;
    container.y = 300;
    stage.addChild(container);

    for (let i = 0; i < 10; i++) {
        //円
        const circle = new Shape();
        circle.graphics.beginFill(Graphics.getHSL(50, 100, 50)).drawCircle(0,0, 50);
        circle.x = 200 * Math.sin(i * 360 / 10 * Math.PI / 180);
        circle.y = 200 * Math.cos(i * 360 / 10 * Math.PI / 180);
        container.addChild(circle);
    }

    //四角
    const Rect = new Shape();
    Rect.graphics.beginFill(Graphics.getHSL(10, 100, 50)).drawRect(10, 10, 50, 100);
    Rect.x = 200;
    Rect.y = 200;
    Rect.alpha = 0.5;
    container.addChild(Rect);

    //星
    const poly = new Shape();
    poly.graphics.beginFill("DarkRed"); // 赤色で描画するように設定
    poly.graphics.drawPolyStar(300, 100, 75, 5, 0.5, -90); //75pxの星を記述
    container.addChild(poly);

    //テキスト
    const  text = new Text("Hello World!", "24px serif", "DarkRed");
    text.x = 50;
    text.y = 50;
    container.addChild(text);

    // circle.rotation = 45;
    // circle.visible = true;
    // circle.scaleX = 0.5;
    // circle.scaleY = 0.5;
    stage.update();

    const handleTick = () => {
        container.rotation += 0.5;
        container.removeChild(text);
        const  mx = stage.mouseX;
        const  my = stage.mouseY;
        container.x = mx;
        container.y = my;
        // container.x += 2;
        stage.update()
    };

    Ticker.framerate = Ticker.RAF;
    Ticker.addEventListener('tick', handleTick)
};

window.addEventListener('load', init);



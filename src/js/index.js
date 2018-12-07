import {Shape, Stage,Graphics} from "@createjs/easeljs";
//import  {Tween} from "@createjs/tweenjs";


const init = () => {
    const stage = new Stage('myCanvas');

    //円
    const circle = new Shape();
    circle.graphics.beginFill(Graphics.getHSL(50, 100, 50)).drawCircle(10, 10, 50);
    circle.x = 100;
    circle.y = 200;
    circle.alpha = 0.5;
    stage.addChild(circle);

    //四角
    const Rect = new Shape();
    Rect.graphics.beginFill(Graphics.getHSL(10, 100, 50)).drawRect(10, 10, 50, 100);
    Rect.x = 200;
    Rect.y = 200;
    Rect.alpha = 0.5;
    stage.addChild(Rect);

    const poly = new Shape();
    poly.graphics.beginFill("DarkRed"); // 赤色で描画するように設定
    poly.graphics.drawPolyStar(300, 100, 75, 5, 0.5, -90); //75pxの星を記述
    stage.addChild(poly);

    // circle.rotation = 45;
    // circle.visible = true;
    // circle.scaleX = 0.5;
    // circle.scaleY = 0.5;

    stage.update();
};

window.addEventListener('load', init);



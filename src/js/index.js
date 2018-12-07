import {Shape, Stage, Graphics, Text, Container, Ticker} from "@createjs/easeljs";
//import  {Tween} from "@createjs/tweenjs";


const init = () => {
    const stage = new Stage('myCanvas');
    stage.enableMouseOver();
    const container = new Container();
    container.x = 300;
    container.y = 300;
    stage.addChild(container);

    for (let i = 0; i < 10; i++) {
        //円
        const circle = new Shape();
        circle.graphics.beginFill(Graphics.getHSL(50, 100, 50)).drawCircle(0, 0, 50);
        circle.x = 200 * Math.sin(i * 360 / 10 * Math.PI / 180);
        circle.y = 200 * Math.cos(i * 360 / 10 * Math.PI / 180);
        container.addChild(circle);
    }

    //四角
    // const Rect = new Shape();
    // Rect.graphics.beginFill(Graphics.getHSL(10, 100, 50)).drawRect(10, 10, 50, 100);
    // Rect.x = 200;
    // Rect.y = 200;
    // Rect.alpha = 0.5;
    // container.addChild(Rect);

    //星
    // const poly = new Shape();
    // poly.graphics.beginFill("DarkRed"); // 赤色で描画するように設定
    // poly.graphics.drawPolyStar(300, 100, 75, 5, 0.5, -90); //75pxの星を記述
    // container.addChild(poly);


    //ボタン
    const btnWidth = 240;
    const btnHeight = 50;
    const keyColor = '#563d7c';

    const button = new Container();
    button.x = 300;
    button.y = 300;
    button.cursor = 'pointer';
    stage.addChild(button);

    //枠
    const buttonBackGround = new Shape();
    buttonBackGround.graphics
        .setStrokeStyle(1)
        .beginStroke(keyColor)
        .beginFill('white')
        .drawRoundRect(0, 0, btnWidth, btnHeight, 4);
    button.addChild(buttonBackGround);

    //マウスオーバー時の枠
    const buttonBackGroundOnMouseOver = new Shape();
    buttonBackGroundOnMouseOver.graphics
        .beginFill(keyColor)
        .drawRoundRect(0, 0, btnWidth, btnHeight, 4);
        buttonBackGroundOnMouseOver.visible = false;
    button.addChild(buttonBackGroundOnMouseOver);


    //文字
    const buttonText = new Text('Button', '24px sans-serif',keyColor);
    buttonText.x = btnWidth / 2;
    buttonText.y = btnHeight / 2;
    buttonText.textAlign = 'center';
    buttonText.textBaseline = 'middle';
    button.addChild(buttonText);

    // ドラッグした場所を保存する変数
    let dragPointX;
    let dragPointY;
    const handleDown = e => {
        dragPointX = stage.mouseX - button.x;
        dragPointY = stage.mouseY - button.y;
        stage.update();
    };
    const handleMove = e => {
        button.x = stage.mouseX - dragPointX;
        button.y = stage.mouseY - dragPointY;
        stage.update();
    };

    // ドラッグの設定
    button.addEventListener('mousedown', handleDown);
    button.addEventListener('pressmove', handleMove);

    //クリック時
    const handleClick = e => {
        alert('buttonがクリックされました');
    };
    button.addEventListener('click', handleClick);

    //マウスオーバー時
    const handleMouseover = e => {
        buttonBackGround.visible = false;
        buttonBackGroundOnMouseOver.visible = true;
        buttonText.color = 'white';
    };
    button.addEventListener('mouseover', handleMouseover);

    //マウスアウト時
    const handleMouseout = e => {
        buttonBackGround.visible = true;
        buttonBackGroundOnMouseOver.visible = false
        buttonText.color = keyColor;
    };
    button.addEventListener('mouseout', handleMouseout);

    const handleTick = () => {
        container.rotation += 0.5;
        const mx = stage.mouseX;
        const my = stage.mouseY;
        container.x = mx;
        container.y = my;
        // container.x += 2;
        stage.update()
    };
    Ticker.framerate = Ticker.RAF;
    Ticker.addEventListener('tick', handleTick);

    stage.update();
};



window.addEventListener('load', init);



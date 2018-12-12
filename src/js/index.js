import {Container, Shape, Stage, Text, Ticker} from "@createjs/easeljs";
import "@babel/polyfill";

const DisplayWidth = 1200;
const DisplayHeight = 500;
const FiledBottomWidth = 800;
const FiledTopWidth = 700;
const FiledHeight = 300;
const FiledLeftBottomX = 200;
const FiledLeftBottomY = 400;

const initDisplay = () => {
    const stage = new Stage('gameDisplay');
    stage.enableMouseOver();

    //デュエルフィールド
    const filed = new Container();
    stage.addChild(filed);

    const filedOuterFrame = CreateTrapezoid(FiledBottomWidth,FiledTopWidth,FiledHeight,FiledLeftBottomX,FiledLeftBottomY);
    filed.addChild(filedOuterFrame);

    stage.update();

    /**
     * 下の方が太くて左右対称な台形を作成する関数
     * @param {Number} bottomWidth 底辺の長さ
     * @param {Number} topWidth　上辺の長さ
     * @param {Number} height　高さ
     * @param {Number} leftBottomX　左下のX座標
     * @param {Number} leftBottomY　左下のY座標
     * @return {Shape} filedOuterFrame 台形の参照
     */
    function CreateTrapezoid(bottomWidth, topWidth, height, leftBottomX, leftBottomY) {
        const variable = (bottomWidth - topWidth) / 2;

        const filedOuterFrame = new Shape();
        filedOuterFrame.graphics
            .beginStroke('gray')
            .setStrokeStyle(1)
            .moveTo(leftBottomX, leftBottomY)
            .lineTo(leftBottomX + variable, leftBottomY - height)
            .lineTo(leftBottomX + variable + topWidth, leftBottomY - height)
            .lineTo(leftBottomX + bottomWidth, leftBottomY)
            .lineTo(leftBottomX, leftBottomY)
            .closePath();

        return filedOuterFrame;
    }

    /**
     * デュエルフィールドの内側の枠を作成
     * @param {Number} verticalNo 縦の番号　上から
     * @param {Number} horizontalNo　横の番号　右から
     * @returns {{x: number}}
     */
    function CreateFrame(verticalNo, horizontalNo) {
        const filedWidthInside = filedWidth - 20;
        const filedHeightInside = FiledHeight - 20;
        const aBlockWidth = filedWidthInside / 4;
        const aBlockHeight = filedHeightInside / 4;

        const Coordinate = {
            leftBottom: {x: 200, y: 400},
            leftTop: {x: 250, y: 100},
            rightTop: {x: 950, y: 100},
            rightBottom: {x: 1000, y: 400}
        };

        if (verticalNo === 1) {

        }


        return {x: 4};
    }

};


const init = () => {
    const stage = new Stage('gameDisplay');
    stage.enableMouseOver();

    //円が回転するやつ
    // const container = new Container();
    // container.x = 300;
    // container.y = 300;
    // stage.addChild(container);

    // for (let i = 0; i < 10; i++) {
    //     //円
    //     const circle = new Shape();
    //     circle.graphics.beginFill(Graphics.getHSL(50, 100, 50)).drawCircle(0, 0, 50);
    //     circle.x = 200 * Math.sin(i * 360 / 10 * Math.PI / 180);
    //     circle.y = 200 * Math.cos(i * 360 / 10 * Math.PI / 180);
    //     container.addChild(circle);
    // }
    // const handleTick = () => {
    //     container.rotation += 0.5;
    //     const mx = stage.mouseX;
    //     const my = stage.mouseY;
    //     container.x = mx;
    //     container.y = my;
    //     // container.x += 2;
    //     stage.update()
    // };
    // Ticker.framerate = Ticker.RAF;
    // Ticker.addEventListener('tick', handleTick);


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
    const buttonText = new Text('Button', '24px sans-serif', keyColor);
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

    //マウスを向く矢印と線と距離
    const arrow = new Shape();
    arrow.graphics
        .beginFill('DarkRed')
        .drawRect(-6, -3, 12, 6)
        .beginFill('DarkRed')
        .moveTo(4, 10)
        .lineTo(14, 0)
        .lineTo(4, -10)
        .closePath();

    // 画面中央に配置
    arrow.x = stage.canvas.width / 2;
    arrow.y = stage.canvas.height / 2;
    stage.addChild(arrow);

    const line = new Shape();
    stage.addChild(line);
    const label = new Text('0px', '24px sans-serif', 'gray');
    stage.addChild(label);

    const handleTickForArrow = () => {
        const dx = stage.mouseX - arrow.x;
        const dy = stage.mouseY - arrow.y;
        const radians = Math.atan2(dy, dx);
        arrow.rotation = radians * (180 / Math.PI);

        const distance = Math.sqrt((dx ** 2) + (dy ** 2));
        label.text = distance + 'px';
        line.graphics.clear()
            .setStrokeStyle(1).beginStroke('gray')
            .moveTo(arrow.x, arrow.y)
            .lineTo(stage.mouseX, stage.mouseY);

        stage.update();
    };

    Ticker.addEventListener('tick', handleTickForArrow);

    stage.update();

    //アニメーション
    // const circle = new Shape();
    // circle.graphics.beginFill("DarkRed").drawCircle(0, 0, 50);
    // circle.y = 200;
    // stage.addChild(circle);
    // Tween.get(circle, {loop: true}) // ターゲットを指定
    //     .to({x: 940, alpha: 0.1, y:500}, 2000)
    //     .to({x: 500, y: 0, alpha: 1.0}, 3000)
    //     .to({x: 500, y: 300}, 3000)
    //     .to({scaleX: 3, scaleY: 3}, 5000);
    // const handleTick = () => {
    //     stage.update();
    // };
    // Ticker.addEventListener('tick', handleTick)
};

window.addEventListener('load', initDisplay);



import {Container, Shape, Stage, Text, Ticker} from "@createjs/easeljs";
// import "@babel/polyfill";
import {Deck} from "./Deck";
import  {GraphicConfig} from  "./GraphicConfig";

Ticker.framerate = Ticker.RAF;

const initDisplay = () => {
    const stage = new Stage('gameDisplay');
    stage.enableMouseOver();

    //デュエルフィールド
    const filed = new Container();
    stage.addChild(filed);
    filed.x = GraphicConfig.FiledLeftX;
    filed.y = GraphicConfig.FiledTopY;

    //外枠
    const filedOuterFrame = new Shape();
    filedOuterFrame.graphics
        .beginStroke('white')
        .setStrokeStyle(1.5)
        .drawRect(0, 0, GraphicConfig.FiledWidth, GraphicConfig.FiledHeight);
    filed.addChild(filedOuterFrame);

    //ブロック毎の座標
    const blockCoordinate = new Array(GraphicConfig.VerticalNumber);
    for (let i = 0; i < blockCoordinate.length; i++) {
        blockCoordinate[i] = new Array(GraphicConfig.HorizontalNumber);
        for (let j = 0; j < GraphicConfig.HorizontalNumber; j++) {
            blockCoordinate[i][j] = {};
        }
    }

    //フィールドの内側を作成
    for (let i = 0; i < GraphicConfig.VerticalNumber; i++) {
        const space = (i >= 2) ? GraphicConfig.FiledCenterInterval : 0;
        for (let j = 0; j < GraphicConfig.HorizontalNumber; j++) {
            blockCoordinate[i][j].x = GraphicConfig.BlockSize.width * j;
            blockCoordinate[i][j].y = space + GraphicConfig.BlockSize.height * i;
            const block = new Shape();
            block.graphics
                .beginStroke('white')
                .setStrokeStyle(0.8)
                .drawRect(blockCoordinate[i][j].x, blockCoordinate[i][j].y, GraphicConfig.BlockSize.width, GraphicConfig.BlockSize.height);
            filed.addChild(block);
        }
    }

    //敵のデッキ置き場
    const enemyDeck = new Deck(
        GraphicConfig.BlockSize.width, GraphicConfig.BlockSize.height, 60,
        'rightBottom', '#883b25');
    enemyDeck.x = GraphicConfig.EnemyDeckX;
    enemyDeck.y = GraphicConfig.EnemyDeckY;
    stage.addChild(enemyDeck);

    //自分のデッキ置き場
    const myDeck = new Deck(GraphicConfig.BlockSize.width, GraphicConfig.BlockSize.height,
        40, 'leftBottom', '#3f6588');
    myDeck.x = GraphicConfig.MyDeckX;
    myDeck.y = GraphicConfig.MyDeckY;
    stage.addChild(myDeck);

    stage.update();

    /**
     * 平行四辺形を作成する関数
     * @param {Number} width 辺の長さ
     * @param {Number} height　高さ
     * @param {Number} leftBottomX　左下のX座標
     * @param {Number} leftBottomY　左下のY座標
     * @param {VerticalNumber} shift ずれ
     * @param {string} orientation　ずれる向き 'right'or'left'
     * @return {Shape} ParallelRect 平行四辺形の参照
     */
    function CreateParallelRect(width, height, leftBottomX, leftBottomY, shift, orientation) {
        let variable;
        if (orientation === 'right') {
            variable = shift;
        } else if (orientation === 'left') {
            variable = -shift;
        } else {
            return null;
        }

        const ParallelRect = new Shape();
        ParallelRect.graphics
            .beginStroke('gray')
            .setStrokeStyle(1)
            .moveTo(leftBottomX, leftBottomY)
            .lineTo(leftBottomX + variable, leftBottomY - height)
            .lineTo(leftBottomX + variable + width, leftBottomY - height)
            .lineTo(leftBottomX + width, leftBottomY)
            .lineTo(leftBottomX, leftBottomY)
            .closePath();

        return ParallelRect;
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
import {Container, Shape, Stage, Text, Ticker} from "@createjs/easeljs";
import {GraphicConfig} from "./GraphicConfig";
import {Tween} from "@createjs/tweenjs";

/*+
 * カードのレンダリング用ラス
 */
export class Card extends Container {

    /**
     * @param isOpen {boolean} 表側表示か
     */
    constructor(isOpen = false) {
        super();
        this.isOpen = isOpen;

        //外枠
        const frame = new Shape();
        frame.graphics
            .beginStroke('white')
            .setStrokeStyle(GraphicConfig.CardFrameThickness)
            .drawRect(0, 0, GraphicConfig.CardWidth, GraphicConfig.CardHeight);
        this.frame = frame;
        this.addChild(frame);

        if (isOpen) {
            this.Opend();
        } else {
            this.Reversed();
        }
    }

    /**
     * カードを表側表示にする
     */
    Opend() {
        //TODO 未実装
    }

    /**
     * カードを裏側表示にする
     */
    Reversed() {
        //TODO 表側を消す処理
        const back = new Shape();
        back.graphics
            .beginFill('Black')
            .setStrokeStyle(GraphicConfig.CardFrameThickness)
            .drawRect(GraphicConfig.CardFrameThickness, GraphicConfig.CardFrameThickness,
                GraphicConfig.CardWidth - (GraphicConfig.CardFrameThickness * 2), GraphicConfig.CardHeight - (GraphicConfig.CardFrameThickness * 2));
        this.back = back;
        this.addChild(back);
    }

    /**
     * 指定場所までドローアニメーションを行います
     * @param x ドロー後の座標
     * @param y　ドロー後の座標
     * @param time　アニメーションの時間
     */
    DrawAnimation(x, y, time){
        this.scale = 0;
        Tween.get(this)
            .to({x:x,y:y,scale:1},time)
    }

    /**
     * 非表示にする　ドローアニメ用
     */
    _Hidden () {
        this.frame.graphics.clear();
        this.back.graphics.clear();
    }
}
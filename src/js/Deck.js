import {Container, Shape, Stage, Text, Ticker} from "@createjs/easeljs";
import {GraphicConfig} from "./GraphicConfig";
import {Card} from "./Card";

/*+
 * デッキのレンダリング用ラス
 */
export class Deck extends Container {
    /**
     * @param width {number}　横幅
     * @param height {number} 高さ
     * @param deckNumber {number} デッキ枚数
     * @param viewPoint {string} どこにプレイヤーの視点があるか
     *         'leftBottom'or'rightBottom' 現在使用してない 左上で固定中
     * @param frameColor {string} 枠線の色
     */
    constructor(width = 0, height = 0, deckNumber = 0, viewPoint, frameColor = '') {
        super();

        //外枠
        const frame = new Shape();
        frame.graphics
            .beginStroke(frameColor)
            .setStrokeStyle(2)
            .drawRect(0, 0, width, height);
        frame.alpha = 0.3;
        this.frame = frame;
        this.addChild(frame);

        this.theDeck = [];
        //デッキの残り枚数だけ山札をレンダリング
        for (let i = 0; i < deckNumber; i++) {
            i += 2;
            const card = new Card(false);
            let ss = width - GraphicConfig.CardWidth + 4;
            ss /= 2;
            card.x = ss + i;
            card.y = i;
            this.theDeck[i - 2] = card;
            this.addChild(card);
        }
    }

    /**
     * @author デッキトップのカードを取得
     * @returns {Card} デッキトップのカード
     */
    GetTopCard() {
        return this.theDeck[this.theDeck.length - 1];
    }

}
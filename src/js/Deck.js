import {Container, Shape, Stage, Text, Ticker} from "@createjs/easeljs";

/*+
 * デッキのレンダリング用ラス
 */
class Deck extends Container {

    /**
     *
     * @param height {number} 高さ
     * @param width {number}　横幅
     * @param deckNumber {number} デッキ枚数
     */
    constructor(height = 0, width = 0, deckNumber = 0) {
        super();

        //外枠
        const frame = new Shape();
        frame.graphics
            .beginStroke('#883b25')
            .setStrokeStyle(2)
            .drawRect(0, 0, height, width);
        this.frame = frame;
        this.addChild(frame)

    }


}
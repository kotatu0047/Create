import {Container, Shape, Stage, Text, Ticker} from "@createjs/easeljs";
import {GraphicConfig} from "./GraphicConfig";
import {Card} from "./Card";
import {StrColors, StrConsts} from "./StrConsts";
import {Tween} from "@createjs/tweenjs";

/*+
 * デッキのレンダリング用ラス
 */
export class Deck extends Container {
    /**
     * @param width {number}　横幅
     * @param height {number} 高さ
     * @param viewPoint {string} どこにプレイヤーの視点があるか
     *         'leftBottom'or'rightBottom' 現在使用してない 左上で固定中
     * @param frameColor {string} 枠線の色
     */
    constructor(width = 0, height = 0, viewPoint, frameColor = '') {
        super();
        this.theDeck = [];
        this.isShuffling = false;

        //外枠
        const frame = new Shape();
        frame.graphics
            .beginStroke(frameColor)
            .setStrokeStyle(2)
            .drawRect(0, 0, width, height);
        frame.alpha = 0.3;
        this.frame = frame;
        this.addChild(frame);

        //デッキ枚数表示用
        const displayDeckNumber = new Text('0', StrConsts.FONT, StrColors.WHITE);
        displayDeckNumber.textAlign = 'center';
        displayDeckNumber.textBaseline = 'middle';
        displayDeckNumber.x = width - 10;
        displayDeckNumber.y = height / 2;
        this.displayDeckNumber = displayDeckNumber;
        this.addChild(displayDeckNumber);
    }

    /**
     * @author デッキトップのカードを取得 (デッキが減るわけではない)
     * @returns {Card} デッキトップのカード
     */
    GetTopCard() {
        if (this.theDeck.length >= 1) {
            return this.theDeck[this.theDeck.length - 1];
        } else {
            return null;
        }
    }

    /**
     * @author デッキ枚数表示を更新
     */
    UpdateDisplayDeckNumber() {
        this.displayDeckNumber.text = this.theDeck.length;
    }

    /**TODO シャッフルアルゴリズムの実装
     * @author シャッフルアニメーションをレンダリング
     */
    ShuffleAnimation() {
        if (this.isShuffling) {
            return
        }

        this.isShuffling = true;
        let cards = [1, 2, 3, 4];
        cards = cards.map(targetIndex => {
            return (this.theDeck.length >= targetIndex) ? this.theDeck[targetIndex - 1] : 0;
        });
        cards = cards.filter(el => el !== 0);

        cards.forEach((card, index) => {
            const time = (index + 1) * GraphicConfig.ShuffleAnimationTime;
            Tween.get(card)
                .to({y: card.y - 30}, time)
                .to({x: card.x - 30, y: card.y}, time)
                .to({x: card.x, y: card.y + 30}, time)
                .to({x: card.x + 30, y: card.y}, time)
                .to({x: card.x, y: card.y - 30}, time)
                .to({y: card.y}, time)
                .call(() => {
                    if (cards.length - 1 === index) {
                        this.isShuffling = false;
                    }
                });
        });
    }
}
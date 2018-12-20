import {Container, Shape, Stage, Text, Ticker} from "@createjs/easeljs";
import {GraphicConfig} from "./GraphicConfig";
import {Card} from "./Card";

/*+
 * 手札のレンダリング用ラス
 */
export class Hand extends Container {
    constructor() {
        super();

        this.hands = [];
    }

    /**
     * @author デッキトップのカードを取得
     * @returns {Card} デッキトップのカード
     */
    GetTopCard() {
        if (this.theDeck.length >= 1){
            return this.theDeck[this.theDeck.length - 1];
        }
        else {
            return null;
        }
    }

}
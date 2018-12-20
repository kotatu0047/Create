import {Card} from "./Card";
import {GraphicConfig} from "./GraphicConfig";
import {Tween} from "@createjs/tweenjs";
import {StrConsts} from "./StrConsts";

/**
 * 初期の山札作成
 * デッキコンテナの中に山札をレンダリング
 * コンテナの子要素として追加しているわけではないので注意
 * @param deckNumber {number} デッキ枚数
 * @param deck　デッキ
 * @param stage
 */
export function GenerateDeck(deckNumber = 0, deck = null, stage = null) {
    if (!deck || !stage) {
        return null;
    }

    deck.theDeck = [];
    //デッキの残り枚数だけ山札をレンダリング
    for (let i = 0; i < deckNumber; i++) {
        const target = i + 2;
        const card = new Card(false);
        let gap = GraphicConfig.CardWidth + 4;
        gap /= 2;
        card.x = deck.x + gap + target;
        card.y = deck.y + target;
        deck.theDeck.push(card);
        stage.addChild(card);
    }
}

/**
 * ドローアニメーションを行います
 * @param deck {Deck} デッキ
 * @param hand {Hand}　ハンド
 * @param drawNumber {Number}　ドロー枚数
 * @param iff {string} 敵orプレイヤー
 */
export function DrawAnimation(deck, hand, drawNumber, iff) {
    //TODO 配列削除
    for (let i = 0; i < drawNumber; i++) {
        let topCard = deck.GetTopCard();
        topCard.scale = 0;
        let handNumber = hand.hands.length;

        let x = 0;
        if (iff === StrConsts.PLAYER) {
            x = hand.x + (GraphicConfig.CardWidth * handNumber)
                + (GraphicConfig.HandInterval * handNumber);
        } else if (iff === StrConsts.ENEMY) {
            x = hand.x - GraphicConfig.CardWidth - (GraphicConfig.CardWidth * handNumber)
                - (GraphicConfig.HandInterval * handNumber);
        }

        Tween.get(topCard)
            .to({x: x, y: hand.y, scale: 1}, GraphicConfig.DrawAnimationTime * (i + 1));
        hand.hands.push(deck.theDeck.pop());
    }
}
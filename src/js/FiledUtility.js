import {BlurFilter, Shape} from "@createjs/easeljs";
import {GraphicConfig} from "./GraphicConfig";

/**
 * エフェクトマネージャー　基本的に使い捨て
 */
export class EffectManager {

    /**
     * コンストラクタ
     * @param filed {Container} エフェクトを追加するフィールド
     */
    constructor(filed) {
        this.filed = filed;
        this.effects = [];
    }

    /**
     * エフェクト追加のリスナー用関数を作成します
     * @param targetBlockCoordinates {Array} 座標 一次元配列
     * @returns {Function}
     */
    CreateAddEffectFunction(targetBlockCoordinates) {
        return () => {
            const filter = new BlurFilter(7, 7, 3);
            for (let i = 0; i < targetBlockCoordinates.length; i++) {
                let effect = new Shape();
                effect.graphics
                    .beginStroke('#2f62ff')
                    .setStrokeStyle(3)
                    .drawRect(targetBlockCoordinates[i].x + 1, targetBlockCoordinates[i].y + 1,
                        GraphicConfig.BlockSize.width - 2, GraphicConfig.BlockSize.height - 2);
                this.filed.addChild(effect);
                this.effects.push(effect);

                effect.filters = [filter];
                effect.cache(targetBlockCoordinates[i].x + 1, targetBlockCoordinates[i].y + 1,
                    GraphicConfig.BlockSize.width - 2, GraphicConfig.BlockSize.height - 2);
            }
        };
    }

    /**
     * エフェクト削除のリスナー用関数を作成します
     * @returns {Function}
     */
    CreateRemoveEffectFunction() {
        return () => {
            for (let i = 0; i < this.effects.length; i++) {
                this.filed.removeChild(this.effects[i]);
            }
        };
    }
}

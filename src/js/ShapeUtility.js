import {Shape} from "@createjs/easeljs";

export function Add(x, y) {
    return x + y;
}

/**
 * 下の方が太くて左右対称な台形を作成する関数
 * @param {Number} bottomWidth 底辺の長さ
 * @param {Number} topWidth　上辺の長さ
 * @param {Number} height　高さ
 * @param {Number} leftBottomX　左下のX座標
 * @param {Number} leftBottomY　左下のY座標
 * @return {Shape} filedOuterFrame 台形の参照
 */
export function CreateTrapezoid(bottomWidth, topWidth, height, leftBottomX, leftBottomY) {
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
 * 平行四辺形を作成する関数
 * @param {Number} width 辺の長さ
 * @param {Number} height　高さ
 * @param {Number} leftBottomX　左下のX座標
 * @param {Number} leftBottomY　左下のY座標
 * @param {VerticalNumber} shift ずれ
 * @param {string} orientation　ずれる向き 'right'or'left'
 * @return {Shape} ParallelRect 平行四辺形の参照
 */
export function CreateParallelRect(width, height, leftBottomX, leftBottomY, shift, orientation) {
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
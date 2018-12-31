//グラフィックの定数

const DisplayWidth = 1500;
const DisplayHeight = 1000;
const FiledWidth = 800;
const FiledHeight = 600;
const FiledCenterInterval = 100; //真ん中の隙間の高さ
const VerticalNumber = 4;
const HorizontalNumber = 5;
const FiledLeftX = (DisplayWidth - FiledWidth) / 2;
const FiledTopY = (DisplayHeight - FiledHeight) / 2;
const CardWidth = 80;
const CardHeight = 120;

//1ブロックの大きさ
const BlockSize = {
    height: (FiledHeight - FiledCenterInterval) / VerticalNumber,  //125
    width: FiledWidth / HorizontalNumber  //160
};

export const GraphicConfig = {
    DisplayWidth: DisplayWidth,
    DisplayHeight: DisplayHeight,
    FiledWidth: FiledWidth,
    FiledHeight: FiledHeight,
    FiledLeftX: (DisplayWidth - FiledWidth) / 2,
    FiledTopY: (DisplayHeight - FiledHeight) / 2,
    FiledCenterInterval: FiledCenterInterval, //真ん中の隙間の高さ
    //縦のブロック数
    VerticalNumber: VerticalNumber,
    //横のブロック数
    HorizontalNumber: HorizontalNumber,
    //1ブロックの大きさ
    BlockSize: BlockSize,

    //敵のデッキ置き場
    EnemyDeckX: FiledLeftX - BlockSize.width - 25,
    EnemyDeckY: FiledTopY,
    //自分のデッキ置き場
    PlayerDeckX: FiledWidth + FiledLeftX + 25,
    PlayerDeckY: FiledHeight + FiledTopY - BlockSize.height,
    CardHeight: CardHeight,
    CardWidth: CardWidth,
    CardFrameThickness: 0.5, //カードの枠線の太さ
    DrawAnimationTime: 200,
    ShuffleAnimationTime: 50,
    PlayerHandX: FiledLeftX,
    PlayerHandY: FiledTopY + FiledHeight + (FiledTopY / 4),
    EnemyHandX: FiledLeftX + FiledWidth,
    EnemyHandY: (FiledTopY - CardHeight) / 2,
    HandInterval: 30
};

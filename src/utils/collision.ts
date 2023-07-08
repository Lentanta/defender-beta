export const collisionRect = (first: any, second: any) => {
    if (
        first.position.x < second.position.x + second.dimension.width &&
        first.position.x + first.dimension.width > second.position.x &&
        first.position.y < second.position.y + second.dimension.height &&
        first.position.y + first.dimension.height > second.position.y
    ) {
        return true;
    }
    return false;
};

export const isRectangleCollideRectangle = (
    firstX: number,
    firstY: number,
    firstWidth: number,
    firstHeight: number,
    secondX: number,
    secondY: number,
    secondWidth: number,
    secondHeight: number
) => {
    if (
        firstX < secondX + secondWidth &&
        firstY < secondY + secondHeight &&
        firstX + firstWidth > secondX &&
        firstY + firstHeight > secondY
    ) return true
    return false;
};
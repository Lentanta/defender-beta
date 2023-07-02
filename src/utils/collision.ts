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
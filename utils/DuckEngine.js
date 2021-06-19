export const intitGame = (width, height) => {
    window.canvas = document.createElement('canvas');
    window.ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    document.body.appendChild(canvas);
};
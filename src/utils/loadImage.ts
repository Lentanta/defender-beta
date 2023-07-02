export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve) => {
    let image = new Image();
    image.onload = () => { resolve(image) };
    image.src = src;
  });
};
export class Sprite {
  constructor(src) {
    this.isLoading = true;
    this.img = new Image();
    this.imgSrc = src;
  }

  loadSprite() {
    this.img.onload = () => {
      console.log("Load Ready!");
      this.isLoading = false;
    }
    this.img.src = this.imgSrc;
  };
}
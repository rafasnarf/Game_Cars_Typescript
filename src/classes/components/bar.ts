interface IConfig {
  scene:Phaser.Scene;
  color?:number;
  width?:number;
  height?:number;
  x:number;
  y:number;
}

export default class Bar extends Phaser.GameObjects.Container {

  private bar: Phaser.GameObjects.Graphics;

  constructor(config:IConfig){
    super(config.scene);
    this.scene=config.scene;
    
    if(!config.color){
      config.color=0xff0000;
    }
    if(!config.width){
      config.width = 200;
    }
    if(!config.height){
      config.height = config.width/4;
    }

    //draw the bar
    this.bar=this.scene.add.graphics();
    this.bar.fillStyle(config.color,1);
    this.bar.fillRect(0,0,config.width,config.height);
    this.add(this.bar);
    this.bar.x=-config.width/2;
    this.bar.y=-config.height/2;

    if(config.x){
      this.x=config.x;
    }

    if(config.y){
      this.y=config.y;
    }

    this.scene.add.existing(this);
  }

  setPercent(per:number){
    this.bar.scaleX=per;
  }
}
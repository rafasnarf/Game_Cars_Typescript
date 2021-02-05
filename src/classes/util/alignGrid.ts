import * as gameConfig from '../../config';

interface IConfig
{
  scene:Phaser.Scene;
  rows:number;
  cols:number;
  height?:number;
  width?:number;
}

export default class AlignGrid
{
  private data:IConfig;
  private scene:Phaser.Scene;
  private grid:Phaser.GameObjects.Graphics;
  private ch:number;
  private cw:number;

  constructor(config:IConfig)
  {
    this.data=config;
    if (!config.scene){
      console.log("missing scene");
      return;
    }

    if(!config.rows){
      config.rows=5;
    }

    if(!config.cols){
      config.cols=5;
    }

    if(!config.height) {
      config.height = gameConfig.default.scale.height;
    }

    if(!config.width) {
      config.width = gameConfig.default.scale.width;
    }

    this.scene=config.scene;

    this.cw=config.width/config.cols;
    this.ch=config.height/config.rows;
     
  }

  public show()
  {
    this.grid=this.scene.add.graphics();
    this.grid.lineStyle(2,0xff0000);

    for(var i=0; i<this.data.width;i+=this.cw) {
      this.grid.moveTo(i,0);
      this.grid.lineTo(i,this.data.height);
    }

    for(var i=0; i<this.data.height;i+=this.ch) {
      this.grid.moveTo(0,i);
      this.grid.lineTo(this.data.height,i);
    }

    this.grid.strokePath();
  }

  public placeAt(xx,yy,objs) 
  {
    //calc position based upon the cellwidth and cellheight

    var x2=this.cw*xx+this.cw/2;
    var y2=this.ch*yy+this.ch/2;

    objs.x=x2;
    objs.y=y2;
  }

  public placeAtIndex(index,obj)
  {
    var yy=Math.floor(index/this.data.cols);
    var xx=index-(yy*this.data.cols);

    this.placeAt(xx,yy,obj);
  }

  public showNumbers()
  {
    this.show()
    var count=0;
    for(var i=0;i<this.data.rows;i++){
      for(var j=0;j<this.data.cols;j++){
        var numText = this.scene.add.text(0,0,`${count}`,{color:'#ff0000'});
        numText.setOrigin(0.5,0.5);
        this.placeAtIndex(count,numText);
        count++;
      }
    }
  }
}
import Align from "./util/align";
import Collision from './util/collision';
import gameConfig from '../config';
import Model from "./mc/model";
import Constants from "./constants";

interface IConfig {
  scene:Phaser.Scene;
}

export default class Road extends Phaser.GameObjects.Container 
{
  private back: Phaser.GameObjects.Image;
  private lineGroup: Phaser.GameObjects.Group;
  private counter: number;
  public car: Phaser.GameObjects.Sprite;
  private vSpace: number;
  private object: Phaser.GameObjects.Sprite;
  private model: Model;
  private G: Constants;
  private emitter: Phaser.Events.EventEmitter;
  

  constructor(config:IConfig)
  {
    super(config.scene);
    this.model = this.scene.registry.get('model');
    this.G = this.scene.registry.get('constants');
    this.emitter = this.scene.registry.get('emitter');
    this.scene=config.scene;
    this.back=this.scene.add.image(0,0,'road');
    this.add(this.back);
    this.scene.add.existing(this);

    Align.scaleToGameWidth(this.back,.5);
    this.setSize(this.back.displayWidth,gameConfig.scale.height);

    this.lineGroup = this.scene.add.group();
    this.counter=0;

    //Adding the car
    this.car = this.scene.add.sprite(this.displayWidth/4,gameConfig.scale.height*.9,'cars');
    Align.scaleToGameWidth(this.car,.10);
    this.add(this.car);

    this.back.setInteractive();
    this.back.on('pointerdown', this.changeLanes, this);

    this.addObject();

  }

  addObject()
  {
    let objs = [
      {key:'pcar1', speed:10,scale: 10},
      {key:'pcar2',speed:10,scale: 10},
      {key:'cone',speed:20, scale: 5},
      {key:'barrier',speed:20, scale: 8}
    ];
    let index = Math.floor(Math.random()*4);
    let key = objs[index].key;
    let speed = objs[index].speed;
    let scale = objs[index].scale/100;
    this.object=this.scene.add.sprite(-this.displayWidth/4,0,key);
    // this.object.speed=speed;
    this.object.setData({speed: speed});
    let lane = Math.random()*100;
    if(lane<50) {
      this.object.x=this.displayWidth/4;
    }
    Align.scaleToGameWidth(this.object,scale);
    this.add(this.object);
  }

  changeLanes()
  {
    // if(model.gameOver==true){
    //   return;
    // }
    // mediaManager.playSound('whoosh');
    // emitter.emit(G.PLAY_SOUND,'whoosh');
    if(this.car.x>0){
      this.car.x=-this.displayWidth/4;
    } else {
      this.car.x=this.displayWidth/4;
    }
  }

  makeLines()
  {
    this.vSpace = this.displayHeight/10;

    for(var i=0;i<20;i++) {
      var line = this.scene.add.image(this.x,this.vSpace*i,'line');
      line.originY = line.y;
      this.lineGroup.add(line);
    }
  }

  moveLines()
  {
    if(this.model.gameOver==true){
      return;
    }
    this.lineGroup.children.iterate(function(child){
      child.y+=this.vSpace/20;
    }.bind(this));
    this.counter++;
    if(this.counter==20){
      this.counter=0;
      this.lineGroup.children.iterate(function(child){
        child.y=child.originY
      }.bind(this));
    }
  }

  goGameOver(){
    // this.scene.start('SceneOver');
  }

  moveObject()
  {
    if(this.model.gameOver==true){
      return;
    }
    this.object.y+=(this.vSpace/this.object.getData('speed'))*this.model.speed;
    if(Collision.checkCollide(this.car,this.object)==true){
      this.car.alpha=.5;
      this.model.gameOver=true;
      // emitter.emit(G.PLAY_SOUND,'boom');
      // mediaManager.playSound('boom');
      this.scene.tweens.add({targets:this.car,duration:1000,y:gameConfig.scale.height,angle:-270})
      this.scene.time.addEvent({delay:2000,callback:this.goGameOver,callbackScope:this.scene, loop: false});
    } else {
      this.car.alpha=1;
    }
    
    if(this.object.y>gameConfig.scale.height){
      this.emitter.emit(this.G.SCORE_UPDATE,1)
      this.object.destroy();
      this.addObject();
    }
  }


}
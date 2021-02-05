import Road from "../classes/road";
import ScoreBox from '../classes/components/scoreBox';
import gameConfig from '../config';
import Model from "../classes/mc/model";
import Constants from "../classes/constants";

export default class SceneMain extends Phaser.Scene {

  private road: Road;
  private road2: Road;
  private sb: ScoreBox;
  public emitter: Phaser.Events.EventEmitter;
  public model: Model;
  public G: Constants;

  constructor() {
      //chamado assim que a classe é criada
      super('SceneMain');
  }
  preload()
  {
    //preload all the assets
    this.emitter = this.registry.get('emitter');
    this.model = this.registry.get('model');
    this.G = this.registry.get('constants');

  }
  create() {

      // controller = new Controller();
      this.model.gameOver=false;
      this.model.speed=1;
      this.model.score=0;

      //define our objects
      this.road = new Road({scene:this});
      this.road.x = this.game.scale.width*.25;
      this.road.makeLines();
      //
      //
      this.road2 = new Road({scene:this});
      this.road2.x = this.game.scale.width*.75;
      this.road2.makeLines();

      this.road2.car.setFrame(1);

      // this.alignGrid= new AlignGrid({scene:this,rows:5,cols:5});
      //this.alignGrid.showNumbers();

      // var soundButtons = new SoundButtons({scene:this});

      this.sb = new ScoreBox({scene:this});
      this.sb.x = gameConfig.scale.width/2;
      this.sb.y=50;
      this.emitter.on(this.G.SCORE_UPDATE,this.scoreUpdate,this);

      console.log("SceneMain");

  }

  scoreUpdate(){
    if(this.model.score/5==Math.floor(this.model.score/5)){
      this.model.speed+=.25;
      if(this.model.speed>1.5){
        this.model.speed=1.5;
      }
    }
  }

  update() {
    //constantily running loop
    this.road.moveLines();
    this.road.moveObject();
    //
    //
    this.road2.moveLines();
    this.road2.moveObject();
  }
}
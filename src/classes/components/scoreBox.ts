import Constants from "../constants";
import Model from "../mc/model";

interface IConfig {
  scene:Phaser.Scene;
  x?:number;
  y?:number;
}
export default class ScoreBox extends Phaser.GameObjects.Container 
{
  private text1: Phaser.GameObjects.Text;
  public emitter: Phaser.Events.EventEmitter;
  public G: Constants;
  public model: Model;

  constructor(config:IConfig)
  {
    super(config.scene);

    this.scene = config.scene;
    this.emitter = this.scene.registry.get('emitter');
    this.model = this.scene.registry.get('model');
    this.G = this.scene.registry.get('constants');
    this.text1=this.scene.add.text(0,0,"SCORE:0");
    this.text1.setOrigin(0.5,.5);
    this.add(this.text1);
    if(config.x){
      this.x=config.x;
    }
    if(config.y){
      this.y=config.y;
    }
    this.text1.setBackgroundColor("#000000");

    this.scene.add.existing(this );

    this.emitter.on(this.G.SCORE_UPDATE, this.scoreUpdate, this);
  }

  scoreUpdate()
  {
    this.text1.setText("SCORE: "+this.model.score);
  }
}
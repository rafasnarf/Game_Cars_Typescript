import Model from "../mc/model";

interface IConfig {
  scene: Phaser.Scene;
  key: string;
  text: string;
  textConfig?: Phaser.GameObjects.TextStyle;
  x?:number;
  y?:number;
  event: string;
  params?:any;
}

export default class FlatButton extends Phaser.GameObjects.Container 
{

  private config:IConfig;
  private back: Phaser.GameObjects.Image;
  private text1: Phaser.GameObjects.Text;
  public model: Model;
  public emitter: Phaser.Events.EventEmitter;

  constructor(config:IConfig)
  {
    super(config.scene);
    if(!config.scene){
      console.log("missing scene");
      return;
    }
    if(!config.key){
      console.log("missing key");
      return;
    }
    
    this.config=config;
    this.scene=config.scene;

    this.emitter = this.scene.registry.get('emitter');
    this.back=this.scene.add.image(0,0,config.key);

    this.add(this.back);

    if(config.text){

      if(config.textConfig){
        this.text1=this.scene.add.text(0,0,config.text,config.textConfig);
      } else {
        this.text1=this.scene.add.text(0,0,config.text);
        
      }
      this.text1.setOrigin(0.5,0.5);
        this.add(this.text1);
      
    }

    if(config.x){
      this.x=config.x;
    }

    if(config.y){
      this.y=config.y;
    }

    this.scene.add.existing(this);

    if(config.event){
      this.back.setInteractive(); 
      this.back.on('pointerdown',this.pressed,this);
      // this.back.on('pointerdown',this.pressed,this);
    }

    // if(this.model.isMobile == -1){
    //   this.back.on('pointerover',this.over,this);
    //   this.back.on('pointerout',this.out,this);
    // }
    
  }

  over() {
    this.y-=5;
  }

  out() {
    this.y+=5;
  }

  pressed()
  {
    if(this.config.params){
      this.emitter.emit(this.config.event, this.config.params);
    } else {
      this.emitter.emit(this.config.event);
    }
    
  }
}
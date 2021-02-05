import FlatButton from '../classes/ui/flatButton';
import Align from '../classes/util/align';
import AlignGrid from '../classes/util/alignGrid';

export default class SceneTitle extends Phaser.Scene {

  private alignGrid: AlignGrid;
  private backImage: Phaser.GameObjects.Image;
  private btnStart: FlatButton
  public emitter: Phaser.Events.EventEmitter;


  constructor() {
      super('SceneTitle');
  }
  preload()
  {
    this.emitter = this.registry.get('emitter');
    this.load.image('title','assets/img/title.png');
    this.load.image('button1','assets/img/ui/buttons/2/4.png');
    this.alignGrid = new AlignGrid({scene:this,cols:5,rows:5,height:this.scale.height,width:this.scale.width});
  }
  create() {
      // this.emitter = new Phaser.Events.EventEmitter();
      // this.controller = new Controller();

      this.backImage=this.add.image(this.scale.width/2,this.scale.height/2,'titleBack');

      var title=this.add.image(0,0,'title');
      Align.scaleToGameWidth(title,.8);
      this.alignGrid.placeAtIndex(7,title);

      this.btnStart=new FlatButton({scene:this,key:'button1',text:'Start!!!',event:'start_game'})
      this.alignGrid.placeAtIndex(17,this.btnStart);

      this.emitter.on('start_game',this.startGame,this);
      // this.mediaManager = new MediaManager({scene:this});
      // this.mediaManager.setBackgroundMusic('backgroundMusic');

      // this.alignGrid.show();
      // this.alignGrid.showNumbers();

  }
  startGame() {
    this.scene.start('SceneMain');
  }
  update() {}
}
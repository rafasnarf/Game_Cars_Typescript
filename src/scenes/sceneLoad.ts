import Phaser from 'phaser';
import AlignGrid from '../classes/util/alignGrid';
import Bar from '../classes/components/bar';

export default class SceneLoad extends Phaser.Scene {

  private barra:Bar;
  private progText:Phaser.GameObjects.Text;
  private alignGrid: AlignGrid;

  constructor(config) {
    super('SceneLoad');
  }

  preload() {
    this.alignGrid=new AlignGrid({scene:this,cols:5,rows:5,height:this.scale.height,width:this.scale.width});
    this.barra=new Bar({scene:this,x:this.scale.width,y:this.scale.height});
    this.alignGrid.placeAtIndex(12,this.barra);
    this.progText=this.add.text(
      this.game.scale.width/2,
      this.game.scale.height/2,
      "0%",
      {
        color:'#ffffff',
        fontSize:this.game.scale.width/20+"px"
      }
    );
    this.progText.setOrigin(0.5,0.5);
    this.load.on('progress',this.onProgress,this);

    this.load.image('road','assets/img/road.jpg');
    this.load.spritesheet(
      'cars',
      'assets/img/cars.png',
      {
        frameWidth:60,
        frameHeight:126
      }
    );
    this.load.image('titleBack','assets/img/titleBack.jpg');
    this.load.image('line','assets/img/line.png');
    this.load.image('pcar1','assets/img/pcar1.png' );
    this.load.image('pcar2','assets/img/pcar2.png' );
    this.load.image('barrier','assets/img/barrier.png' );
    this.load.image('cone','assets/img/cone.png' );

    this.load.image('toggleBack','assets/img/ui/toggles/3.png');
    this.load.image('sfxOff','assets/img/ui/icons/sfx_off.png');
    this.load.image('sfxOn','assets/img/ui/icons/sfx_on.png');
    this.load.image('musicOn','assets/img/ui/icons/music_on.png');
    this.load.image('musicOff','assets/img/ui/icons/music_off.png');

    this.load.audio('backgroundMusic',['assets/audio/random-race.mp3','assets/audio/random-race.ogg']);
    this.load.audio('boom',['assets/audio/boom.mp3','assets/audio/boom.ogg']);
    this.load.audio('whoosh',['assets/audio/whoosh.mp3','assets/audio/whoosh.ogg']);
    
  }

  onProgress(value:number){
    const per = Math.floor(value*100);
    // console.log(per);
    this.progText.setText(per+'%');
    this.barra.setPercent(value);
  }

  create() {
    this.alignGrid.show();
    this.alignGrid.showNumbers();
    this.scene.start('SceneTitle');
  }
}

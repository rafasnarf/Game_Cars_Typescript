class SceneOver extends Phaser.Scene {
  constructor() {
      super('SceneOver');
  }
  preload()
  {
    this.load.image('title','assets/img/title.png');
    this.load.image('button1','assets/ui/buttons/1/1.png');
  }
  create() {
      this.alignGrid = new AlignGrid({row:11,cols:11,scene:this});
      //this.alignGrid.showNumbers();

      this.backImage=this.add.image(game.config.width/2,game.config.height/2,'titleBack');

      var title=this.add.image(0,0,'title');
      Align.scaleToGameWidth(title,.8);
      this.alignGrid.placeAtIndex(16,title);

      var btnStart=new FlatButton({scene:this, key:'button1', text:'Play Again',event:'start_game'});
      this.alignGrid.placeAtIndex(27,btnStart);

      emitter.on('start_game',this.startGame,this);

  }
  startGame() {
    this.scene.start('SceneMain');
  }
  update() {}
}
import Constants from '../constants';
import Model from '../mc/model';

interface IConfig {
  scene?:Phaser.Scene;
}

export default class MediaManager {


  // private scene: Phaser.Scene;
  // private emitter:Phaser.Events.EventEmitter;
  // private model: Model;
  // private background: Phaser.Sound.BaseSound;

  // constructor(config?:IConfig){
  //   this.scene=config.scene;

  //   // this.emitter.emit(this.G.playSound,this.playSound, this);
  //   // this.emitter.emit(this.G.musicChanged,this.musicChanged,this);
  // }

  // musicChanged(){
  //   if(this.model.musicOn==false){
  //       this.background.stop();
  //     } else {
  //       this.background.play();
  //     }
      
  //   }

  // playSound(key: string) {
  //   if(this.model.soundOn==true){
  //     var sound = this.scene.sound.add(key);
  //     sound.play();
  //   }
    
  // }

  // setBackgroundMusic(key){
  //   if(this.model.musicOn==true){
  //     this.background = this.scene.sound.add(key,{volume:.3,loop:true});
  //     this.background.play();
  //   }
    
  // }
}
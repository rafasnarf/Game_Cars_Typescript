import Constants from '../constants';

interface IConfig {
  scene:Phaser.Scene;
}

export default class Model
{

  public _score:number;
  public soundOn:boolean;
  public _musicOn:boolean;
  public gameOver:boolean;
  public _speed:number;
  // public mediaManager: MediaManager;
  public emitter: Phaser.Events.EventEmitter;
  public G: Constants;
  public isMobile: number;
  private scene: Phaser.Scene;

  constructor(config:IConfig)
  {
    this.emitter = this.scene.registry.get('emitter');
    this.G = this.scene.registry.get('constants');
    this._score=0;
    this.soundOn=true;
    this._musicOn=true;
    this.gameOver=false;
    this._speed=1;
  }

  // public set musicOn(val){
  //   this._musicOn = val;
  //   //emitter.emit(G.MUSIC_CHANGED);
  //   this.mediaManager.musicChanged();
  // }

  // public get musicOn(){
  //   return this._musicOn;
  // }

  public set score(val)
  {
    this._score=val;
    this.emitter.emit(this.G.scoreUpdate);
  }

  public get score()
  {
    return this._score;
  }

  public get speed(){
    return this._speed;
  }

  public set speed(val){
    this._speed = val;
  }
}
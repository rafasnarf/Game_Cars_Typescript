export default class Constants
{

  public SET_SCORE:string;
  public UP_POINTS:string;
  public SCORE_UPDATE:string;
  public PLAY_SOUND:string;
  public MUSIC_CHANGED:string;
  public TOGGLE_SOUND:string;
  public TOGGLE_MUSIC:string;

  constructor()
  {
    const SET_SCORE = "setScore";
    const UP_POINTS = "upPoints";
    const SCORE_UPDATE = "scoreUpdate";
    const PLAY_SOUND = "playSound";
    const MUSIC_CHANGED = "musicChanged";
    const TOGGLE_SOUND = 'toggleSound';
    const TOGGLE_MUSIC = 'toggleMusic';
  }

  
  public get setScore(): string {
    return this.SET_SCORE;
  }

  public get upPoints(): string {
    return this.UP_POINTS;
  }

  public get scoreUpdate(): string {
    return this.SCORE_UPDATE;
  }

  public get playSound(): string {
    return this.PLAY_SOUND;
  }

  public get musicChanged(): string {
    return this.MUSIC_CHANGED;
  }
  
  public get toggleSound(): string {
    return this.TOGGLE_SOUND;
  }

  public get toggleMusic(): string {
    return this.TOGGLE_MUSIC;
  }
  
}
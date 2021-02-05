import * as gameConfig from '../../config';

export default class Align
{
  static scaleToGameWidth(obj,per)
  {
    obj.displayWidth = gameConfig.default.scale.width*per;
    obj.scaleY = obj.scaleX;
  }

  static center(obj)
  {
    obj.x = gameConfig.default.scale.width/2;
    obj.y = gameConfig.default.scale.height/2;
  }

  static centerH(obj)
  {
    obj.x = gameConfig.default.scale.width/2;
  }

  static centerV(obj)
  {
    obj.y = gameConfig.default.scale.height/2;
  }
}
import Phaser from 'phaser';
import Constants from './classes/constants';
import Controller from './classes/mc/controller';
import Model from './classes/mc/model';
import MediaManager from './classes/util/mediaManager';
import config from './config';
import SceneLoad from './scenes/sceneLoad';
import SceneTitle from './scenes/sceneTitle';
import SceneMain from './scenes/sceneMain';

const model = new Model();
const G = new Constants();
const controller = new Controller();
const mediaManager = new MediaManager();
const emitter = new Phaser.Events.EventEmitter();

const game = new Phaser.Game(
  Object.assign(config, {
    scene: [SceneLoad, SceneTitle, SceneMain]
  }),
);

game.registry.list = {
  constants: G,
  model: model,
  controller: controller,
  mediaManager: mediaManager,
  emitter: emitter
}
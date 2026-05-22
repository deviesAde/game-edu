import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import MainScene from './scenes/MainScene';
import LearningScene from './scenes/LearningScene';
import { ThemeId, LevelId } from '../lib/questionGenerator';

export const initGame = (parent: string, theme: ThemeId, level: LevelId) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#e0f2fe',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: '100%',
      height: '100%',
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: false
      }
    },
    scene: [BootScene, LearningScene, MainScene]
  };

  const game = new Phaser.Game(config);
  game.registry.set('theme', theme);
  game.registry.set('level', level);

  // BootScene will handle the transition based on registry
  game.scene.start('BootScene');

  return game;
};

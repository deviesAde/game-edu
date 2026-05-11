import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import { ThemeId, LevelId } from '../lib/questionGenerator';

export const initGame = (parent: string, theme: ThemeId, level: LevelId) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent,
    width: 800,
    height: 600,
    backgroundColor: '#e0f2fe',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: false
      }
    },
    scene: [MainScene]
  };

  const game = new Phaser.Game(config);
  game.registry.set('theme', theme);
  game.registry.set('level', level);
  return game;
};

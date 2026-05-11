"use client";

import Phaser from 'phaser';
import { generateQuestion, ThemeId, LevelId, Question } from '../../lib/questionGenerator';
import { addTokens } from '../../lib/storage';
import { playSound } from '../../lib/sound';

export default class MainScene extends Phaser.Scene {
  private currentQuestion!: Question;
  private questionText!: Phaser.GameObjects.Text;
  private optionObjects: Phaser.GameObjects.Container[] = [];
  private questionIndex: number = 0;

  constructor() {
    super('MainScene');
  }

  preload() {
    for (let i = 1; i <= 6; i++) {
      if (i !== 2) this.load.image(`siang_${i}`, `/siang/siang (${i}).jpeg`);
      this.load.image(`sore_${i}`, `/sore/sore (${i}).jpeg`);
      this.load.image(`malam_${i}`, `/malam/malam (${i}).jpeg`);
    }
  }

  create() {
    const theme = this.registry.get('theme') as ThemeId || 'size';
    const level = this.registry.get('level') as LevelId || 1;

    const nextQ = generateQuestion(theme, level, this.questionIndex);
    
    if (!nextQ) {
       this.showLevelComplete();
       return;
    }
    
    this.currentQuestion = nextQ;

    // --- BACKGROUND ---
    this.add.ellipse(400, 680, 1200, 300, 0x4ade80).setDepth(-2);
    this.add.ellipse(200, 630, 800, 250, 0x22c55e).setDepth(-3);
    const sun = this.add.circle(700, 80, 50, 0xfde047).setDepth(-4);
    this.tweens.add({ targets: sun, scale: 1.1, duration: 2000, yoyo: true, repeat: -1 });

    const mascot = this.add.text(70, 520, '🐰', { fontSize: '90px' }).setOrigin(0.5).setDepth(-1);
    this.tweens.add({ targets: mascot, y: 500, duration: 1200, yoyo: true, repeat: -1 });

    // --- QUESTION BOARD (Lowered for safety) ---
    const boardContainer = this.add.container(400, 120).setScale(0);
    const boardGraphics = this.add.graphics();
    boardGraphics.fillStyle(0xffffff, 1);
    boardGraphics.fillRoundedRect(-360, -60, 720, 120, 30);
    boardGraphics.lineStyle(8, 0xfbbf24, 1);
    boardGraphics.strokeRoundedRect(-360, -60, 720, 120, 30);
    boardContainer.add(boardGraphics);

    this.questionText = this.add.text(0, 0, this.currentQuestion.questionText, {
      fontFamily: '"Comic Sans MS", "Chalkboard SE"', fontSize: '32px', color: '#0369a1', align: 'center', wordWrap: { width: 680 }
    }).setOrigin(0.5);
    boardContainer.add(this.questionText);
    this.tweens.add({ targets: boardContainer, scale: 1, duration: 600, ease: 'Back.easeOut' });

    // --- OBJECTS TO COUNT ---
    if (this.currentQuestion.theme === 'number') {
       const fruit = this.currentQuestion.metadata?.fruit || '🍎';
       let fruitString = '';
       for(let i=0; i<this.currentQuestion.correctAnswer; i++) fruitString += `${fruit} `;
       const fruitsText = this.add.text(400, 230, fruitString.trim(), { fontSize: '70px' }).setOrigin(0.5).setScale(0);
       this.tweens.add({ targets: fruitsText, scale: 1, delay: 300, duration: 600, ease: 'Back.easeOut' });
    }

    this.renderOptions();
  }

  renderOptions() {
    this.optionObjects.forEach(obj => obj.destroy());
    this.optionObjects = [];
    const count = this.currentQuestion.options.length;
    const spacing = count === 2 ? 300 : 250;
    const startX = 400 - ((count - 1) * spacing / 2);
    
    this.currentQuestion.options.forEach((opt, index) => {
      const container = this.add.container(startX + (index * spacing), 420); // Balanced position
      container.setScale(0);
      const bg = this.add.rectangle(0, 0, 210, 210, 0xffffff).setStrokeStyle(6, 0x38bdf8).setInteractive({ useHandCursor: true });
      container.add(bg);

      if (this.currentQuestion.theme === 'size') {
        container.add(this.add.circle(0, 0, opt.size / 2, 0x4ade80).setStrokeStyle(4, 0x16a34a));
      } else if (this.currentQuestion.theme === 'shape') {
         if (opt === 'circle') container.add(this.add.circle(0, 0, 70, 0xfb923c).setStrokeStyle(4, 0xc2410c));
         else if (opt === 'square') container.add(this.add.rectangle(0, 0, 130, 130, 0xfb923c).setStrokeStyle(4, 0xc2410c));
         else if (opt === 'triangle') container.add(this.add.triangle(0, 0, 0, -75, 65, 38, -65, 38, 0xfb923c).setStrokeStyle(4, 0xc2410c));
      } else if (this.currentQuestion.theme === 'number') {
         container.add(this.add.text(0, 0, opt.toString(), { fontFamily: 'Arial Black', fontSize: '80px', color: '#a855f7' }).setOrigin(0.5));
      } else if (this.currentQuestion.theme === 'time') {
         let rIdx = Math.floor(Math.random() * 6) + 1;
         if (opt === 'siang' && rIdx === 2) rIdx = 1;
         const img = this.add.image(0, 0, `${opt}_${rIdx}`);
         img.setScale(Math.min(190 / img.width, 190 / img.height));
         container.add(img);
      }

      this.tweens.add({ targets: container, scale: 1, delay: 200 + (index * 150), duration: 500, ease: 'Back.easeOut', onStart: () => playSound('pop') });
      bg.on('pointerdown', () => this.handleAnswer(opt, container));
      bg.on('pointerover', () => { playSound('hover'); bg.setFillStyle(0xe0f2fe); });
      bg.on('pointerout', () => bg.setFillStyle(0xffffff));
      this.optionObjects.push(container);
    });
  }

  showLevelComplete() {
    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5);
    const winBox = this.add.container(400, 300).setScale(0);
    winBox.add(this.add.rectangle(0, 0, 500, 350, 0xffffff).setStrokeStyle(10, 0xfde047));
    winBox.add(this.add.text(0, -80, "HEBAT! 🎉", { fontSize: '60px', color: '#f59e0b', fontStyle: 'bold' }).setOrigin(0.5));
    winBox.add(this.add.text(0, 20, "Konsep ini sudah kamu kuasai!\nAyo coba Latihan di Level 2!", { fontSize: '24px', color: '#475569', align: 'center' }).setOrigin(0.5));
    
    const btn = this.add.rectangle(0, 110, 300, 70, 0x22c55e).setInteractive({ useHandCursor: true });
    winBox.add(btn);
    winBox.add(this.add.text(0, 110, "PILIH GAME LAIN", { fontSize: '24px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5));
    
    this.tweens.add({ targets: winBox, scale: 1, duration: 600, ease: 'Back.easeOut' });
    btn.on('pointerdown', () => { window.location.href = '/themes'; });
  }

  handleAnswer(selectedOpt: any, container: Phaser.GameObjects.Container) {
    // Disable all options
    this.optionObjects.forEach(obj => (obj.getAt(0) as Phaser.GameObjects.Rectangle).disableInteractive());

    const isCorrect = this.currentQuestion.theme === 'size' 
      ? selectedOpt.id === this.currentQuestion.correctAnswer 
      : selectedOpt === this.currentQuestion.correctAnswer;

    // Full screen overlay for feedback
    const overlay = this.add.rectangle(400, 300, 800, 600, isCorrect ? 0x22c55e : 0xef4444, 0).setDepth(100);
    
    this.tweens.add({
       targets: overlay,
       fillAlpha: 0.3,
       duration: 200,
       yoyo: true,
       hold: 300,
       onComplete: () => {
          if (!isCorrect) overlay.destroy();
       }
    });

    if (isCorrect) {
       playSound('correct');
       addTokens(1);
       this.questionIndex++;

       // Success Popup
       const popup = this.add.container(400, 300).setDepth(101).setScale(0);
       const box = this.add.graphics();
       box.fillStyle(0xffffff, 1);
       box.fillRoundedRect(-200, -150, 400, 300, 30);
       box.lineStyle(10, 0xfde047, 1);
       box.strokeRoundedRect(-200, -150, 400, 300, 30);
       popup.add(box);

       const title = this.add.text(0, -60, "HOREE! ⭐", { 
         fontFamily: '"Comic Sans MS", "Chalkboard SE"', fontSize: '64px', color: '#f59e0b', fontStyle: 'bold' 
       }).setOrigin(0.5);
       popup.add(title);

       const sub = this.add.text(0, 20, "Jawabanmu Benar!", { 
         fontFamily: '"Comic Sans MS"', fontSize: '28px', color: '#475569' 
       }).setOrigin(0.5);
       popup.add(sub);

       const nextBtn = this.add.container(0, 90);
       const btnBg = this.add.rectangle(0, 0, 200, 60, 0x22c55e, 1).setInteractive({ useHandCursor: true });
       const btnText = this.add.text(0, 0, "LANJUT", { fontSize: '24px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
       nextBtn.add([btnBg, btnText]);
       popup.add(nextBtn);

       this.tweens.add({ targets: popup, scale: 1, duration: 500, ease: 'Back.easeOut' });

       btnBg.on('pointerdown', () => {
          this.scene.restart();
       });

    } else {
       playSound('wrong');
       // Shake the option
       this.tweens.add({ 
          targets: container, 
          x: '+=15', 
          duration: 50, 
          yoyo: true, 
          repeat: 3, 
          onComplete: () => {
             // Re-enable interactions after a short delay
             this.time.delayedCall(500, () => {
                this.optionObjects.forEach(obj => (obj.getAt(0) as Phaser.GameObjects.Rectangle).setInteractive({ useHandCursor: true }));
             });
          }
       });
    }
  }
}

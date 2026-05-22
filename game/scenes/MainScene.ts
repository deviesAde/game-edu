"use client";

import Phaser from 'phaser';
import { generateQuestion, ThemeId, LevelId, Question } from '../../lib/questionGenerator';
import { addTokens } from '../../lib/storage';
import { playSound } from '../../lib/sound';

export default class MainScene extends Phaser.Scene {
  private currentQuestion!: Question;
  private questionIndex: number = 0;
  private correctAnswers: number = 0;
  private totalQuestions: number = 10;
  private questionContainer!: Phaser.GameObjects.Container;
  private optionObjects: Phaser.GameObjects.Container[] = [];

  constructor() {
    super('MainScene');
  }

  preload() {
    // Assets are now preloaded in BootScene
  }

  create() {
    const theme = this.registry.get('theme') as ThemeId || 'size';
    this.createEnhancedBackground(theme);
    this.questionContainer = this.add.container(0, 0);
    this.startNewQuestion();
  }

  startNewQuestion() {
    const theme = this.registry.get('theme') as ThemeId || 'size';
    const level = this.registry.get('level') as LevelId || 2;
    const centerX = this.cameras.main.width / 2;

    this.questionContainer.removeAll(true);
    this.optionObjects = [];

    const nextQ = generateQuestion(theme, level, this.questionIndex);
    
    if (!nextQ || this.questionIndex >= this.totalQuestions) {
       this.showLevelComplete();
       return;
    }
    
    this.currentQuestion = nextQ;

    // --- QUESTION BOARD ---
    const boardContainer = this.add.container(centerX, 180).setScale(0);
    const boardGraphics = this.add.graphics();
    boardGraphics.fillStyle(0xffffff, 0.9).fillRoundedRect(-400, -60, 800, 120, 40);
    boardGraphics.lineStyle(6, 0x0ea5e9, 1).strokeRoundedRect(-400, -60, 800, 120, 40);
    boardGraphics.fillStyle(0x0ea5e9, 1).fillCircle(-400, 0, 50).fillCircle(400, 0, 50);
    boardContainer.add(boardGraphics);
    
    const qText = this.add.text(0, 0, this.currentQuestion.questionText, {
      fontFamily: 'Fredoka', fontSize: '38px', color: '#0369a1', align: 'center', wordWrap: { width: 680 }, fontStyle: 'bold'
    }).setOrigin(0.5);
    boardContainer.add(qText);
    this.tweens.add({ targets: boardContainer, scale: 1, duration: 600, ease: 'Back.easeOut' });
    this.questionContainer.add(boardContainer);

    if (this.currentQuestion.theme === 'number') {
       const fruit = this.currentQuestion.metadata?.fruit || '🍎';
       let fruitString = '';
       for(let i=0; i<this.currentQuestion.correctAnswer; i++) fruitString += `${fruit} `;
       
       const boxW = 840, boxH = 140, boxX = centerX - 420, boxY = 260;
       const fBox = this.add.graphics().fillStyle(0xffffff, 0.9).fillRoundedRect(boxX, boxY, boxW, boxH, 40).lineStyle(8, 0x22c55e, 1).strokeRoundedRect(boxX, boxY, boxW, boxH, 40).setAlpha(0);
       this.tweens.add({ targets: fBox, alpha: 1, duration: 400 });
       this.questionContainer.add(fBox);

       const maskGfx = this.make.graphics({}).fillStyle(0xffffff).fillRoundedRect(boxX, boxY, boxW, boxH, 40);
       const fSize = this.currentQuestion.correctAnswer >= 7 ? '65px' : (this.currentQuestion.correctAnswer > 4 ? '85px' : '110px');
       const fText = this.add.text(centerX, 330, fruitString.trim(), { fontSize: fSize, wordWrap: { width: boxW - 80 }, align: 'center' }).setOrigin(0.5).setScale(0);
       fText.setMask(maskGfx.createGeometryMask());
       this.tweens.add({ targets: fText, scale: 1, duration: 600, ease: 'Back.easeOut' });
       this.questionContainer.add(fText);
    }

    this.renderOptions();
  }

  createEnhancedBackground(theme: ThemeId) {
    const width = this.cameras.main.width, height = this.cameras.main.height, centerX = width / 2;
    const bg = this.add.image(centerX, height / 2, 'main_bg').setDepth(-20);
    bg.setScale(Math.max(width / bg.width, height / bg.height));
    this.add.ellipse(centerX, height + 100, width * 2, 400, 0x86efac, 0.7).setDepth(-10);
    this.add.ellipse(centerX - 300, height + 50, width * 1.5, 350, 0x4ade80, 0.8).setDepth(-9);
    this.add.ellipse(centerX + 300, height + 80, width * 1.5, 400, 0x22c55e, 0.9).setDepth(-8);
  }

  renderOptions() {
    const centerX = this.cameras.main.centerX, centerY = this.cameras.main.centerY;
    const count = this.currentQuestion.options.length;
    const spacing = count === 2 ? 450 : 350;
    const startX = centerX - ((count - 1) * spacing / 2);
    
    this.currentQuestion.options.forEach((opt, index) => {
      const container = this.add.container(startX + (index * spacing), centerY + 100).setScale(0);
      const frame = this.add.rectangle(0, 0, 240, 240, 0xffffff, 1).setStrokeStyle(12, 0x0284c7);
      const bg = this.add.rectangle(0, 0, 240, 240, 0xffffff, 0.01).setInteractive({ useHandCursor: true });
      const halo = this.add.circle(0, 0, 140, 0xffffff, 0).setStrokeStyle(6, 0x0284c7, 0);
      container.add([frame, halo, bg]);

      if (this.currentQuestion.theme === 'size') {
        const concept = this.currentQuestion.metadata?.concept;
        const isPos = opt.id === 'opt1' || ['Besar','Panjang','Tinggi','Berat','Tebal','Banyak','Jauh','Penuh','Cepat','Luas'].includes(opt.label);
        const imgKey = isPos ? `${concept}_1` : `${concept}_2`;
        if (this.textures.exists(imgKey)) {
          const img = this.add.image(0, 0, imgKey);
          img.setScale(Math.min(220 / img.width, 220 / img.height));
          const maskGfx = this.make.graphics({ x: container.x, y: container.y }).fillStyle(0xffffff).fillRoundedRect(-110, -110, 220, 220, 30);
          img.setMask(maskGfx.createGeometryMask());
          container.add(img);
        }
      } else if (this.currentQuestion.theme === 'shape') {
         const imgKey = ['circle','triangle','square'].includes(opt) ? `${opt}_img_1` : null;
         if (imgKey) {
            const img = this.add.image(0, 0, imgKey);
            img.setScale(Math.min(220 / img.width, 220 / img.height));
            const maskGfx = this.make.graphics({ x: container.x, y: container.y }).fillStyle(0xffffff).fillRoundedRect(-110, -110, 220, 220, 30);
            img.setMask(maskGfx.createGeometryMask());
            container.add(img);
         } else {
            container.add(this.add.text(0, 0, opt === 'rectangle' ? '🚪' : '❓', { fontSize: '100px' }).setOrigin(0.5));
         }
      } else if (this.currentQuestion.theme === 'number') {
         container.add(this.add.text(0, 0, opt.toString(), { fontSize: '120px', color: '#16a34a', fontStyle: 'bold', fontFamily: 'Fredoka' }).setOrigin(0.5));
      } else if (this.currentQuestion.theme === 'time') {
         let rIdx = Math.floor(Math.random() * 6) + 1;
         if (opt === 'siang' && rIdx === 2) rIdx = 1;
         const imgKey = `${opt}_${rIdx}`;

         if (this.textures.exists(imgKey)) {
            const img = this.add.image(0, 0, imgKey);
            img.setScale(Math.min(220 / img.width, 220 / img.height));
            const maskGfx = this.make.graphics({ x: container.x, y: container.y }).fillStyle(0xffffff).fillRoundedRect(-110, -110, 220, 220, 30);
            img.setMask(maskGfx.createGeometryMask());
            container.add(img);
         } else {
            const emojiMap: any = { siang: '☀️', sore: '🌇', malam: '🌙' };
            container.add(this.add.text(0, 0, emojiMap[opt] || '⏰', { fontSize: '120px' }).setOrigin(0.5));
         }
      }

      this.tweens.add({ targets: container, scale: 1, delay: 200 + (index * 150), duration: 500, ease: 'Back.easeOut', onStart: () => playSound('pop') });
      bg.on('pointerdown', () => this.handleAnswer(opt, container));
      bg.on('pointerover', () => { playSound('hover'); this.tweens.add({ targets: container, scale: 1.15, duration: 200 }); this.tweens.add({ targets: halo, alpha: 0.3, scale: 1.1, duration: 200 }); });
      bg.on('pointerout', () => { this.tweens.add({ targets: container, scale: 1, duration: 200 }); this.tweens.add({ targets: halo, alpha: 0, scale: 1, duration: 200 }); });
      this.optionObjects.push(container);
      this.questionContainer.add(container);
    });
  }

  handleAnswer(selectedOpt: any, container: Phaser.GameObjects.Container) {
    this.optionObjects.forEach(obj => (obj.getAt(2) as Phaser.GameObjects.Rectangle).disableInteractive());
    const isCorrect = this.currentQuestion.theme === 'size' ? selectedOpt.id === this.currentQuestion.correctAnswer : selectedOpt === this.currentQuestion.correctAnswer;
    const overlay = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, this.cameras.main.width, this.cameras.main.height, isCorrect ? 0x22c55e : 0xef4444, 0).setDepth(100).setInteractive();
    this.tweens.add({ targets: overlay, fillAlpha: 0.3, duration: 200, yoyo: true, hold: 300, onComplete: () => overlay.destroy() });

    if (isCorrect) {
       playSound('correct');
       addTokens(1);
       this.correctAnswers++;
       for (let i = 0; i < 20; i++) {
         const p = this.add.text(container.x, container.y, '⭐', { fontSize: '30px' }).setDepth(150);
         this.tweens.add({ targets: p, x: p.x + (Math.random()*400-200), y: p.y + (Math.random()*400-200), alpha: 0, scale: 2, duration: 800, onComplete: () => p.destroy() });
       }
       this.showSuccessPopup();
    } else {
       playSound('wrong');
       this.tweens.add({ targets: container, x: '+=15', duration: 50, yoyo: true, repeat: 3, onComplete: () => {
          this.time.delayedCall(500, () => this.optionObjects.forEach(obj => (obj.getAt(2) as Phaser.GameObjects.Rectangle).setInteractive({ useHandCursor: true })));
       }});
    }
  }

  showSuccessPopup() {
    const centerX = this.cameras.main.centerX, centerY = this.cameras.main.centerY;
    const bgOverlay = this.add.rectangle(centerX, centerY, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.2).setDepth(100).setInteractive();
    const popup = this.add.container(centerX, centerY).setDepth(101).setScale(0);
    const box = this.add.graphics();
    const colors = [0xef4444, 0xf59e0b, 0x10b981, 0x3b82f6, 0x8b5cf6];
    for(let i=0; i<colors.length; i++) { box.lineStyle(10 - i*2, colors[i], 1).strokeRoundedRect(-260 - i*2, -190 - i*2, 520 + i*4, 380 + i*4, 50); }
    box.fillStyle(0xffffff, 1).fillRoundedRect(-250, -180, 500, 360, 40);
    popup.add(box);
    popup.add(this.add.text(0, -90, "HOREE! ⭐", { fontFamily: 'Fredoka', fontSize: '90px', color: '#f59e0b', fontStyle: 'bold' }).setOrigin(0.5));
    popup.add(this.add.text(0, 20, "Jawabanmu Benar!", { fontFamily: 'Fredoka', fontSize: '42px', color: '#475569', fontStyle: 'bold' }).setOrigin(0.5));
    
    const nextBtn = this.add.container(0, 110);
    const btnBg = this.add.rectangle(0, 0, 300, 90, 0x22c55e, 1).setInteractive({ useHandCursor: true }).setStrokeStyle(6, 0xffffff);
    nextBtn.add([btnBg, this.add.text(0, 0, "LANJUT", { fontSize: '40px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'Fredoka' }).setOrigin(0.5)]);
    popup.add(nextBtn);
    this.tweens.add({ targets: popup, scale: 1, duration: 600, ease: 'Back.easeOut' });
    btnBg.on('pointerdown', () => {
      btnBg.disableInteractive();
      this.questionIndex++;
      this.startNewQuestion();
      popup.destroy();
      bgOverlay.destroy();
    });
  }

  showLevelComplete() {
    const centerX = this.cameras.main.centerX, centerY = this.cameras.main.centerY;
    const isPassed = this.correctAnswers >= 7;
    const bgOverlay = this.add.rectangle(centerX, centerY, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.6).setDepth(200).setInteractive();
    const winBox = this.add.container(centerX, centerY).setScale(0).setDepth(201);
    winBox.add(this.add.rectangle(0, 0, 600, 450, 0xffffff, 0.95).setStrokeStyle(10, isPassed ? 0x22c55e : 0xef4444));
    winBox.add(this.add.text(0, -120, isPassed ? "LUAR BIASA! 🏆" : "AYO COBA LAGI! 💪", { fontSize: '64px', color: isPassed ? '#22c55e' : '#ef4444', fontStyle: 'bold', fontFamily: 'Fredoka' }).setOrigin(0.5));
    winBox.add(this.add.text(0, 20, isPassed ? `Skor kamu: ${this.correctAnswers}/${this.totalQuestions}\nKamu hebat sekali!` : `Skor kamu: ${this.correctAnswers}/${this.totalQuestions}\nBelajar lagi yuk!`, { fontSize: '32px', color: '#475569', align: 'center', fontFamily: 'Nunito' }).setOrigin(0.5));
    const btn = this.add.rectangle(0, 150, 350, 80, isPassed ? 0x0284c7 : 0xf59e0b).setInteractive({ useHandCursor: true });
    winBox.add(btn);
    winBox.add(this.add.text(0, 150, isPassed ? "SELESAI" : "ULANGI", { fontSize: '32px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5));
    this.tweens.add({ targets: winBox, scale: 1, duration: 600, ease: 'Back.easeOut' });
    btn.on('pointerdown', () => { 
       btn.disableInteractive();
       if (isPassed) window.location.href = '/themes';
       else {
         this.questionIndex = 0;
         this.correctAnswers = 0;
         this.startNewQuestion();
         winBox.destroy();
         bgOverlay.destroy();
       }
    });
  }
}

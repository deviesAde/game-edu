"use client";

import Phaser from 'phaser';
import { generateQuestion, generateQuestionList, ThemeId, LevelId, Question } from '../../lib/questionGenerator';
import { addTokens } from '../../lib/storage';
import { playSound } from '../../lib/sound';

export default class MainScene extends Phaser.Scene {
  private currentQuestion!: Question;
  private questionIndex: number = 0;
  private correctAnswers: number = 0;
  private totalQuestions: number = 10;
  private questionContainer!: Phaser.GameObjects.Container;
  private optionObjects: Phaser.GameObjects.Container[] = [];
  private questionsList: Question[] = [];

  constructor() {
    super('MainScene');
  }

  preload() {
    // Assets are now preloaded in BootScene
  }

  create() {
    const theme = this.registry.get('theme') as ThemeId || 'size';
    const level = this.registry.get('level') as LevelId || 2;
    this.questionsList = generateQuestionList(theme, level, this.totalQuestions);

    this.createEnhancedBackground(theme);
    this.questionContainer = this.add.container(0, 0);
    this.startNewQuestion();

    // --- BACK BUTTON ---
    const height = this.cameras.main.height;
    const backBtn = this.add.container(120, height - 80);
    const backGfx = this.add.graphics();
    backGfx.fillStyle(0xc2410c, 1).fillRoundedRect(-80, -35 + 6, 160, 70, 20); // Shadow
    backGfx.fillStyle(0xf59e0b, 1).fillRoundedRect(-80, -35, 160, 70, 20); // Base
    backGfx.lineStyle(5, 0xffffff, 1).strokeRoundedRect(-80, -35, 160, 70, 20); // Outline
    
    const backBg = this.add.rectangle(0, 0, 160, 70, 0xffffff, 0).setInteractive({ useHandCursor: true });
    const backText = this.add.text(0, 0, "KEMBALI", { 
      fontSize: '24px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'Fredoka' 
    }).setOrigin(0.5);
    
    backBtn.add([backGfx, backBg, backText]);
    
    backBg.on('pointerdown', () => {
       playSound('pop');
       this.tweens.add({ targets: backBtn, scale: 0.9, duration: 100, yoyo: true, onComplete: () => {
         window.location.href = '/themes';
       }});
    });
    
    backBg.on('pointerover', () => {
       playSound('hover');
       this.tweens.add({ targets: backBtn, scale: 1.1, duration: 150 });
    });
    
    backBg.on('pointerout', () => {
       this.tweens.add({ targets: backBtn, scale: 1, duration: 150 });
    });
  }

  startNewQuestion() {
    const theme = this.registry.get('theme') as ThemeId || 'size';
    const level = this.registry.get('level') as LevelId || 2;
    const centerX = this.cameras.main.width / 2;

    this.questionContainer.removeAll(true);
    this.optionObjects = [];

    const nextQ = this.questionsList[this.questionIndex];
    
    if (!nextQ || this.questionIndex >= this.totalQuestions) {
       this.showLevelComplete();
       return;
    }
    
    this.currentQuestion = nextQ;

    const isNumber = this.currentQuestion.theme === 'number';
    const boardY = isNumber ? 180 : 220; // Lowered slightly so it's not hidden by navbar

    // --- QUESTION BOARD ---
    const boardContainer = this.add.container(centerX, boardY).setScale(0);
    const boardGraphics = this.add.graphics();
    // Thinner board (width 720, height 100) to save space
    boardGraphics.fillStyle(0x0ea5e9, 0.95).fillRoundedRect(-360, -50, 720, 100, 24);
    boardGraphics.lineStyle(6, 0xffffff, 1).strokeRoundedRect(-360, -50, 720, 100, 24);
    boardContainer.add(boardGraphics);
    
    const qText = this.add.text(0, 0, this.currentQuestion.questionText, {
      fontFamily: 'Fredoka', fontSize: '38px', color: '#ffffff', align: 'center', wordWrap: { width: 680 }, fontStyle: 'bold'
    }).setOrigin(0.5);
    boardContainer.add(qText);
    this.tweens.add({ targets: boardContainer, scale: 1, duration: 600, ease: 'Back.easeOut' });
    this.questionContainer.add(boardContainer);

    if (this.currentQuestion.theme === 'number') {
       const fruit = this.currentQuestion.metadata?.fruit || '🍎';
       let fruitString = '';
       for(let i=0; i<this.currentQuestion.correctAnswer; i++) fruitString += `${fruit} `;
       
       // Thinner fruit box placed right under the question board
       const boxW = 800, boxH = 120, boxX = centerX - 400, boxY = boardY + 60; 
       const fBox = this.add.graphics().fillStyle(0xffffff, 0.9).fillRoundedRect(boxX, boxY, boxW, boxH, 30).lineStyle(6, 0x22c55e, 1).strokeRoundedRect(boxX, boxY, boxW, boxH, 30).setAlpha(0);
       this.tweens.add({ targets: fBox, alpha: 1, duration: 400 });
       this.questionContainer.add(fBox);

       const maskGfx = this.make.graphics({}).fillStyle(0xffffff).fillRoundedRect(boxX, boxY, boxW, boxH, 30);
       // Reduced font size slightly so the fruits are not too big
       const fSize = this.currentQuestion.correctAnswer >= 7 ? '45px' : (this.currentQuestion.correctAnswer > 4 ? '60px' : '75px');
       const fText = this.add.text(centerX, boxY + boxH / 2, fruitString.trim(), { 
         fontSize: fSize, 
         wordWrap: { width: boxW - 60 }, 
         align: 'center',
         padding: { top: 20, bottom: 20, left: 20, right: 20 }
       }).setOrigin(0.5).setScale(0);
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
    this.spawnFlowers();
  }

  spawnFlowers() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌸', '🌺', '🌼'];
    const count = 14;

    for (let i = 0; i < count; i++) {
      const emoji = flowers[i % flowers.length];
      const x = Phaser.Math.Between(30, width - 30);
      const y = Phaser.Math.Between(60, height - 60);
      const size = Phaser.Math.Between(22, 38);
      const delay = Phaser.Math.Between(0, 3000);
      const duration = Phaser.Math.Between(2500, 4500);

      const flower = this.add.text(x, y, emoji, {
        fontSize: `${size}px`,
        padding: { top: 8, bottom: 8, left: 8, right: 8 }
      }).setOrigin(0.5).setDepth(-5).setAlpha(0.75);

      // Gentle float up-down
      this.tweens.add({
        targets: flower,
        y: y - Phaser.Math.Between(18, 35),
        duration,
        delay,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });

      // Gentle rotation sway
      this.tweens.add({
        targets: flower,
        angle: Phaser.Math.Between(-18, 18),
        duration: duration * 1.3,
        delay: delay + 200,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });

      // Subtle scale pulse
      this.tweens.add({
        targets: flower,
        scale: 1.25,
        duration: duration * 0.9,
        delay: delay + 100,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });
    }
  }

  renderOptions() {
    const centerX = this.cameras.main.centerX, centerY = this.cameras.main.centerY;
    const count = this.currentQuestion.options.length;
    const spacing = count === 2 ? 450 : 350;
    const startX = centerX - ((count - 1) * spacing / 2);
    
    // Playful kid-friendly candy color schemes matching the main UI!
    const cardColors = [
      { fill: 0x0ea5e9, stroke: 0xffffff, shadow: 0x0284c7 }, // Sky blue
      { fill: 0xf43f5e, stroke: 0xffffff, shadow: 0xbe123c }, // Rose pink
      { fill: 0xf97316, stroke: 0xffffff, shadow: 0xc2410c }, // Orange
      { fill: 0xa855f7, stroke: 0xffffff, shadow: 0x7e22ce }  // Purple
    ];
    
    this.currentQuestion.options.forEach((opt, index) => {
      const colorScheme = cardColors[index % cardColors.length];
      const container = this.add.container(startX + (index * spacing), centerY + 100).setScale(0);
      
      // 3D shadowed card drawn via Graphics
      const cardGraphics = this.add.graphics();
      
      // 1. Draw Y-shifted bottom 3D shadow (16px offset, rounded corners)
      cardGraphics.fillStyle(colorScheme.shadow, 1);
      cardGraphics.fillRoundedRect(-120, -120 + 16, 240, 240, 40);
      
      // 2. Draw front candy-colored card fill
      cardGraphics.fillStyle(colorScheme.fill, 1);
      cardGraphics.fillRoundedRect(-120, -120, 240, 240, 40);
      
      // 3. Draw thick white outline border
      cardGraphics.lineStyle(10, colorScheme.stroke, 1);
      cardGraphics.strokeRoundedRect(-120, -120, 240, 240, 40);
      
      // 4. Glow halo on hover (slightly larger rounded rectangle)
      const halo = this.add.graphics();
      halo.lineStyle(8, colorScheme.fill, 0.5);
      halo.strokeRoundedRect(-135, -135, 270, 270, 46);
      halo.setAlpha(0);
      
      // 5. Interactive hit area overlay (with Y offset matching card base)
      const bg = this.add.rectangle(0, 7, 240, 240, 0xffffff, 0.01).setInteractive({ useHandCursor: true });
      
      container.add([cardGraphics, halo, bg]);

      if (this.currentQuestion.theme === 'size') {
        const innerPlate = this.add.graphics();
        innerPlate.fillStyle(0xffffff, 0.95).fillRoundedRect(-95, -95, 190, 190, 25);
        container.add(innerPlate);

        const concept = this.currentQuestion.metadata?.concept;
        const isPos = opt.id === 'opt1' || ['Besar','Panjang','Tinggi','Berat','Tebal','Banyak','Jauh','Penuh','Cepat','Luas'].includes(opt.label);
        const imgKey = isPos ? `${concept}_1` : `${concept}_2`;
        if (this.textures.exists(imgKey)) {
          const img = this.add.image(0, 0, imgKey);
          img.setScale(Math.min(170 / img.width, 170 / img.height));
          const maskGfx = this.make.graphics({ x: container.x, y: container.y }).fillStyle(0xffffff).fillRoundedRect(-85, -85, 170, 170, 20);
          img.setMask(maskGfx.createGeometryMask());
          container.add(img);
        }
      } else if (this.currentQuestion.theme === 'shape') {
         const innerPlate = this.add.graphics();
         innerPlate.fillStyle(0xffffff, 0.95).fillRoundedRect(-95, -95, 190, 190, 25);
         container.add(innerPlate);

         const imgKey = ['circle','triangle','square','rectangle'].includes(opt) ? (
           opt === 'rectangle'
             ? `rectangle_img_${Phaser.Math.Between(1, 3)}`
             : `${opt}_img_1`
         ) : null;
         if (imgKey && this.textures.exists(imgKey)) {
            const img = this.add.image(0, 0, imgKey);
            img.setScale(Math.min(170 / img.width, 170 / img.height));
            const maskGfx = this.make.graphics({ x: container.x, y: container.y }).fillStyle(0xffffff).fillRoundedRect(-85, -85, 170, 170, 20);
            img.setMask(maskGfx.createGeometryMask());
            container.add(img);
         } else {
            container.add(this.add.text(0, 0, '❓', { fontSize: '100px' }).setOrigin(0.5));
         }
      } else if (this.currentQuestion.theme === 'number') {
         // High-contrast large white numbers on candy colored solid blocks!
         container.add(this.add.text(0, 0, opt.toString(), { fontSize: '120px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'Fredoka' }).setOrigin(0.5));
      } else if (this.currentQuestion.theme === 'time') {
         const innerPlate = this.add.graphics();
         innerPlate.fillStyle(0xffffff, 0.95).fillRoundedRect(-95, -95, 190, 190, 25);
         container.add(innerPlate);

         let rIdx = Math.floor(Math.random() * 3) + 1;
         const imgKey = `${opt}_${rIdx}`;

         if (this.textures.exists(imgKey)) {
            const img = this.add.image(0, 0, imgKey);
            img.setScale(Math.min(170 / img.width, 170 / img.height));
            const maskGfx = this.make.graphics({ x: container.x, y: container.y }).fillStyle(0xffffff).fillRoundedRect(-85, -85, 170, 170, 20);
            img.setMask(maskGfx.createGeometryMask());
            container.add(img);
         } else {
            const emojiMap: any = { siang: '☀️', pagi: '🌅', malam: '🌙' };
            container.add(this.add.text(0, 0, emojiMap[opt] || '⏰', { fontSize: '110px' }).setOrigin(0.5));
         }
      }

      this.tweens.add({ targets: container, scale: 1, delay: 200 + (index * 150), duration: 500, ease: 'Back.easeOut', onStart: () => playSound('pop') });
      bg.on('pointerdown', () => {
        // Fast tactile scale click response!
        this.tweens.add({ targets: container, scale: 0.92, duration: 80, yoyo: true, onComplete: () => {
          this.handleAnswer(opt, container);
        }});
      });
      bg.on('pointerover', () => { 
        playSound('hover'); 
        this.tweens.add({ targets: container, scale: 1.12, duration: 200, ease: 'Back.easeOut' }); 
        this.tweens.add({ targets: halo, alpha: 1, duration: 200 }); 
      });
      bg.on('pointerout', () => { 
        this.tweens.add({ targets: container, scale: 1, duration: 200, ease: 'Sine.easeOut' }); 
        this.tweens.add({ targets: halo, alpha: 0, duration: 200 }); 
      });
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
    
    // Confetti/Star Explosion
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 100 + Math.random() * 200;
      const starChar = ['⭐', '✨', '🎉', '🎈'][Math.floor(Math.random() * 4)];
      const size = 20 + Math.random() * 25;
      const p = this.add.text(centerX, centerY - 50, starChar, { fontSize: `${size}px` }).setOrigin(0.5).setDepth(150);
      
      this.tweens.add({
        targets: p,
        x: centerX + Math.cos(angle) * speed * 1.5,
        y: centerY - 50 + Math.sin(angle) * speed * 1.5,
        alpha: 0,
        scale: 2.2,
        angle: Math.random() * 360,
        duration: 800 + Math.random() * 400,
        ease: 'Cubic.easeOut',
        onComplete: () => p.destroy()
      });
    }

    const bgOverlay = this.add.rectangle(centerX, centerY, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.4).setDepth(100).setInteractive();
    const popup = this.add.container(centerX, centerY).setDepth(101).setScale(0);
    const box = this.add.graphics();
    
    // Draw beautiful border shadow and outline
    const colors = [0xffffff, 0xf59e0b, 0xffffff];
    for (let i = 0; i < colors.length; i++) { 
      box.lineStyle(8 - i * 2, colors[i], 0.8).strokeRoundedRect(-255 - i * 3, -205 - i * 3, 510 + i * 6, 410 + i * 6, 50); 
    }
    // Slightly larger popup card for larger fonts
    box.fillStyle(0x0ea5e9, 1).fillRoundedRect(-270, -220, 540, 440, 45);
    popup.add(box);
    
    const titleText = this.add.text(0, -140, "HOREE! ⭐", { 
      fontFamily: 'Fredoka', 
      fontSize: '64px', 
      color: '#ffffff', 
      fontStyle: 'bold' 
    }).setOrigin(0.5);
    popup.add(titleText);
    
    this.tweens.add({
      targets: titleText,
      scale: 1.08,
      angle: 2,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const glowStar = this.add.text(0, -35, "🏆", { fontSize: '120px', padding: { top: 20, bottom: 20, left: 20, right: 20 } }).setOrigin(0.5);
    popup.add(glowStar);
    this.tweens.add({
      targets: glowStar,
      scale: 1.15,
      angle: 15,
      yoyo: true,
      repeat: -1,
      duration: 800,
      ease: 'Sine.easeInOut'
    });

    popup.add(this.add.text(0, 65, "Jawabanmu Benar!", { 
      fontFamily: 'Fredoka', 
      fontSize: '32px', 
      color: '#ffffff', 
      fontStyle: 'bold' 
    }).setOrigin(0.5));
    
    const nextBtn = this.add.container(0, 145);
    const btnGfx = this.add.graphics();
    // 3D Shadow
    btnGfx.fillStyle(0x15803d, 1).fillRoundedRect(-180, -45 + 8, 360, 90, 45); 
    // Base
    btnGfx.fillStyle(0x22c55e, 1).fillRoundedRect(-180, -45, 360, 90, 45); 
    // Outline
    btnGfx.lineStyle(6, 0xffffff, 1).strokeRoundedRect(-180, -45, 360, 90, 45);
    
    // Glossy Highlight
    const highlight = this.add.graphics();
    highlight.fillStyle(0xffffff, 0.3).fillRoundedRect(-150, -35, 300, 20, 10);
    
    const btnHoverLayer = this.add.graphics();
    btnHoverLayer.fillStyle(0xffffff, 0.2).fillRoundedRect(-180, -45, 360, 90, 45);
    btnHoverLayer.setAlpha(0);

    const btnBg = this.add.rectangle(0, 0, 360, 90, 0xffffff, 0).setInteractive({ useHandCursor: true });
    
    const btnText = this.add.text(0, 0, "HEBAT! LANJUT", { 
      fontSize: '32px', 
      color: '#ffffff', 
      fontStyle: 'bold', 
      fontFamily: '"Fredoka One", "Comic Sans MS", sans-serif',
      stroke: '#15803d',
      strokeThickness: 5,
      shadow: { offsetX: 2, offsetY: 2, color: '#15803d', blur: 0, stroke: true, fill: true }
    }).setOrigin(0.5);
    
    nextBtn.add([btnGfx, highlight, btnHoverLayer, btnBg, btnText]);
    popup.add(nextBtn);
    
    this.tweens.add({ targets: popup, scale: 1, duration: 600, ease: 'Back.easeOut' });

    // Subtle breathing pulse
    this.tweens.add({
      targets: nextBtn,
      scale: 1.03,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    btnBg.on('pointerover', () => {
      playSound('hover');
      this.tweens.add({ targets: btnHoverLayer, alpha: 1, duration: 150 });
      this.tweens.add({ targets: nextBtn, scale: 1.1, duration: 150 });
    });
    
    btnBg.on('pointerout', () => {
      this.tweens.add({ targets: btnHoverLayer, alpha: 0, duration: 150 });
      this.tweens.add({ targets: nextBtn, scale: 1.03, duration: 150 });
    });

    btnBg.on('pointerdown', () => {
      playSound('pop');
      btnBg.disableInteractive();
      this.tweens.killTweensOf(nextBtn);
      this.tweens.add({
        targets: nextBtn,
        scale: 0.9,
        y: 152, // slight press down effect
        duration: 100,
        yoyo: true,
        onComplete: () => {
          this.questionIndex++;
          this.startNewQuestion();
          popup.destroy();
          bgOverlay.destroy();
        }
      });
    });
  }

  showLevelComplete() {
    playSound('success');
    const centerX = this.cameras.main.centerX, centerY = this.cameras.main.centerY;
    const isPassed = this.correctAnswers >= 7;

    // Celebratory burst for level completion if passed
    if (isPassed) {
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 150 + Math.random() * 300;
        const char = ['👑', '⭐', '✨', '🎉', '🏆'][Math.floor(Math.random() * 5)];
        const size = 24 + Math.random() * 24;
        const p = this.add.text(centerX, centerY - 80, char, { fontSize: `${size}px` }).setOrigin(0.5).setDepth(250);
        this.tweens.add({
          targets: p,
          x: centerX + Math.cos(angle) * speed * 1.5,
          y: centerY - 80 + Math.sin(angle) * speed * 1.5,
          alpha: 0,
          scale: 2.5,
          angle: Math.random() * 360,
          duration: 1200 + Math.random() * 600,
          ease: 'Cubic.easeOut',
          onComplete: () => p.destroy()
        });
      }
    }

    const bgOverlay = this.add.rectangle(centerX, centerY, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.5).setDepth(200).setInteractive();
    const winBox = this.add.container(centerX, centerY).setScale(0).setDepth(201);
    
    const boxGfx = this.add.graphics();
    const borderColors = isPassed ? [0xffffff, 0x22c55e, 0xffffff] : [0xffffff, 0xef4444, 0xffffff];
    for (let i = 0; i < borderColors.length - 1; i++) {
      boxGfx.lineStyle(10 - i * 4, borderColors[i], 0.8).strokeRoundedRect(-335 - i * 3, -275 - i * 3, 670 + i * 6, 550 + i * 6, 55);
    }
    boxGfx.fillStyle(isPassed ? 0x22c55e : 0xef4444, 1).fillRoundedRect(-330, -270, 660, 540, 50);
    winBox.add(boxGfx);

    const titleText = this.add.text(0, -185, isPassed ? "LUAR BIASA! 🏆" : "AYO COBA LAGI! 💪", { 
      fontSize: '72px', 
      color: '#ffffff', 
      fontStyle: 'bold', 
      fontFamily: 'Fredoka' 
    }).setOrigin(0.5);
    winBox.add(titleText);

    this.tweens.add({
      targets: titleText,
      y: -195,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const scoreDisplayBox = this.add.graphics();
    scoreDisplayBox.fillStyle(0xffffff, 0.25).fillRoundedRect(-270, -100, 540, 185, 30);
    scoreDisplayBox.lineStyle(4, 0xffffff, 0.6).strokeRoundedRect(-270, -100, 540, 185, 30);
    winBox.add(scoreDisplayBox);

    const scoreText = this.add.text(0, -55, `Skor kamu: ${this.correctAnswers}/${this.totalQuestions}`, { 
      fontSize: '54px', 
      color: '#ffffff', 
      fontStyle: 'bold', 
      fontFamily: 'Fredoka' 
    }).setOrigin(0.5);
    winBox.add(scoreText);

    const descText = this.add.text(0, 25, isPassed ? "Kamu hebat sekali!" : "Belajar lagi yuk!", { 
      fontSize: '38px', 
      color: '#ffffff', 
      fontStyle: 'bold',
      fontFamily: 'Fredoka' 
    }).setOrigin(0.5);
    winBox.add(descText);

    const completeBtn = this.add.container(0, 175);
    const btnGfx = this.add.graphics();
    const baseColor = isPassed ? 0x0284c7 : 0xf59e0b;
    const shadowColor = isPassed ? 0x0369a1 : 0xd97706;
    
    // 3D Shadow
    btnGfx.fillStyle(shadowColor, 1).fillRoundedRect(-190, -45 + 8, 380, 90, 45); 
    // Base
    btnGfx.fillStyle(baseColor, 1).fillRoundedRect(-190, -45, 380, 90, 45); 
    // Outline
    btnGfx.lineStyle(6, 0xffffff, 1).strokeRoundedRect(-190, -45, 380, 90, 45);
    
    // Glossy Highlight
    const highlight = this.add.graphics();
    highlight.fillStyle(0xffffff, 0.3).fillRoundedRect(-160, -35, 320, 20, 10);
    
    const btnHoverLayer = this.add.graphics();
    btnHoverLayer.fillStyle(0xffffff, 0.2).fillRoundedRect(-190, -45, 380, 90, 45);
    btnHoverLayer.setAlpha(0);

    const btnBg = this.add.rectangle(0, 0, 380, 90, 0xffffff, 0).setInteractive({ useHandCursor: true });
    
    const btnText = this.add.text(0, 0, isPassed ? "SELESAI" : "ULANGI", { 
      fontSize: '32px', 
      color: '#ffffff', 
      fontStyle: 'bold',
      fontFamily: '"Fredoka One", "Comic Sans MS", sans-serif',
      stroke: isPassed ? '#0369a1' : '#d97706',
      strokeThickness: 5,
      shadow: { offsetX: 2, offsetY: 2, color: isPassed ? '#0369a1' : '#d97706', blur: 0, stroke: true, fill: true }
    }).setOrigin(0.5);
    
    completeBtn.add([btnGfx, highlight, btnHoverLayer, btnBg, btnText]);
    winBox.add(completeBtn);

    this.tweens.add({
      targets: completeBtn,
      scale: 1.03,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.tweens.add({ targets: winBox, scale: 1, duration: 600, ease: 'Back.easeOut' });

    btnBg.on('pointerover', () => {
      playSound('hover');
      this.tweens.add({ targets: btnHoverLayer, alpha: 1, duration: 150 });
      this.tweens.add({ targets: completeBtn, scale: 1.1, duration: 150 });
    });
    
    btnBg.on('pointerout', () => {
      this.tweens.add({ targets: btnHoverLayer, alpha: 0, duration: 150 });
      this.tweens.add({ targets: completeBtn, scale: 1.03, duration: 150 });
    });

    btnBg.on('pointerdown', () => { 
      playSound('pop');
      btnBg.disableInteractive();
      this.tweens.killTweensOf(completeBtn);
      this.tweens.add({
        targets: completeBtn,
        scale: 0.9,
        y: 182, // slight press down effect
        duration: 100,
        yoyo: true,
        onComplete: () => {
          if (isPassed) {
            window.location.href = '/themes';
          } else {
            this.questionIndex = 0;
            this.correctAnswers = 0;
            const theme = this.registry.get('theme') as ThemeId || 'size';
            const level = this.registry.get('level') as LevelId || 2;
            this.questionsList = generateQuestionList(theme, level, this.totalQuestions);
            this.startNewQuestion();
            winBox.destroy();
            bgOverlay.destroy();
          }
        }
      });
    });
  }
}
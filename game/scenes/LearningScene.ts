"use client";

import Phaser from 'phaser';
import { ThemeId } from '../../lib/questionGenerator';
import { LEARNING_DATA } from '../learningData';
import { playSound } from '../../lib/sound';

export default class LearningScene extends Phaser.Scene {
  private currentIndex: number = 0;
  private contentContainer!: Phaser.GameObjects.Container;
  private nextBtn!: Phaser.GameObjects.Container;
  private backBtn!: Phaser.GameObjects.Container;
  private startBtn!: Phaser.GameObjects.Container;
  private progressText!: Phaser.GameObjects.Text;

  constructor() {
    super('LearningScene');
  }

  preload() {
    // Assets are now preloaded in BootScene
  }

  create() {
    const theme = this.registry.get('theme') as ThemeId || 'size';
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const data = LEARNING_DATA[theme];
    this.currentIndex = 0;

    // --- BACKGROUND ---
    const bg = this.add.image(centerX, centerY, 'main_bg').setDepth(-20);
    const scale = Math.max(width / bg.width, height / bg.height);
    bg.setScale(scale);
    this.add.rectangle(centerX, centerY, width, height, 0xffffff, 0.4).setDepth(-19);
    this.spawnFlowers();

    // --- TITLE BOARD ---
    const boardContainer = this.add.container(centerX, 150);
    const boardGraphics = this.add.graphics();
    boardGraphics.fillStyle(0x0284c7, 0.9);
    boardGraphics.fillRoundedRect(-400, -40, 800, 80, 20);
    boardGraphics.lineStyle(4, 0xbae6fd, 1);
    boardGraphics.strokeRoundedRect(-400, -40, 800, 80, 20);
    boardContainer.add(boardGraphics);

    const titleText = this.add.text(0, 0, data.title, {
      fontFamily: 'Fredoka', fontSize: '32px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);
    boardContainer.add(titleText);

    // --- CONTENT AREA ---
    this.contentContainer = this.add.container(centerX, centerY + 10);

    // --- NAVIGATION BUTTONS ---
    this.createNavButtons(width, height);

    // --- INITIAL RENDER ---
    this.showItem(theme);
  }

  createNavButtons(width: number, height: number) {
    const centerY = height / 2;
    
    // BACK BUTTON
    this.backBtn = this.add.container(140, centerY).setAlpha(0);
    const backGfx = this.add.graphics();
    backGfx.fillStyle(0x0284c7, 1).fillRoundedRect(-80, -40 + 8, 160, 80, 20); // Shadow
    backGfx.fillStyle(0x0ea5e9, 1).fillRoundedRect(-80, -40, 160, 80, 20); // Base
    backGfx.lineStyle(6, 0xffffff, 1).strokeRoundedRect(-80, -40, 160, 80, 20); // Outline
    const backBg = this.add.rectangle(0, 4, 160, 80, 0xffffff, 0.01).setInteractive({ useHandCursor: true });
    const backText = this.add.text(0, 0, 'KEMBALI', { fontSize: '24px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'Fredoka' }).setOrigin(0.5);
    this.backBtn.add([backGfx, backBg, backText]);
    
    backBg.on('pointerdown', () => {
      if (this.currentIndex > 0) {
        playSound('pop');
        this.currentIndex--;
        this.showItem(this.registry.get('theme'));
      }
    });

    // NEXT BUTTON
    this.nextBtn = this.add.container(width - 140, centerY);
    const nextGfx = this.add.graphics();
    nextGfx.fillStyle(0xc2410c, 1).fillRoundedRect(-80, -40 + 8, 160, 80, 20); // Shadow
    nextGfx.fillStyle(0xf59e0b, 1).fillRoundedRect(-80, -40, 160, 80, 20); // Base
    nextGfx.lineStyle(6, 0xffffff, 1).strokeRoundedRect(-80, -40, 160, 80, 20); // Outline
    const nextBg = this.add.rectangle(0, 4, 160, 80, 0xffffff, 0.01).setInteractive({ useHandCursor: true });
    const nextText = this.add.text(0, 0, 'LANJUT', { fontSize: '24px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'Fredoka' }).setOrigin(0.5);
    this.nextBtn.add([nextGfx, nextBg, nextText]);
    
    nextBg.on('pointerdown', () => {
      const theme = this.registry.get('theme') as ThemeId;
      const data = LEARNING_DATA[theme];
      if (this.currentIndex < data.items.length - 1) {
        playSound('pop');
        this.currentIndex++;
        this.showItem(theme);
      }
    });

    // Hover effects for nav buttons
    [backBg, nextBg].forEach(bg => {
       bg.on('pointerover', () => {
         this.tweens.add({ targets: bg.parentContainer, scale: 1.1, duration: 200 });
       });
       bg.on('pointerout', () => {
         this.tweens.add({ targets: bg.parentContainer, scale: 1, duration: 200 });
       });
    });

    // START PRACTICE BUTTON (Centered at bottom)
    this.startBtn = this.add.container(width / 2, centerY + 390).setAlpha(0).setScale(0);
    const startGfx = this.add.graphics();
    startGfx.fillStyle(0x15803d, 1).fillRoundedRect(-175, -40 + 8, 350, 80, 24); // Shadow
    startGfx.fillStyle(0x22c55e, 1).fillRoundedRect(-175, -40, 350, 80, 24); // Base
    startGfx.lineStyle(6, 0xffffff, 1).strokeRoundedRect(-175, -40, 350, 80, 24); // Outline
    const startBg = this.add.rectangle(0, 4, 350, 80, 0xffffff, 0.01).setInteractive({ useHandCursor: true });
    const startText = this.add.text(0, 0, "MULAI LATIHAN", { fontSize: '32px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'Fredoka' }).setOrigin(0.5);
    this.startBtn.add([startGfx, startBg, startText]);

    startBg.on('pointerdown', () => {
       playSound('pop');
       this.registry.set('level', 2);
       this.scene.start('MainScene');
    });

    // Progress text
    // Progress text - Changed from blue to slate
    this.progressText = this.add.text(width / 2, centerY + 320, "", { fontSize: '24px', color: '#475569', fontStyle: 'bold', fontFamily: 'Fredoka' }).setOrigin(0.5);

    // Hover effects
    [backBg, nextBg, startBg].forEach(btn => {
      btn.on('pointerover', () => this.tweens.add({ targets: btn.parentContainer, scale: 1.1, duration: 200 }));
      btn.on('pointerout', () => this.tweens.add({ targets: btn.parentContainer, scale: 1, duration: 200 }));
    });
  }

  showItem(theme: ThemeId) {
    const data = LEARNING_DATA[theme];
    const item = data.items[this.currentIndex];
    const total = data.items.length;

    // Clear current content
    this.contentContainer.removeAll(true);
    this.contentContainer.setScale(0).setAlpha(0);

    // Update Progress
    this.progressText.setText(`${this.currentIndex + 1} / ${total}`);

    // Update Nav Buttons visibility
    this.backBtn.setAlpha(this.currentIndex > 0 ? 1 : 0);
    this.backBtn.getAt(0).setInteractive(); // Reset interactive in case it was disabled
    if (this.currentIndex === 0) (this.backBtn.getAt(0) as any).disableInteractive();

    this.nextBtn.setAlpha(this.currentIndex < total - 1 ? 1 : 0);
    this.nextBtn.getAt(0).setInteractive();
    if (this.currentIndex === total - 1) (this.nextBtn.getAt(0) as any).disableInteractive();

    // Show Start Button on last item
    if (this.currentIndex === total - 1) {
       this.tweens.add({ targets: this.startBtn, alpha: 1, scale: 1, duration: 500, ease: 'Back.easeOut' });
    } else {
       this.startBtn.setAlpha(0).setScale(0);
    }

    // Render based on theme (Simplified for single card)
    const card = this.add.container(0, 0);
    const cardGfx = this.add.graphics();
    // Larger Card (width 960, height 560)
    cardGfx.fillStyle(0x0284c7, 0.4).fillRoundedRect(-480, -280 + 12, 960, 560, 35);
    // Base Card
    cardGfx.fillStyle(0xffffff, 0.96).fillRoundedRect(-480, -280, 960, 560, 35);
    // Stroke outline
    cardGfx.lineStyle(10, 0x0ea5e9, 1).strokeRoundedRect(-480, -280, 960, 560, 35);
    card.add(cardGfx);

    // Remove or hide the blue title if it's the number theme to avoid redundancy
    const titleColor = theme === 'number' ? '#16a34a' : '#0369a1';
    const title = this.add.text(0, -220, item.title, { 
      fontSize: '54px', color: titleColor, fontStyle: 'bold', fontFamily: 'Fredoka' 
    }).setOrigin(0.5);
    
    // If it's number theme, the large numeral serves as the title, so we can hide this one
    if (theme === 'number') title.setVisible(false);
    
    card.add(title);

    if (theme === 'size' || theme === 'shape' || theme === 'time') {
      if (item.image && item.image2) {
        // Larger Boxes for images (width 370, height 280)
        const frame1 = this.add.rectangle(-240, -30, 370, 280, 0xffffff, 1).setStrokeStyle(8, 0xbae6fd).setInteractive();
        const frame2 = this.add.rectangle(240, -30, 370, 280, 0xffffff, 1).setStrokeStyle(8, 0xbae6fd).setInteractive();
        card.add([frame1, frame2]);

        const img1 = this.add.image(-240, -30, `${theme}_img_${this.currentIndex}_1`).setInteractive();
        const img2 = this.add.image(240, -30, `${theme}_img_${this.currentIndex}_2`).setInteractive();
        
        const targetW = 330;
        const targetH = 240;
        img1.setScale(Math.min(targetW / img1.width, targetH / img1.height));
        img2.setScale(Math.min(targetW / img2.width, targetH / img2.height));

        // Rounded Masks
        const mask1 = this.make.graphics({}).fillStyle(0xffffff).fillRoundedRect(-240 - targetW/2, -30 - targetH/2, targetW, targetH, 20);
        const mask2 = this.make.graphics({}).fillStyle(0xffffff).fillRoundedRect(240 - targetW/2, -30 - targetH/2, targetW, targetH, 20);
        
        img1.setMask(mask1.createGeometryMask());
        img2.setMask(mask2.createGeometryMask());

        card.add([img1, img2]);

        // Image Interactivity
        [img1, img2].forEach(img => {
          img.on('pointerover', () => {
            playSound('hover');
            this.tweens.add({ targets: img, scale: img.scale * 1.15, duration: 200, ease: 'Back.easeOut' });
          });
          img.on('pointerout', () => {
            this.tweens.add({ targets: img, scale: Math.min(targetW / img.width, targetH / img.height), duration: 200 });
          });
          img.on('pointerdown', () => {
            playSound('pop');
            this.showImagePreview(img.texture.key);
          });
        });
        
        // Comparison Graphic (Double Arrow)
        if (theme !== 'time') {
          const arrowContainer = this.add.container(0, -30);
          
          const arrowPath = new Phaser.Geom.Polygon([
             22, -14,
             22, -30,
             55, 0,
             22, 30,
             22, 14,
             -22, 14,
             -22, 30,
             -55, 0,
             -22, -30,
             -22, -14
          ]);
          
          // Shadow
          const shadowGfx = this.add.graphics();
          shadowGfx.fillStyle(0x000000, 0.15);
          const shadowPoints = arrowPath.points.map(p => ({ x: p.x, y: p.y + 6 }));
          shadowGfx.fillPoints(shadowPoints, true);
          
          // Solid arrow
          const arrowGfx = this.add.graphics();
          arrowGfx.fillStyle(0xf59e0b, 1);
          arrowGfx.fillPoints(arrowPath.points, true);
          arrowGfx.lineStyle(6, 0xffffff, 1);
          arrowGfx.strokePoints(arrowPath.points, true, true);
          
          arrowContainer.add([shadowGfx, arrowGfx]);
          
          this.tweens.add({
             targets: arrowContainer,
             scale: 1.1,
             duration: 700,
             yoyo: true,
             repeat: -1,
             ease: 'Sine.easeInOut'
          });
          
          card.add(arrowContainer);
        }

        // Separate Descriptions
        if (item.desc1) {
          const d1 = this.add.text(-240, 130, item.desc1, { 
            fontSize: '28px', color: '#0369a1', fontStyle: 'bold', align: 'center', wordWrap: { width: 350 }, fontFamily: 'Fredoka' 
          }).setOrigin(0.5, 0);
          card.add(d1);
        }
        if (item.desc2) {
          const d2 = this.add.text(240, 130, item.desc2, { 
            fontSize: '28px', color: '#0369a1', fontStyle: 'bold', align: 'center', wordWrap: { width: 350 }, fontFamily: 'Fredoka' 
          }).setOrigin(0.5, 0);
          card.add(d2);
        }
      }
    } else if (theme === 'number') {
      const num = this.add.text(0, -150, item.title, { 
        fontSize: '220px', color: '#16a34a', fontStyle: 'bold', fontFamily: 'Fredoka',
        stroke: '#ffffff', strokeThickness: 14,
        padding: { top: 40, bottom: 40, left: 40, right: 40 }
      }).setOrigin(0.5);
      
      let iconsStr = "";
      const count = this.currentIndex + 1;
      for(let i=0; i<count; i++) iconsStr += item.icon + " ";
      
      const fSize = count >= 7 ? '65px' : (count > 4 ? '90px' : '120px');
      const icons = this.add.text(0, 60, iconsStr.trim(), { 
        fontSize: fSize, wordWrap: { width: 850 }, align: 'center', lineSpacing: 10,
        padding: { top: 30, bottom: 30, left: 30, right: 30 }
      }).setOrigin(0.5);
      
      card.add([num, icons]);
    }

    const subtitle = this.add.text(0, 225, item.subtitle, { 
      fontSize: '36px', color: '#475569', align: 'center', wordWrap: { width: 850 }, fontStyle: 'italic', fontFamily: 'Fredoka' 
    }).setOrigin(0.5);
    card.add(subtitle);

    // Decorative Stars (Corrected positions and added padding to prevent clipping)
    for (let i = 0; i < 4; i++) {
      const star = this.add.text(i % 2 === 0 ? -440 : 440, i < 2 ? -240 : 240, '⭐', { fontSize: '40px', padding: { top: 12, bottom: 12, left: 12, right: 12 } }).setOrigin(0.5);
      card.add(star);
      this.tweens.add({ targets: star, scale: 1.3, duration: 1000 + i*200, yoyo: true, repeat: -1 });
    }

    this.contentContainer.add(card);
    this.tweens.add({ targets: this.contentContainer, alpha: 1, scale: 1, duration: 500, ease: 'Back.easeOut' });
  }

  showImagePreview(textureKey: string) {
    const camW = this.cameras.main.width;
    const camH = this.cameras.main.height;
    const camX = camW / 2;
    const camY = camH / 2;

    // Dark overlay
    const overlay = this.add.rectangle(camX, camY, camW, camH, 0x000000, 0)
      .setDepth(300)
      .setInteractive();
    this.tweens.add({ targets: overlay, fillAlpha: 0.75, duration: 250 });

    // Preview container
    const popup = this.add.container(camX, camY).setDepth(301).setScale(0.7).setAlpha(0);

    // White card background
    const card = this.add.graphics();
    card.fillStyle(0xffffff, 1).fillRoundedRect(-370, -280, 740, 560, 30);
    card.lineStyle(8, 0x0ea5e9, 1).strokeRoundedRect(-370, -280, 740, 560, 30);
    popup.add(card);

    // Preview image
    const previewImg = this.add.image(0, -10, textureKey);
    const maxW = 680, maxH = 460;
    const scl = Math.min(maxW / previewImg.width, maxH / previewImg.height);
    previewImg.setScale(scl).setOrigin(0.5);
    popup.add(previewImg);

    // Close hint text
    const hint = this.add.text(0, 255, '✕  Ketuk untuk menutup', {
      fontFamily: 'Fredoka', fontSize: '26px', color: '#64748b', fontStyle: 'bold'
    }).setOrigin(0.5);
    popup.add(hint);

    // Animate in
    this.tweens.add({ targets: popup, alpha: 1, scale: 1, duration: 350, ease: 'Back.easeOut' });

    const closePreview = () => {
      this.tweens.add({
        targets: [popup, overlay],
        alpha: 0,
        scale: { value: 0.8, duration: 200 },
        duration: 200,
        ease: 'Sine.easeIn',
        onComplete: () => {
          popup.destroy();
          overlay.destroy();
        }
      });
    };

    overlay.on('pointerdown', closePreview);
    card.setInteractive(new Phaser.Geom.Rectangle(-370, -280, 740, 560), Phaser.Geom.Rectangle.Contains);
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
      }).setOrigin(0.5).setDepth(-5).setAlpha(0.7);

      this.tweens.add({
        targets: flower,
        y: y - Phaser.Math.Between(18, 35),
        duration,
        delay,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });

      this.tweens.add({
        targets: flower,
        angle: Phaser.Math.Between(-18, 18),
        duration: duration * 1.3,
        delay: delay + 200,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });

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
}

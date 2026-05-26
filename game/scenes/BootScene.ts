"use client";

import Phaser from 'phaser';
import { LEARNING_DATA } from '../learningData';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load main background
    if (!this.textures.exists('main_bg')) {
      this.load.image('main_bg', '/background/lfp2_4s5c_210409.jpg');
    }

    // Load Size assets
    const sizeMap = {
      'besar-kecil': ['gajah.png', 'semut.png'],
      'panjang-pendek': ['ular.png', 'ulat.png'],
      'tinggi-rendah': ['jerapah.png', 'ayam.png'],
      'berat-ringan': ['batu.png', 'balon.png'],
      'tebal-tipis': ['buku tebal.jpeg', 'kertas tipis.jpeg'],
      'banyak-sedikti': ['buah banyak.jpeg', 'buah sedikit.jpeg'],
      'jauh-dekat': ['rumah jauh.jpeg', 'rumah dekat.jpeg'],
      'kosong-penuh': ['gelaspenuh.png', 'gelas kosong.png'],
      'cepat-lambat': ['kelinci.png', 'kura-kura.png'],
      'luas-sempit': ['luas.jpeg', 'sempit.jpeg']
    };

    Object.entries(sizeMap).forEach(([concept, files]) => {
      const k1 = `${concept}_1`, k2 = `${concept}_2`;
      if (!this.textures.exists(k1)) this.load.image(k1, `/pengenalan-ukuran/${concept}/${files[0]}`);
      if (!this.textures.exists(k2)) this.load.image(k2, `/pengenalan-ukuran/${concept}/${files[1]}`);
    });

    // Load Shape assets
    if (!this.textures.exists('circle_img_1')) this.load.image('circle_img_1', '/lingkaran/lingkaran1.png');
    if (!this.textures.exists('square_img_1')) this.load.image('square_img_1', '/persegi/pesergi1.png');
    if (!this.textures.exists('triangle_img_1')) this.load.image('triangle_img_1', '/segitiga/segitiga1.png');
    if (!this.textures.exists('rectangle_img_1')) this.load.image('rectangle_img_1', '/pesergi panjang/pesergipanjang1.png');
    if (!this.textures.exists('rectangle_img_2')) this.load.image('rectangle_img_2', '/pesergi panjang/pesergipanjang2.png');
    if (!this.textures.exists('rectangle_img_3')) this.load.image('rectangle_img_3', '/pesergi panjang/pesergipanjang3.png');

    // Load Time assets (Pagi, Siang, Malam - 3 images each)
    const timeStages = ['siang', 'pagi', 'malam'];
    timeStages.forEach(stage => {
       for(let i=1; i<=3; i++) {
          const key = `${stage}_${i}`;
          if (!this.textures.exists(key)) {
             let fileName = "";
             if (stage === 'siang' && i === 1) {
                fileName = 'siang.png';
             } else {
                fileName = `${stage}${i}.png`;
             }
             this.load.image(key, `/waktu/${stage}/${fileName}`);
          }
       }
    });

    // Load Learning Data images
    Object.entries(LEARNING_DATA).forEach(([themeKey, data]) => {
      data.items.forEach((item: any, index: number) => {
        const k1 = `${themeKey}_img_${index}_1`, k2 = `${themeKey}_img_${index}_2`;
        if (item.image && !this.textures.exists(k1)) this.load.image(k1, item.image);
        if (item.image2 && !this.textures.exists(k2)) this.load.image(k2, item.image2);
      });
    });

    // Loading Screen UI
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Background for loading screen
    const bg = this.add.graphics();
    bg.fillStyle(0x87CEEB, 1); // Sky blue background
    bg.fillRect(0, 0, width, height);

    // Decorative circles
    const decor1 = this.add.graphics();
    decor1.fillStyle(0xFFFFFF, 0.2);
    decor1.fillCircle(width * 0.1, height * 0.2, 100);
    const decor2 = this.add.graphics();
    decor2.fillStyle(0xFFFFFF, 0.2);
    decor2.fillCircle(width * 0.9, height * 0.8, 150);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    
    // Rounded box
    progressBox.fillStyle(0xFFFFFF, 0.4);
    progressBox.fillRoundedRect(width/2 - 160, height/2 - 10, 320, 40, 20);
    
    // Loading text
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Memuat EduGame...', {
      font: '28px "Fredoka One", "Comic Sans MS", sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 2, stroke: true, fill: true }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    // Percent text
    const percentText = this.add.text(width / 2, height / 2 + 10, '0%', {
      font: '18px "Fredoka One", Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    });
    percentText.setOrigin(0.5, 0.5);

    // Bouncing dots animation
    const dot1 = this.add.circle(width / 2 - 30, height / 2 + 60, 8, 0xffd700);
    const dot2 = this.add.circle(width / 2, height / 2 + 60, 8, 0xff69b4);
    const dot3 = this.add.circle(width / 2 + 30, height / 2 + 60, 8, 0x00ff00);

    // Apply stroke to dots
    dot1.setStrokeStyle(2, 0x000000);
    dot2.setStrokeStyle(2, 0x000000);
    dot3.setStrokeStyle(2, 0x000000);

    this.tweens.add({
      targets: [dot1, dot2, dot3],
      y: height / 2 + 40,
      duration: 400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      delay: this.tweens.stagger(150)
    });
    
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x4CAF50, 1); // Green progress
      progressBar.fillRoundedRect(width/2 - 155, height/2 - 5, 310 * value, 30, 15);
      percentText.setText(Math.floor(value * 100) + '%');
      // Bring text to top
      percentText.setDepth(1);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      bg.destroy();
      decor1.destroy();
      decor2.destroy();
      dot1.destroy();
      dot2.destroy();
      dot3.destroy();
    });
  }

  create() {
    const level = this.registry.get('level');
    if (level === 1) this.scene.start('LearningScene');
    else this.scene.start('MainScene');
  }
}

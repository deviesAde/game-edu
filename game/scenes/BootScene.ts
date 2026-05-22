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
      'besar-kecil': ['gajah besar.png', 'semut kecil.png'],
      'panjang-pendek': ['ular panjang.png', 'ulat pendek.jpeg'],
      'tinggi-rendah': ['dino tinggi.jpeg', 'kucing rendah.jpeg'],
      'berat-ringan': ['batu berat.jpeg', 'balon ringan.jpeg'],
      'tebal-tipis': ['buku tebal.jpeg', 'kertas tipis.jpeg'],
      'banyak-sedikti': ['buah banyak.jpeg', 'buah sedikit.jpeg'],
      'jauh-dekat': ['rumah jauh.jpeg', 'rumah dekat.jpeg'],
      'kosong-penuh': ['gelas penuh.jpeg', 'gelas kosong.jpeg'],
      'cepat-lambat': ['kancil cepat.jpeg', 'kura kura.jpeg'],
      'luas-sempit': ['luas.jpeg', 'sempit.jpeg']
    };

    Object.entries(sizeMap).forEach(([concept, files]) => {
      const k1 = `${concept}_1`, k2 = `${concept}_2`;
      if (!this.textures.exists(k1)) this.load.image(k1, `/pengenalan-ukuran/${concept}/${files[0]}`);
      if (!this.textures.exists(k2)) this.load.image(k2, `/pengenalan-ukuran/${concept}/${files[1]}`);
    });

    // Load Shape assets
    if (!this.textures.exists('circle_img_1')) this.load.image('circle_img_1', '/lingkaran/Gemini_Generated_Image_7x3ltg7x3ltg7x3l.png');
    if (!this.textures.exists('square_img_1')) this.load.image('square_img_1', '/persegi/ChatGPT Image May 11, 2026, 07_57_59 PM.png');
    if (!this.textures.exists('triangle_img_1')) this.load.image('triangle_img_1', '/segitiga/Gemini_Generated_Image_2o67qu2o67qu2o67.png');
    if (!this.textures.exists('rectangle_img_1')) this.load.image('rectangle_img_1', '/pesergi panjang/pesergi panjang1.png');
    if (!this.textures.exists('rectangle_img_2')) this.load.image('rectangle_img_2', '/pesergi panjang/pesergi panjang2.png');
    if (!this.textures.exists('rectangle_img_3')) this.load.image('rectangle_img_3', '/pesergi panjang/pesergi panjang3.png');

    // Load Time assets
    const timeStages = ['siang', 'sore', 'malam'];
    timeStages.forEach(stage => {
       for(let i=1; i<=6; i++) {
          if (stage === 'siang' && i === 2) continue;
          const key = `${stage}_${i}`;
          if (!this.textures.exists(key)) {
            this.load.image(key, `/waktu/${stage}/${stage} (${i}).jpeg`);
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

    // Progress listener
    const width = this.cameras.main.width, height = this.cameras.main.height;
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width/2 - 160, height/2 - 25, 320, 50);
    
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width/2 - 150, height/2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });
  }

  create() {
    const level = this.registry.get('level');
    if (level === 1) this.scene.start('LearningScene');
    else this.scene.start('MainScene');
  }
}

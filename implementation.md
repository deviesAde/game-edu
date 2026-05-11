# Implementation.md

# Implementasi Game Edukasi Matematika Anak Usia 5–6 Tahun

## 1. Deskripsi Umum

Game edukasi ini merupakan aplikasi pembelajaran interaktif berbasis web yang ditujukan untuk anak usia 5–6 tahun. Game dirancang untuk membantu anak mengenal konsep dasar matematika melalui aktivitas visual dan interaktif.

Aplikasi dibangun tanpa backend sehingga seluruh data, sistem permainan, dan penyimpanan skor dilakukan di sisi client menggunakan browser storage.

Game terdiri dari beberapa tema pembelajaran dengan sistem level bertahap agar anak dapat belajar secara perlahan dan menyenangkan.

---

# 2. Tujuan Implementasi

Tujuan implementasi sistem adalah:

- Membantu anak memahami konsep matematika dasar
- Menyediakan media belajar interaktif dan menyenangkan
- Melatih kemampuan berpikir sederhana anak
- Memberikan pengalaman belajar melalui permainan
- Mengurangi pembelajaran yang monoton

---

# 3. Tech Stack

## Frontend Framework

- Next.js
- React.js
- Tailwind CSS

## Game Engine

- Phaser.js

## Audio dan Animasi

- Howler.js
- Framer Motion

## Penyimpanan Data

- LocalStorage Browser

---

# 4. Arsitektur Sistem

Game menggunakan arsitektur frontend-only tanpa backend server.

```txt
User
  ↓
Next.js Interface
  ↓
Phaser Game Engine
  ↓
Question Randomizer
  ↓
Score System
  ↓
LocalStorage
```

---

# 5. Desain Level & Mekanika Permainan

## Tema Pembelajaran

Setiap tema akan memiliki **2 level**:
- **Level 1**: Pengenalan konsep (lebih ke interaktif dan visual).
- **Level 2**: Latihan soal sederhana.

### Tema 1: Ukuran (Besar–Kecil)
Anak diminta membandingkan ukuran benda.
- **Contoh Gameplay**: Memilih mana yang lebih besar atau lebih kecil dari dua objek yang ditampilkan.

### Tema 2: Bentuk Geometri
Anak mengenal bentuk seperti lingkaran, segitiga, dan persegi.
- **Contoh Gameplay**: Mencocokkan bentuk atau memilih bentuk yang sesuai dengan pertanyaan.

### Tema 3: Angka
Anak mulai mengenal angka dan berhitung sederhana.
- **Contoh Gameplay**: Menghitung jumlah benda lalu memilih angka yang benar.

### Tema 4: Waktu
Anak memahami konsep waktu sederhana seperti pagi, siang, malam, serta urutan kegiatan.
- **Contoh Gameplay**: Menyusun urutan aktivitas atau memilih waktu yang sesuai dengan gambar.

## Sistem Permainan

1. **Soal Acak (Randomizer)**
   Sistem soal diacak setiap kali anak bermain. Tujuannya agar anak tidak menghafal pola jawaban dan tetap berpikir.
   
2. **Sistem Poin (Token Economy)**
   Di dalam game terdapat sistem poin, di mana anak akan mendapatkan poin (token) setiap menjawab pertanyaan dengan benar sebagai bentuk *reward* dan motivasi.
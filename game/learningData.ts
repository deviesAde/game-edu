import { ThemeId } from "../lib/questionGenerator";

export interface LearningItem {
  title: string;
  subtitle: string;
  icon?: string;
  image?: string;
  image2?: string;
  desc1?: string;
  desc2?: string;
  description?: string;
}

export const LEARNING_DATA: Record<ThemeId, { title: string, items: LearningItem[] }> = {
  size: {
    title: "UKURAN - Level 1 (Pengenalan Ukuran)",
    items: [
      { 
        title: "Besar & Kecil", 
        subtitle: "Gajah itu BESAR, Semut itu KECIL!", 
        desc1: "Gajah sangat BESAR!",
        desc2: "Semut sangat KECIL!",
        image: "/pengenalan-ukuran/besar-kecil/gajah besar.png",
        image2: "/pengenalan-ukuran/besar-kecil/semut kecil.png"
      },
      { 
        title: "Panjang & Pendek", 
        subtitle: "Ular itu PANJANG, Ulat itu PENDEK!", 
        desc1: "Ular sangat PANJANG!",
        desc2: "Ulat sangat PENDEK!",
        image: "/pengenalan-ukuran/panjang-pendek/ular panjang.png",
        image2: "/pengenalan-ukuran/panjang-pendek/ulat pendek.jpeg"
      },
      { 
        title: "Tinggi & Rendah", 
        subtitle: "Dino itu TINGGI, Kucing itu RENDAH!", 
        desc1: "Dino sangat TINGGI!",
        desc2: "Kucing sangat RENDAH!",
        image: "/pengenalan-ukuran/tinggi-rendah/dino tinggi.jpeg",
        image2: "/pengenalan-ukuran/tinggi-rendah/kucing rendah.jpeg"
      },
      { 
        title: "Berat & Ringan", 
        subtitle: "Batu itu BERAT, Balon itu RINGAN!", 
        desc1: "Batu sangat BERAT!",
        desc2: "Balon sangat RINGAN!",
        image: "/pengenalan-ukuran/berat-ringan/batu berat.jpeg",
        image2: "/pengenalan-ukuran/berat-ringan/balon ringan.jpeg"
      },
      { 
        title: "Tebal & Tipis", 
        subtitle: "Buku itu TEBAL, Kertas itu TIPIS!", 
        desc1: "Buku sangat TEBAL!",
        desc2: "Kertas sangat TIPIS!",
        image: "/pengenalan-ukuran/tebal-tipis/buku tebal.jpeg",
        image2: "/pengenalan-ukuran/tebal-tipis/kertas tipis.jpeg"
      },
      { 
        title: "Banyak & Sedikit", 
        subtitle: "Buahnya BANYAK sekali!", 
        desc1: "Buah yang BANYAK!",
        desc2: "Buah yang SEDIKIT!",
        image: "/pengenalan-ukuran/banyak-sedikti/buah banyak.jpeg",
        image2: "/pengenalan-ukuran/banyak-sedikti/buah sedikit.jpeg"
      },
      { 
        title: "Jauh & Dekat", 
        subtitle: "Rumahnya JAUH atau DEKAT ya?", 
        desc1: "Rumah yang JAUH!",
        desc2: "Rumah yang DEKAT!",
        image: "/pengenalan-ukuran/jauh-dekat/rumah jauh.jpeg",
        image2: "/pengenalan-ukuran/jauh-dekat/rumah dekat.jpeg"
      },
      { 
        title: "Penuh - Kosong", 
        subtitle: "Airnya ada di mana ya?", 
        desc1: "Gelas ini isinya PENUH air.",
        desc2: "Gelas yang ini KOSONG, tidak ada air.",
        image: "/pengenalan-ukuran/kosong-penuh/gelas penuh.jpeg",
        image2: "/pengenalan-ukuran/kosong-penuh/gelas kosong.jpeg"
      },
      { 
        title: "Cepat - Lambat", 
        subtitle: "Siapa ya yang paling kencang?", 
        desc1: "Kancil ini lari sangat CEPAT!",
        desc2: "Kura-kura ini jalan pelan-pelan LAMBAT.",
        image: "/pengenalan-ukuran/cepat-lambat/kancil cepat.jpeg",
        image2: "/pengenalan-ukuran/cepat-lambat/kura kura.jpeg"
      },
      { 
        title: "Luas - Sempit", 
        subtitle: "Jalannya besar atau kecil ya?", 
        desc1: "Jalanan ini LUAS dan lebar.",
        desc2: "Gang ini SEMPIT dan kecil.",
        image: "/pengenalan-ukuran/luas-sempit/luas.jpeg",
        image2: "/pengenalan-ukuran/luas-sempit/sempit.jpeg"
      },
    ]
  },
  shape: {
    title: "BENTUK GEOMETRI - Level 1 (Pengenalan Bentuk)",
    items: [
      { 
        title: "Lingkaran", 
        subtitle: "Bulat dan melingkar!", 
        desc1: "Lingkaran itu BULAT sekali.",
        desc2: "Seperti BOLA yang membal.",
        image: "/lingkaran/Gemini_Generated_Image_7x3ltg7x3ltg7x3l.png",
        image2: "/lingkaran/Gemini_Generated_Image_9k153d9k153d9k15.png"
      },
      { 
        title: "Segitiga", 
        subtitle: "Punya tiga pojok lancip!", 
        desc1: "Segitiga punya TIGA sisi.",
        desc2: "Seperti TOPI pesta ini.",
        image: "/segitiga/Gemini_Generated_Image_2o67qu2o67qu2o67.png",
        image2: "/segitiga/Gemini_Generated_Image_dzs0e3dzs0e3dzs0.png"
      },
      { 
        title: "Persegi", 
        subtitle: "Semua sisinya sama!", 
        desc1: "Persegi punya EMPAT sisi.",
        desc2: "Seperti KOTAK kado ini.",
        image: "/persegi/hilangkan_square_perbesar_persegi_202605111955.jpeg",
        image2: "/persegi/Square_shape_with_children_learning_202605111950 (1).jpeg"
      },
      { 
        title: "Persegi Panjang", 
        subtitle: "Ada yang panjang, ada yang pendek!", 
        desc1: "Persegi Panjang itu LEBAR.",
        desc2: "Seperti PINTU rumah kita.",
        image: "/pesergi panjang/pesergi panjang1.png",
        image2: "/pesergi panjang/pesergi panjang2.png"
      },
    ]
  },
  number: {
    title: "ANGKA - Level 1 (Pengenalan Angka & Jumlah)",
    items: [
      { title: "1", subtitle: "Satu permen 🍭", icon: "🍭" },
      { title: "2", subtitle: "Dua apel 🍎", icon: "🍎" },
      { title: "3", subtitle: "Tiga mobil 🚗", icon: "🚗" },
      { title: "4", subtitle: "Empat bola ⚽", icon: "⚽" },
      { title: "5", subtitle: "Lima bintang ⭐", icon: "⭐" },
      { title: "6", subtitle: "Enam pensil ✏️", icon: "✏️" },
      { title: "7", subtitle: "Tujuh pisang 🍌", icon: "🍌" },
      { title: "8", subtitle: "Delapan ikan 🐟", icon: "🐟" },
      { title: "9", subtitle: "Sembilan balon 🎈", icon: "🎈" },
      { title: "10", subtitle: "Sepuluh wortel 🥕", icon: "🥕" },
    ]
  },
  time: {
    title: "WAKTU - Level 1 (Pengenalan Waktu)",
    items: [
      { 
        title: "Siang Hari", 
        subtitle: "Matahari sangat terang!", 
        desc1: "SIANG hari yang panas.",
        desc2: "Asyik bermain bersama!",
        image: "/waktu/siang/siang (1).jpeg",
        image2: "/waktu/siang/siang (3).jpeg"
      },
      { 
        title: "Sore Hari", 
        subtitle: "Matahari sudah mau bobo!", 
        desc1: "SORE hari yang jingga.",
        desc2: "Waktunya mandi sore!",
        image: "/waktu/sore/sore (1).jpeg",
        image2: "/waktu/sore/sore (2).jpeg"
      },
      { 
        title: "Malam Hari", 
        subtitle: "Ada bulan dan bintang!", 
        desc1: "MALAM hari yang tenang.",
        desc2: "Waktunya tidur nyenyak...",
        image: "/waktu/malam/malam (1).jpeg",
        image2: "/waktu/malam/malam (2).jpeg"
      },
    ]
  }
};

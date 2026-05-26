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
        image: "/pengenalan-ukuran/besar-kecil/gajah.png",
        image2: "/pengenalan-ukuran/besar-kecil/semut.png"
      },
      { 
        title: "Panjang & Pendek", 
        subtitle: "Ular itu PANJANG, Ulat itu PENDEK!", 
        desc1: "Ular sangat PANJANG!",
        desc2: "Ulat sangat PENDEK!",
        image: "/pengenalan-ukuran/panjang-pendek/ular.png",
        image2: "/pengenalan-ukuran/panjang-pendek/ulat.png"
      },
      { 
        title: "Tinggi & Rendah", 
        subtitle: "Jerapah itu TINGGI, Ayam itu RENDAH!", 
        desc1: "Jerapah sangat TINGGI!",
        desc2: "Ayam sangat RENDAH!",
        image: "/pengenalan-ukuran/tinggi-rendah/jerapah.png",
        image2: "/pengenalan-ukuran/tinggi-rendah/ayam.png"
      },
      { 
        title: "Berat & Ringan", 
        subtitle: "Batu itu BERAT, Balon itu RINGAN!", 
        desc1: "Batu sangat BERAT!",
        desc2: "Balon sangat RINGAN!",
        image: "/pengenalan-ukuran/berat-ringan/batu.png",
        image2: "/pengenalan-ukuran/berat-ringan/balon.png"
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
        image: "/pengenalan-ukuran/kosong-penuh/gelaspenuh.png",
        image2: "/pengenalan-ukuran/kosong-penuh/gelas kosong.png"
      },
      { 
        title: "Cepat - Lambat", 
        subtitle: "Siapa ya yang paling kencang?", 
        desc1: "Kelinci ini lari sangat CEPAT!",
        desc2: "Kura-kura ini jalan pelan-pelan LAMBAT.",
        image: "/pengenalan-ukuran/cepat-lambat/kelinci.png",
        image2: "/pengenalan-ukuran/cepat-lambat/kura-kura.png"
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
        desc1: "Seperti HULA HOOP warna-warni ini.",
        desc2: "Seperti JAM DINDING bulat ini.",
        image: "/lingkaran/lingkaran1.png",
        image2: "/lingkaran/lingkaran2.png"
      },
      { 
        title: "Segitiga", 
        subtitle: "Punya tiga pojok lancip!", 
        desc1: "Seperti KERIPIK NACHO yang renyah ini.",
        desc2: "Seperti BLOK SEGITIGA biru ini.",
        image: "/segitiga/segitiga1.png",
        image2: "/segitiga/segitiga2.png"
      },
      { 
        title: "Persegi", 
        subtitle: "Semua sisinya sama!", 
        desc1: "Seperti BLOK KOTAK biru ini.",
        desc2: "Seperti BISKUIT kotak yang lezat ini.",
        image: "/persegi/pesergi1.png",
        image2: "/persegi/pesergi2.png"
      },
      { 
        title: "Persegi Panjang", 
        subtitle: "Ada yang panjang, ada yang pendek!", 
        desc1: "Seperti BISKUIT PANJANG yang renyah ini.",
        desc2: "Seperti BLOK PERSEGI PANJANG biru ini.",
        image: "/pesergi panjang/pesergipanjang1.png",
        image2: "/pesergi panjang/pesergipanjang2.png"
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
        image: "/waktu/siang/siang.png",
        image2: "/waktu/siang/siang2.png"
      },
      { 
        title: "Pagi Hari", 
        subtitle: "Matahari baru terbit, udaranya segar!", 
        desc1: "PAGI hari yang cerah.",
        desc2: "Waktunya berangkat sekolah!",
        image: "/waktu/pagi/pagi1.png",
        image2: "/waktu/pagi/pagi2.png"
      },
      { 
        title: "Malam Hari", 
        subtitle: "Ada bulan dan bintang!", 
        desc1: "MALAM hari yang tenang.",
        desc2: "Waktunya tidur nyenyak...",
        image: "/waktu/malam/malam1.png",
        image2: "/waktu/malam/malam2.png"
      },
    ]
  }
};

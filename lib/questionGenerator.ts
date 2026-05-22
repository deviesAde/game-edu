export type ThemeId = 'size' | 'shape' | 'number' | 'time';
export type LevelId = 1 | 2;

export interface Question {
  id: string;
  theme: ThemeId;
  level: LevelId;
  questionText: string;
  type: string;
  options: any[];
  correctAnswer: any;
  metadata?: any;
}

export const generateQuestion = (theme: ThemeId, level: LevelId, questionIndex: number = 0): Question | null => {
  // Level 1 is now handled by LearningScene, but we keep this for consistency or if Level 1 questions are ever needed
  if (level === 2 && questionIndex >= 10) {
    return null; // Level 2 completes after 10 questions
  }

  const id = Math.random().toString(36).substring(7);
  // Theme 'size' should only have 2 options for clear comparison, others keep 3
  const numOptions = theme === 'size' ? 2 : 3; 
  
  if (theme === 'size') {
     const types = ['besar-kecil', 'panjang-pendek', 'tinggi-rendah', 'berat-ringan', 'kosong-penuh', 'banyak-sedikti', 'jauh-dekat', 'cepat-lambat', 'luas-sempit', 'tebal-tipis'];
     const selectedType = types[Math.floor(Math.random() * types.length)];
     
     let questionText = "";
     let correctAnswerId = "";
     let options: any[] = [];

     if (selectedType === 'besar-kecil') {
        const isLarger = Math.random() > 0.5;
        questionText = isLarger ? "Mana yang lebih BESAR?" : "Mana yang lebih KECIL?";
        options = [
          { id: 'opt1', value: 50, label: 'Besar' },
          { id: 'opt2', value: 150, label: 'Kecil' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isLarger ? 'opt1' : 'opt2';
     } else if (selectedType === 'panjang-pendek') {
        const isLonger = Math.random() > 0.5;
        questionText = isLonger ? "Mana yang lebih PANJANG?" : "Mana yang lebih PENDEK?";
        options = [
          { id: 'opt1', value: 80, label: 'Panjang' },
          { id: 'opt2', value: 200, label: 'Pendek' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isLonger ? 'opt1' : 'opt2';
     } else if (selectedType === 'tinggi-rendah') {
        const isHigher = Math.random() > 0.5;
        questionText = isHigher ? "Mana yang lebih TINGGI?" : "Mana yang lebih RENDAH?";
        options = [
          { id: 'opt1', value: 60, label: 'Tinggi' },
          { id: 'opt2', value: 180, label: 'Rendah' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isHigher ? 'opt1' : 'opt2';
     } else if (selectedType === 'berat-ringan') {
        const isHeavier = Math.random() > 0.5;
        questionText = isHeavier ? "Mana yang lebih BERAT?" : "Mana yang lebih RINGAN?";
        options = [
          { id: 'opt1', value: 10, label: 'Berat' },
          { id: 'opt2', value: 100, label: 'Ringan' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isHeavier ? 'opt1' : 'opt2';
     } else if (selectedType === 'kosong-penuh') {
        const isFull = Math.random() > 0.5;
        questionText = isFull ? "Pilih gelas yang PENUH!" : "Pilih gelas yang KOSONG!";
        options = [
          { id: 'opt1', value: 0, label: 'Penuh' },
          { id: 'opt2', value: 100, label: 'Kosong' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isFull ? 'opt1' : 'opt2';
     } else if (selectedType === 'banyak-sedikti') {
        const isMore = Math.random() > 0.5;
        questionText = isMore ? "Mana yang lebih BANYAK?" : "Mana yang lebih SEDIKIT?";
        options = [
          { id: 'opt1', value: 10, label: 'Banyak' },
          { id: 'opt2', value: 100, label: 'Sedikit' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isMore ? 'opt1' : 'opt2';
     } else if (selectedType === 'jauh-dekat') {
        const isFar = Math.random() > 0.5;
        questionText = isFar ? "Mana yang lebih JAUH?" : "Mana yang lebih DEKAT?";
        options = [
          { id: 'opt1', value: 10, label: 'Jauh' },
          { id: 'opt2', value: 100, label: 'Dekat' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isFar ? 'opt1' : 'opt2';
     } else if (selectedType === 'cepat-lambat') {
        const isFast = Math.random() > 0.5;
        questionText = isFast ? "Mana yang lebih CEPAT?" : "Mana yang lebih LAMBAT?";
        options = [
          { id: 'opt1', value: 10, label: 'Cepat' },
          { id: 'opt2', value: 100, label: 'Lambat' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isFast ? 'opt1' : 'opt2';
     } else if (selectedType === 'luas-sempit') {
        const isWide = Math.random() > 0.5;
        questionText = isWide ? "Mana yang lebih LUAS?" : "Mana yang lebih SEMPIT?";
        options = [
          { id: 'opt1', value: 10, label: 'Luas' },
          { id: 'opt2', value: 100, label: 'Sempit' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isWide ? 'opt1' : 'opt2';
     } else if (selectedType === 'tebal-tipis') {
        const isThick = Math.random() > 0.5;
        questionText = isThick ? "Mana yang lebih TEBAL?" : "Mana yang lebih TIPIS?";
        options = [
          { id: 'opt1', value: 10, label: 'Tebal' },
          { id: 'opt2', value: 100, label: 'Tipis' }
        ].sort(() => Math.random() - 0.5);
        correctAnswerId = isThick ? 'opt1' : 'opt2';
     }

     return {
       id, theme, level, questionText,
       type: selectedType,
       options,
       correctAnswer: correctAnswerId,
       metadata: { concept: selectedType }
     };
  }

  if (theme === 'shape') {
    const allShapes = ['circle', 'triangle', 'square', 'rectangle'];
    const selectedShapes = allShapes.sort(() => Math.random() - 0.5).slice(0, numOptions);
    const targetShape = selectedShapes[Math.floor(Math.random() * selectedShapes.length)];
    const shapeNames: Record<string, string> = {
      'circle': 'BULAT LINGKARAN',
      'triangle': 'SEGITIGA LANCIP',
      'square': 'KOTAK PERSEGI',
      'rectangle': 'PERSEGI PANJANG'
    };
    return {
      id, theme, level,
      questionText: `Coba cari yang bentuknya ${shapeNames[targetShape]}!`,
      type: 'match-shape',
      options: selectedShapes,
      correctAnswer: targetShape
    };
  }

  if (theme === 'number') {
    const fruits = ['🍎', '🍊', '🍌', '🍉', '🍇', '🍓', '🍒', '🍍', '🥭', '🍐'];
    const selectedFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const count = Math.floor(Math.random() * 10) + 1;
    let optionsSet = new Set<number>([count]);
    while(optionsSet.size < numOptions) {
        const r = Math.floor(Math.random() * 12) + 1;
        optionsSet.add(r);
    }
    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
    return {
      id, theme, level,
      questionText: `Hitung ya, ada berapa ${selectedFruit} di sana?`,
      type: 'count-objects',
      options,
      correctAnswer: count,
      metadata: { fruit: selectedFruit }
    };
  }

  if (theme === 'time') {
    const allTimes = ['siang', 'sore', 'malam'];
    const selectedTimes = allTimes.sort(() => Math.random() - 0.5).slice(0, Math.min(numOptions, 3));
    const targetTime = selectedTimes[Math.floor(Math.random() * selectedTimes.length)];
    return {
      id, theme, level,
      questionText: `Kalau waktu ${targetTime.toUpperCase()}, gambarnya yang mana ya?`,
      type: 'select-time',
      options: selectedTimes,
      correctAnswer: targetTime
    };
  }

  return null;
};

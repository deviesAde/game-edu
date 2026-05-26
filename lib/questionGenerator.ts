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

export const generateQuestionSingle = (
  theme: ThemeId,
  level: LevelId,
  key: string,
  countVal?: number
): Question => {
  const id = Math.random().toString(36).substring(7);
  const numOptions = theme === 'size' ? 2 : 3;

  if (theme === 'size') {
    const selectedType = key;
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
    const targetShape = key;
    const allShapes = ['circle', 'triangle', 'square', 'rectangle'];
    const otherShapes = allShapes.filter(s => s !== targetShape).sort(() => Math.random() - 0.5);
    const selectedShapes = [targetShape, ...otherShapes.slice(0, numOptions - 1)].sort(() => Math.random() - 0.5);
    
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
    const selectedFruit = key;
    const count = countVal || 1;
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
    const targetTime = key;
    const allTimes = ['siang', 'pagi', 'malam'];
    const otherTimes = allTimes.filter(t => t !== targetTime).sort(() => Math.random() - 0.5);
    const selectedTimes = [targetTime, ...otherTimes.slice(0, numOptions - 1)].sort(() => Math.random() - 0.5);
    return {
      id, theme, level,
      questionText: `Kalau waktu ${targetTime.toUpperCase()}, gambarnya yang mana ya?`,
      type: 'select-time',
      options: selectedTimes,
      correctAnswer: targetTime
    };
  }

  throw new Error(`Unsupported theme: ${theme}`);
};

export const generateQuestionList = (theme: ThemeId, level: LevelId, totalQuestions: number = 10): Question[] => {
  const list: Question[] = [];

  if (theme === 'size') {
    const types = ['besar-kecil', 'panjang-pendek', 'tinggi-rendah', 'berat-ringan', 'kosong-penuh', 'banyak-sedikti', 'jauh-dekat', 'cepat-lambat', 'luas-sempit', 'tebal-tipis'];
    // Shuffle all 10 unique concepts to ensure each appears exactly once in the 10 questions!
    const shuffledTypes = types.sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(totalQuestions, shuffledTypes.length); i++) {
      list.push(generateQuestionSingle(theme, level, shuffledTypes[i]));
    }
  } else if (theme === 'shape') {
    const allShapes = ['circle', 'triangle', 'square', 'rectangle'];
    // Build a balanced list of targets
    const targets: string[] = [];
    while (targets.length < totalQuestions) {
      const shuffled = allShapes.slice().sort(() => Math.random() - 0.5);
      targets.push(...shuffled);
    }
    const selectedTargets = targets.slice(0, totalQuestions);
    selectedTargets.forEach(target => {
      list.push(generateQuestionSingle(theme, level, target));
    });
  } else if (theme === 'number') {
    // Generate counts from 1 to 10 shuffled
    const counts = Array.from({ length: 10 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    const fruits = ['🍎', '🍊', '🍌', '🍉', '🍇', '🍓', '🍒', '🍍', '🥭', '🍐'];
    for (let i = 0; i < totalQuestions; i++) {
      const count = counts[i % counts.length];
      const fruit = fruits[Math.floor(Math.random() * fruits.length)];
      list.push(generateQuestionSingle(theme, level, fruit, count));
    }
  } else if (theme === 'time') {
    const allTimes = ['siang', 'pagi', 'malam'];
    const targets: string[] = [];
    while (targets.length < totalQuestions) {
      const shuffled = allTimes.slice().sort(() => Math.random() - 0.5);
      targets.push(...shuffled);
    }
    const selectedTargets = targets.slice(0, totalQuestions);
    selectedTargets.forEach(target => {
      list.push(generateQuestionSingle(theme, level, target));
    });
  }

  return list;
};

export const generateQuestion = (theme: ThemeId, level: LevelId, questionIndex: number = 0): Question | null => {
  if (level === 2 && questionIndex >= 10) {
    return null;
  }
  const list = generateQuestionList(theme, level, 10);
  return list[questionIndex] || null;
};

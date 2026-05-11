export type ThemeId = 'size' | 'shape' | 'number' | 'time';
export type LevelId = 1 | 2;

export interface Question {
  id: string;
  theme: ThemeId;
  level: LevelId;
  questionText: string;
  type: 'select-larger' | 'select-smaller' | 'match-shape' | 'count-objects' | 'sequence-time' | 'select-time';
  options: any[];
  correctAnswer: any;
}

export const generateQuestion = (theme: ThemeId, level: LevelId, questionIndex: number = 0): Question | null => {
  // Batas soal untuk Level 1 (Konsep)
  if (level === 1 && questionIndex >= 3) {
    return null; // Sinyal bahwa level konsep selesai
  }

  const id = Math.random().toString(36).substring(7);
  const numOptions = level === 1 ? 2 : 3;
  
  if (theme === 'size') {
     const isLarger = Math.random() > 0.5;
     const sizes = [
       { id: 'opt1', size: 70 },
       { id: 'opt2', size: 150 },
       { id: 'opt3', size: 110 }
     ];
     const selectedOptions = sizes.slice(0, numOptions).sort(() => Math.random() - 0.5);
     const maxOption = selectedOptions.reduce((prev, current) => (prev.size > current.size) ? prev : current);
     const minOption = selectedOptions.reduce((prev, current) => (prev.size < current.size) ? prev : current);

     return {
       id,
       theme,
       level,
       questionText: isLarger ? "Mana yang paling BESAR?" : "Mana yang paling KECIL?",
       type: isLarger ? 'select-larger' : 'select-smaller',
       options: selectedOptions,
       correctAnswer: isLarger ? maxOption.id : minOption.id
     };
  }

  if (theme === 'shape') {
    const allShapes = ['circle', 'triangle', 'square'];
    const selectedShapes = allShapes.slice(0, numOptions).sort(() => Math.random() - 0.5);
    const targetShape = selectedShapes[Math.floor(Math.random() * selectedShapes.length)];
    const shapeNames: Record<string, string> = {
      'circle': 'LINGKARAN 🔵',
      'triangle': 'SEGITIGA 🔺',
      'square': 'KOTAK 🟦'
    };
    return {
      id,
      theme,
      level,
      questionText: `Cari yang bentuknya ${shapeNames[targetShape]} yuk!`,
      type: 'match-shape',
      options: selectedShapes,
      correctAnswer: targetShape
    };
  }

  if (theme === 'number') {
    const fruits = ['🍎', '🍊', '🍌', '🍉', '🍇', '🍓'];
    const selectedFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const count = Math.floor(Math.random() * 5) + 1;
    let optionsSet = new Set<number>([count]);
    while(optionsSet.size < numOptions) {
        optionsSet.add(Math.floor(Math.random() * 8) + 1);
    }
    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
    return {
      id,
      theme,
      level,
      questionText: `Coba hitung, ada berapa ${selectedFruit} ya?`,
      type: 'count-objects',
      options,
      correctAnswer: count,
      metadata: { fruit: selectedFruit } // Simpan jenis buah yang dipilih
    };
  }

  if (theme === 'time') {
    const allTimes = ['siang', 'sore', 'malam'];
    const selectedTimes = allTimes.slice(0, numOptions).sort(() => Math.random() - 0.5);
    const targetTime = selectedTimes[Math.floor(Math.random() * selectedTimes.length)];
    return {
      id,
      theme,
      level,
      questionText: `Kalau waktu ${targetTime.toUpperCase()}, gambarnya yang mana ya?`,
      type: 'select-time',
      options: selectedTimes,
      correctAnswer: targetTime
    };
  }

  return {
    id,
    theme: 'size',
    level: 1,
    questionText: "Error",
    type: 'select-larger',
    options: [],
    correctAnswer: null
  };
};

import { fruits } from '../src/dataCollection/fruits.js';
import { vegetables } from '../src/dataCollection/vegetables.js';
import { legumes } from '../src/dataCollection/legumes.js';
import { grains } from '../src/dataCollection/grains.js';
import { fats } from '../src/dataCollection/fats.js';
import { dairy } from '../src/dataCollection/dairy.js';
import { pastry } from '../src/dataCollection/pastry.js';
import { paste } from '../src/dataCollection/paste.js';
import { nuts } from '../src/dataCollection/nuts.js';
import { fish } from '../src/dataCollection/fish.js';
import { supplements } from '../src/dataCollection/supplements.js';
import { seeds } from '../src/dataCollection/seeds.js';
import { desserts } from '../src/dataCollection/desserts.js';
import { processedMeat } from '../src/dataCollection/processedMeat.js';
import { beef } from '../src/dataCollection/beef.js';
import { lamb } from '../src/dataCollection/lamb.js';
import { poultry } from '../src/dataCollection/poultry.js';
import { beverages } from '../src/dataCollection/beverages.js';
import { crackers } from '../src/dataCollection/crackers.js';

import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore/lite';

const data = [
  {
    id: 'notFound',
    name: 'عنصر مفقود',
    description: 'خطأ: حاول تحديث التطبيق',
    kcal: 0,
    fat: 0,
    saturatedFat: 0,
    unsaturatedFat: 0,
    carb: 0,
    fiber: 0,
    sugar: 0,
    protein: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    value: 1,
    input: 0,
  },
  ...dairy,
  ...pastry,
  ...nuts,
  ...paste,
  ...poultry,
  ...fish,
  ...fruits,
  ...vegetables,
  ...legumes,
  ...grains,
  ...fats,
  ...supplements,
  ...seeds,
  ...desserts,
  ...processedMeat,
  ...beef,
  ...lamb,
  ...beverages,
  ...crackers,
];

const firebaseConfig = {
  apiKey: 'AIzaSyC5LRIm6bJhUFAqmOmMjY7AGJ8sbNENM2s',
  authDomain: 'my-daily-a819f.firebaseapp.com',
  projectId: 'my-daily-a819f',
  storageBucket: 'my-daily-a819f.appspot.com',
  messagingSenderId: '505137455190',
  appId: '1:505137455190:web:5632952ae7c0dc80ee1bf7',
  measurementId: 'G-FF07KBJHM9',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const jsonData = JSON.stringify(data);

(async function fireBase() {
  //* get
  const docRef = doc(db, 'data', 'food');
  const docs = await getDoc(docRef);

  if (!docs.exists()) return;

  const data = docs.data();
  const ver = data.dataVersion ?? 0;
  const apkVersion = data.apkVersion;

  //* set
  try {
    await setDoc(doc(db, 'data', 'food'), { data: jsonData, dataVersion: ver + 1, apkVersion });
    console.log('uploaded with version :', ver + 1);
  } catch (e) {
    console.log(e);
  }
})();

fs.readFile('package.json', 'utf8', (err, data) => {
  if (err) return console.error(err);

  const newData = JSON.parse(data);
  delete newData.type;

  fs.writeFile('package.json', JSON.stringify(newData, null, 2), function (err) {
    if (err) return console.log(err);
    console.log('type module removed');
  });
});

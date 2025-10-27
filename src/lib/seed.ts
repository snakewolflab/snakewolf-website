// This script is intended to be run from the command line.
// It seeds the Firestore database with the initial data from `src/lib/data.ts`.

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, writeBatch } from 'firebase/firestore';
import { firebaseConfig } from '../firebase/config';
import { newsArticlesData, workItemsData, creatorItemsData } from './data';

async function seedDatabase() {
  console.log('Initializing Firebase...');
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  console.log('Firebase initialized.');

  try {
    // Seed News Articles
    console.log('Seeding news articles...');
    const newsCollection = collection(db, 'news_articles');
    const newsSnapshot = await getDocs(newsCollection);
    if (newsSnapshot.empty) {
      const newsBatch = writeBatch(db);
      newsArticlesData.forEach(article => {
        const docRef = collection(db, 'news_articles').doc();
        newsBatch.set(docRef, article);
      });
      await newsBatch.commit();
      console.log('News articles seeded successfully.');
    } else {
      console.log('News articles collection already contains data. Skipping seeding.');
    }

    // Seed Work Items
    console.log('Seeding work items...');
    const worksCollection = collection(db, 'work_items');
    const worksSnapshot = await getDocs(worksCollection);
    if (worksSnapshot.empty) {
      const worksBatch = writeBatch(db);
      workItemsData.forEach(item => {
        const docRef = collection(db, 'work_items').doc();
        worksBatch.set(docRef, item);
      });
      await worksBatch.commit();
      console.log('Work items seeded successfully.');
    } else {
      console.log('Work items collection already contains data. Skipping seeding.');
    }

    // Seed Creator Items
    console.log('Seeding creator items...');
    const creatorsCollection = collection(db, 'creator_items');
    const creatorsSnapshot = await getDocs(creatorsCollection);
if (creatorsSnapshot.empty) {
      const creatorsBatch = writeBatch(db);
      creatorItemsData.forEach(item => {
        const docRef = collection(db, 'creator_items').doc();
        creatorsBatch.set(docRef, item);
      });
      await creatorsBatch.commit();
      console.log('Creator items seeded successfully.');
    } else {
      console.log('Creator items collection already contains data. Skipping seeding.');
    }

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Firebase doesn't have a simple "disconnect" for the client SDK.
    // The script will exit automatically.
    process.exit(0);
  }
}

seedDatabase();

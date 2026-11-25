import fs from 'fs';
import path from 'path';

export function getPortfolioData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'portfolioData.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading portfolioData.json:', error);
    return null;
  }
}

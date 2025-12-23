import { API_CONFIG } from '../utils/constants';

// Mock data fallback in case API keys are not provided immediately
const MOCK_DATA = {
  foods: [
    {
      food_name: "Mock Item",
      nf_calories: 100,
      nf_protein: 10,
      nf_total_carbohydrate: 5,
      nf_total_fat: 2,
      serving_qty: 1,
      serving_unit: "serving"
    }
  ]
};

export const fetchNutritionData = async (query) => {
  // If keys are missing, return mock data to prevent app crash during testing
  if (API_CONFIG.APP_ID === 'YOUR_NUTRITIONIX_APP_ID') {
    console.warn("API Keys missing. Using Mock Data.");
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    const randomCal = Math.floor(Math.random() * 200) + 50;
    return {
      name: query,
      calories: randomCal,
      protein: Math.floor(randomCal * 0.3),
      carbs: Math.floor(randomCal * 0.4),
      fats: Math.floor(randomCal * 0.1),
      quantity: '1 serving' // Simplification for mock
    };
  }

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/natural/nutrients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': API_CONFIG.APP_ID,
        'x-app-key': API_CONFIG.API_KEY,
      },
      body: JSON.stringify({ query: query }),
    });

    const data = await response.json();

    if (data.foods && data.foods.length > 0) {
      const item = data.foods[0];
      return {
        name: item.food_name,
        calories: item.nf_calories,
        protein: item.nf_protein,
        carbs: item.nf_total_carbohydrate,
        fats: item.nf_total_fat,
        quantity: `${item.serving_qty} ${item.serving_unit}`
      };
    } else {
      throw new Error('Food not found');
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
const API_BASE = 'https://www.themealdb.com/api/json/v1/1'

// --- BANK PAYMENT CONFIGURATION ---
// Change this URL to your actual Node.js/Laravel backend URL later
const PAYMENT_BASE = 'http://localhost:3000/api' 

// In-memory cache to prevent redundant API calls
const cache = new Map()

// Helper: Generates consistent price & rating based on item ID
const enrichMealData = (meal) => {
  if (!meal) return null
  const idNum = parseInt(meal.idMeal, 10) || 100
  return {
    ...meal,
    price: meal.price || Number((8 + (idNum % 15) + 0.99).toFixed(2)),
    rating: meal.rating || Number((4.0 + (idNum % 10) * 0.1).toFixed(1))
  }
}

// Generic Fetch Wrapper with AbortController, Error Handling, and Caching
const fetchWithCache = async (url, options = {}) => {
  if (cache.has(url)) {
    return cache.get(url)
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    cache.set(url, data)
    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch request aborted')
      return null
    }
    console.error(`API Error [${url}]:`, error)
    return null
  }
}

// ==========================================
// 1. MEALDB API ENDPOINTS
// ==========================================
export const api = {
  // Search meals by name (URL-encoded to prevent broken queries)
  searchByName: async (query = '', signal = null) => {
    const trimmed = query.trim()
    const url = `${API_BASE}/search.php?s=${encodeURIComponent(trimmed)}`
    const data = await fetchWithCache(url, { signal })
    
    if (!data?.meals) return []
    return data.meals.map(enrichMealData)
  },

  // Fetch meals by category name
  getByCategory: async (category, signal = null) => {
    if (!category || category === 'All') {
      return api.searchByName('', signal)
    }
    const url = `${API_BASE}/filter.php?c=${encodeURIComponent(category)}`
    const data = await fetchWithCache(url, { signal })
    
    if (!data?.meals) return []
    return data.meals.map(enrichMealData)
  },

  // Get a single random meal
  getRandomMeal: async () => {
    // Avoid caching random meal queries
    try {
      const response = await fetch(`${API_BASE}/random.php`)
      if (!response.ok) throw new Error('Failed to fetch random meal')
      const data = await response.json()
      return data?.meals ? enrichMealData(data.meals[0]) : null
    } catch (error) {
      console.error('Random Meal API Error:', error)
      return null
    }
  },

  // Get full meal details by ID (Checks fallback foods first for local dishes)
  getById: async (id, signal = null) => {
    if (!id) return null
    
    // Check fallback/local foods first
    const localMatch = fallbackFoods.find(item => item.idMeal === String(id))
    if (localMatch) return localMatch

    const url = `${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`
    const data = await fetchWithCache(url, { signal })
    return data?.meals ? enrichMealData(data.meals[0]) : null
  }
}

// ==========================================
// 2. FALLBACK KHMER / LOCAL FOODS DATA
// ==========================================
export const fallbackFoods = [
  {
    idMeal: 'kh1',
    strMeal: 'Fish Amok (អាម៉ុកត្រី)',
    strCategory: 'Seafood',
    strArea: 'Cambodian',
    strMealThumb: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    price: 8.50,
    rating: 5.0,
    isKhmer: true,
    isNew: true,
    strInstructions: 'Steam fish in banana leaves with rich kroeung paste, coconut cream, and noni leaves. Serve hot with steamed jasmine rice.',
    strIngredient1: 'Fish Fillet',
    strMeasure1: '300g',
    strIngredient2: 'Khmer Kroeung Paste',
    strMeasure2: '3 tbsp',
    strIngredient3: 'Coconut Milk',
    strMeasure3: '200ml',
    strIngredient4: 'Egg',
    strMeasure4: '1'
  },
  {
    idMeal: 'kh2',
    strMeal: 'Beef Lok Lak (ឡុកឡាក់សាច់គោ)',
    strCategory: 'Beef',
    strArea: 'Cambodian',
    strMealThumb: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    price: 9.99,
    rating: 4.9,
    isKhmer: true,
    strInstructions: 'Stir-fry marinated beef cubes rapidly over high heat. Serve over bed of lettuce, tomatoes, cucumbers, and a lime pepper dipping sauce.',
    strIngredient1: 'Beef Tenderloin',
    strMeasure1: '250g',
    strIngredient2: 'Oyster Sauce',
    strMeasure2: '2 tbsp',
    strIngredient3: 'Lime & Black Pepper Sauce',
    strMeasure3: '1 bowl'
  },
  {
    idMeal: '1',
    strMeal: 'Spaghetti Carbonara',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    price: 14.99,
    rating: 4.9,
    isNew: true
  },
  {
    idMeal: '2',
    strMeal: 'Chicken Curry',
    strCategory: 'Chicken',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/qptpvt1511819742.jpg',
    price: 12.99,
    rating: 4.7
  },
  {
    idMeal: '3',
    strMeal: 'Beef Wellington',
    strCategory: 'Beef',
    strArea: 'British',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/vvpprx1487328119.jpg',
    price: 24.99,
    rating: 4.8
  },
  {
    idMeal: '4',
    strMeal: 'Pancakes',
    strCategory: 'Dessert',
    strArea: 'American',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ryspuw1511786688.jpg',
    price: 8.99,
    rating: 4.6
  },
  {
    idMeal: '5',
    strMeal: 'Salmon Teriyaki',
    strCategory: 'Seafood',
    strArea: 'Japanese',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xxyupu1511811513.jpg',
    price: 18.99,
    rating: 4.9
  }
]

// ==========================================
// 3. BANK PAYMENT API ENDPOINTS (QR CODE)
// ==========================================

// Ask your backend to generate the Bank QR string (EMVCo format)
export const createQrPayment = async (orderId, amount) => {
  try {
    const response = await fetch(`${PAYMENT_BASE}/payments/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, amount })
    })
    if (!response.ok) throw new Error('Failed to create QR payment')
    return await response.json()
  } catch (error) {
    console.error('Payment API Error:', error)
    return null
  }
}


export const checkPaymentStatus = async (orderId) => {
  try {
    const response = await fetch(`${PAYMENT_BASE}/payments/status/${orderId}`)
    if (!response.ok) throw new Error('Failed to check payment status')
    return await response.json()
  } catch (error) {
    console.error('Status Check Error:', error)
    return null
  }
}
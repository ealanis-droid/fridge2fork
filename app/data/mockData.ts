/**
 * Type Definitions
 * These types define the core data structures used throughout the app.
 */

// Represents a recipe with all its details
export type Recipe = {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
};

// Represents an ingredient in the user's pantry
export type Ingredient = {
  id: string;
  name: string;
  category: string;
  active?: boolean;
};

// Represents a dietary preference and its excluded ingredients
export type DietaryPreference = {
  id: string;
  name: string;
  excludedIngredients: string[];
};

// Represents a user profile
export type User = {
  name: string;
  email: string;
};

/**
 * Mock Data
 * This section contains all the demo data used in the app.
 */

// Demo user credentials
export const MOCK_USERS: { email: string; password: string }[] = [
  { email: "test", password: "test" },
];

// Default user profile
export const DEFAULT_USER: User = {
  name: "John Doe",
  email: "john@example.com",
};

// Default pantry ingredients that are initialized on first login
export const DEFAULT_PANTRY_INGREDIENTS: Ingredient[] = [
  { id: "1", name: "Onion", category: "vegetables" },
  { id: "2", name: "Garlic", category: "vegetables" },
  { id: "3", name: "Rice", category: "grains" },
  { id: "4", name: "Tomatoes", category: "vegetables" },
  { id: "5", name: "Olive Oil", category: "oils" },
  { id: "6", name: "Salt", category: "seasonings" },
  { id: "7", name: "Black Pepper", category: "seasonings" },
  { id: "8", name: "Chicken", category: "protein" },
  { id: "9", name: "Eggs", category: "protein" },
  { id: "10", name: "Soy Sauce", category: "seasonings" },
];

// Available dietary preferences and their excluded ingredients
export const DIETARY_PREFERENCES: DietaryPreference[] = [
  {
    id: "vegetarian",
    name: "Vegetarian",
    excludedIngredients: ["Chicken", "Beef", "Pork", "Fish"],
  },
  {
    id: "vegan",
    name: "Vegan",
    excludedIngredients: [
      "Chicken",
      "Beef",
      "Pork",
      "Fish",
      "Eggs",
      "Milk",
      "Cheese",
      "Yogurt",
      "Butter",
    ],
  },
  {
    id: "pescatarian",
    name: "Pescatarian",
    excludedIngredients: ["Chicken", "Beef", "Pork"],
  },
  {
    id: "dairy-free",
    name: "Dairy Free",
    excludedIngredients: ["Milk", "Cheese", "Yogurt", "Butter"],
  },
];

// Collection of available recipes with their full details
export const MOCK_RECIPES: { [key: string]: Recipe } = {
  "1": {
    id: "1",
    name: "Spanish Paella",
    description: "Classic Spanish rice dish with saffron and mixed proteins",
    image: "https://picsum.photos/200",
    ingredients: [
      "Rice",
      "Chicken",
      "Onion",
      "Garlic",
      "Tomatoes",
      "Olive Oil",
      "Salt",
      "Black Pepper",
      "Saffron",
    ],
    steps: [
      "Heat olive oil in a large paella pan",
      "Sauté onions and garlic until translucent",
      "Add chicken and cook until browned",
      "Add rice and toast lightly",
      "Add tomatoes and saffron-infused broth",
      "Simmer until rice is cooked",
      "Let rest before serving",
    ],
    time: "45 mins",
    difficulty: "Medium",
    servings: 6,
  },
  "2": {
    id: "2",
    name: "Chinese Fried Rice",
    description: "Quick and flavorful wok-fried rice with vegetables",
    image: "https://picsum.photos/201",
    ingredients: [
      "Rice",
      "Eggs",
      "Onion",
      "Garlic",
      "Soy Sauce",
      "Salt",
      "Black Pepper",
      "Carrots",
      "Peas",
    ],
    steps: [
      "Cook rice and let it cool",
      "Scramble eggs and set aside",
      "Stir-fry vegetables until tender",
      "Add rice and soy sauce",
      "Mix in scrambled eggs",
      "Season to taste",
      "Serve hot",
    ],
    time: "20 mins",
    difficulty: "Easy",
    servings: 4,
  },
  "3": {
    id: "3",
    name: "Italian Chicken Cacciatore",
    description: "Rustic Italian chicken stew with tomatoes and herbs",
    image: "https://picsum.photos/202",
    ingredients: [
      "Chicken",
      "Tomatoes",
      "Onion",
      "Garlic",
      "Olive Oil",
      "Salt",
      "Black Pepper",
      "Herbs",
      "Wine",
    ],
    steps: [
      "Brown chicken pieces in olive oil",
      "Sauté onions and garlic",
      "Add tomatoes and wine",
      "Season with herbs and spices",
      "Simmer until chicken is tender",
      "Adjust seasoning",
      "Serve with pasta or bread",
    ],
    time: "60 mins",
    difficulty: "Medium",
    servings: 4,
  },
  "4": {
    id: "4",
    name: "Japanese Oyakodon",
    description: "Comforting chicken and egg rice bowl",
    image: "https://picsum.photos/203",
    ingredients: [
      "Chicken",
      "Eggs",
      "Rice",
      "Onion",
      "Soy Sauce",
      "Salt",
      "Black Pepper",
      "Dashi",
      "Mirin",
    ],
    steps: [
      "Cook rice",
      "Simmer chicken in dashi and soy sauce",
      "Add onions and cook until tender",
      "Pour beaten eggs over the top",
      "Cover and cook until eggs are set",
      "Serve over hot rice",
      "Garnish with green onions",
    ],
    time: "25 mins",
    difficulty: "Easy",
    servings: 2,
  },
  "5": {
    id: "5",
    name: "Indian Biryani",
    description: "Aromatic rice dish with spiced chicken",
    image: "https://picsum.photos/204",
    ingredients: [
      "Rice",
      "Chicken",
      "Onion",
      "Garlic",
      "Tomatoes",
      "Salt",
      "Black Pepper",
      "Yogurt",
      "Spices",
    ],
    steps: [
      "Marinate chicken in yogurt and spices",
      "Cook rice partially",
      "Layer rice and chicken mixture",
      "Add saffron milk",
      "Steam until fully cooked",
      "Let rest before serving",
      "Garnish with fried onions",
    ],
    time: "60 mins",
    difficulty: "Hard",
    servings: 6,
  },
  "6": {
    id: "6",
    name: "Greek Souvlaki",
    description: "Grilled chicken skewers with Mediterranean flavors",
    image: "https://picsum.photos/205",
    ingredients: [
      "Chicken",
      "Olive Oil",
      "Garlic",
      "Salt",
      "Black Pepper",
      "Lemon",
      "Oregano",
      "Yogurt",
    ],
    steps: [
      "Marinate chicken in olive oil and herbs",
      "Thread onto skewers",
      "Preheat grill",
      "Grill until cooked through",
      "Make tzatziki sauce",
      "Warm pita bread",
      "Serve with salad",
    ],
    time: "40 mins",
    difficulty: "Easy",
    servings: 4,
  },
  "7": {
    id: "7",
    name: "Mexican Rice Bowl",
    description: "Spicy rice bowl with chicken and fresh tomatoes",
    image: "https://picsum.photos/206",
    ingredients: [
      "Rice",
      "Chicken",
      "Tomatoes",
      "Onion",
      "Garlic",
      "Salt",
      "Black Pepper",
      "Cilantro",
      "Lime",
    ],
    steps: [
      "Cook rice with tomatoes and spices",
      "Grill seasoned chicken",
      "Prepare fresh salsa",
      "Slice chicken",
      "Assemble bowls",
      "Garnish with cilantro",
      "Serve with lime wedges",
    ],
    time: "35 mins",
    difficulty: "Easy",
    servings: 4,
  },
  "8": {
    id: "8",
    name: "Korean Egg Rice",
    description: "Simple but delicious rice bowl with fried egg",
    image: "https://picsum.photos/207",
    ingredients: [
      "Rice",
      "Eggs",
      "Soy Sauce",
      "Salt",
      "Black Pepper",
      "Sesame Oil",
      "Seaweed",
    ],
    steps: [
      "Cook rice",
      "Fry eggs sunny side up",
      "Season with sesame oil",
      "Add soy sauce",
      "Top with seaweed",
      "Mix before eating",
      "Enjoy while hot",
    ],
    time: "15 mins",
    difficulty: "Easy",
    servings: 1,
  },
  "9": {
    id: "9",
    name: "Middle Eastern Shakshuka",
    description: "Eggs poached in spiced tomato sauce",
    image: "https://picsum.photos/208",
    ingredients: [
      "Eggs",
      "Tomatoes",
      "Onion",
      "Garlic",
      "Olive Oil",
      "Salt",
      "Black Pepper",
      "Cumin",
      "Paprika",
    ],
    steps: [
      "Sauté onions and garlic",
      "Add tomatoes and spices",
      "Simmer sauce until thickened",
      "Create wells for eggs",
      "Crack eggs into wells",
      "Cover and cook eggs",
      "Serve with bread",
    ],
    time: "30 mins",
    difficulty: "Medium",
    servings: 4,
  },
  "10": {
    id: "10",
    name: "Thai Basil Chicken",
    description: "Spicy stir-fried chicken with holy basil",
    image: "https://picsum.photos/209",
    ingredients: [
      "Chicken",
      "Garlic",
      "Soy Sauce",
      "Salt",
      "Black Pepper",
      "Thai Basil",
      "Chili",
      "Rice",
    ],
    steps: [
      "Mince chicken and garlic",
      "Heat wok until very hot",
      "Stir-fry garlic and chilies",
      "Add chicken and sauce",
      "Cook until done",
      "Stir in basil leaves",
      "Serve over rice",
    ],
    time: "20 mins",
    difficulty: "Medium",
    servings: 2,
  },
};

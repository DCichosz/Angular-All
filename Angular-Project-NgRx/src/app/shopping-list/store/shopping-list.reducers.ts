import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export interface AppState {
	shoppingList: State;
}

export interface State {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientIndex: number;
}

const initialState: State = {
	ingredients: [new Ingredient('Jabłka', 5), new Ingredient('Pomidory', 10)],
	editedIngredient: null,
	editedIngredientIndex: -1
};

export function shoppingListReducer(
	state = initialState,
	action: ShoppingListActions.ShoppingListActions
) {
	switch (action.type) {
		case ShoppingListActions.ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload]
			};
		case ShoppingListActions.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: [...state.ingredients, ...action.payload]
			};
		case ShoppingListActions.UPDATE_INGREDIENT:
			const ingredient = state.ingredients[state.editedIngredientIndex];
			const updatedIngredient = {
				...ingredient,
				...action.payload.ingredient
			};
			const ingredients = [...state.ingredients];
			ingredients[state.editedIngredientIndex] = updatedIngredient;
			return {
				...state,
				ingredients: ingredients
			};
		case ShoppingListActions.DELETE_INGREDIENT:
			const oldIngredients = [...state.ingredients];
			ingredients.splice(state.editedIngredientIndex, 1);
			return {
				...state,
				ingredient: oldIngredients
			};
		case ShoppingListActions.START_EDIT:
			const editetIngredient = { ...state.ingredients[action.payload] };
			return {
				...state,
				editedIngredient: editetIngredient,
				editedIngredientIndex: action.payload
			};
		default:
			return state;
	}
}

import { Ingredient } from '../../shared/ingredients.model';

import * as ShoppingListActions from './shopping-list.actions';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState = {
	ingredients: [new Ingredient('Jabłka', 5), new Ingredient('Pomidory', 10)]
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
			const ingredient = state.ingredients[action.payload.index];
			const updatedIngredient = {
				...ingredient,
				...action.payload.ingredient
			};
			const ingredients = [...state.ingredients];
			ingredients[action.payload.index] = updatedIngredient;
			return {
				...state,
				ingredients: ingredients
			};
		case ShoppingListActions.DELETE_INGREDIENT:
			const oldIngredients = [...state.ingredients];
			ingredients.splice(action.payload, 1);
			return {
				...state,
				ingredient: oldIngredients
			};
		default:
			return state;
	}
}

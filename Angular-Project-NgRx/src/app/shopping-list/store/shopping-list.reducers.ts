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
		default:
			return state;
	}
}

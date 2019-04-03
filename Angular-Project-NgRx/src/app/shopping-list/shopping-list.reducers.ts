import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredients.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState = {
	ingredients: [new Ingredient('Jabłka', 5), new Ingredient('Pomidory', 10)]
};

export function shoppingListReducer(state = initialState, action: Action) {
	switch (action.type) {
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients]
			};
	}
	return state;
}

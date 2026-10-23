import * as model from './model.js';
import recipeView from './views/RecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    // 1. Obtener el ID de la URL (hash)
    const id = window.location.hash.slice(1);
    
    // 2. Si no hay ID, detenemos la ejecución (evita el error inicial)
    if (!id) return;

    // 3. Mostrar el spinner de carga en la vista
    recipeView.renderSpinner();

    // 4. Cargar la receta en el modelo a través de la API
    await model.loadRecipe(id);

    // 5. Renderizar la receta usando la vista
    recipeView.render(model.state.recipe);

  } catch (err) {
    alert(err);
  }
};

// 6. Manejo dinámico de eventos para la carga inicial y el cambio de hash en los enlaces
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
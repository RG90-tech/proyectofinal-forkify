import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/ResultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1. Cargando la receta
    await model.loadRecipe(id);

    // 2. Renderizando la receta
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1. Obtener la consulta y validar primero si está vacía
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Mostrar el spinner solo si SÍ hay una consulta válida
    resultsView.renderSpinner();

    // 3. Cargar los resultados de búsqueda
    await model.loadSearchResults(query);

    // 4. Renderizar los resultados (usando getSearchResultsPage)
    resultsView.render(model.getSearchResultsPage(1));

    // 5. Renderizar los botones de paginación iniciales
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1. Renderizar NUEVOS resultados
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Renderizar NUEVOS botones de paginación
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();

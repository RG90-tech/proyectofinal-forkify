import icons from '../img/icons.svg'; // Paso 21: Importar los íconos

const recipeContainer = document.querySelector('.recipe');

// Paso 23: Función para renderizar el spinner de carga
const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = ''; // Limpiar contenedor
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

// Paso 15 y siguientes: Función principal para buscar y mostrar la receta
const showRecipe = async function () {
  try {
    // Paso 23d: Mostrar el spinner al iniciar la carga
    renderSpinner(recipeContainer);

    // 15a y 15b: Petición a la API y conversión a JSON
    const resp = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await resp.json();

    // 15c: Enviar a la consola los resultados
    console.log(resp, data);

    // 15j & 15k: Desestructuración y mapeo del objeto recipe
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // 16 y 17: Creación del template string con la información de la receta
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg>
            <use href="${icons}#icon-bookmark"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          <!-- Paso 20: Mapeo de ingredientes -->
          ${recipe.ingredients
            .map(ing => {
              return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantity ?? ''}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit ?? ''}</span>
                    ${ing.description}
                  </div>
                </li>
              `;
            })
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
          the directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    // 18 y 19: Limpiar el contenedor e insertar el contenido renderizado
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);

  } catch (err) {
    // 15d: Manejo de errores
    alert(err);
  }
};

// 15e: Invocar la función para probar la aplicación
showRecipe();
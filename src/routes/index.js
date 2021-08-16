import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Drinks from '../pages/Drinks';
import Foods from '../pages/Foods';
import Login from '../pages/Login';
import Explorer from '../pages/Explorer';
import ExplorerFood from '../pages/ExplorerFood';
import ExplorerFoodIngredient from '../pages/ExplorerFoodIngredient';
import ExplorerDrink from '../pages/ExplorerDrink';
import ExplorerDrinkIngredient from '../pages/ExplorerDrinkIngredient';
import Perfil from '../pages/Perfil';
import Recipes from '../pages/Recipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeDrinkDetails from '../pages/RecipeDrinkDetails';
import RecipeDrinkInProgress from '../pages/RecipeDrinkInProgress';
import RecipeMealDetails from '../pages/RecipeMealDetails';
import RecipeMealInProgress from '../pages/RecipeMealInProgress';
import ExplorerByArea from '../pages/ExplorerByArea';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/explorar/comidas/area" component={ ExplorerByArea } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/comidas/ingredientes/:ingredient" component={ Foods } />
        <Route exact path="/comidas/:id" component={ RecipeMealDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ RecipeMealInProgress } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/bebidas/ingredientes/:ingredient" component={ Drinks } />
        <Route exact path="/bebidas/:id" component={ RecipeDrinkDetails } />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ RecipeDrinkInProgress }
        />
        <Route exact path="/explorar" component={ Explorer } />
        <Route exact path="/explorar/comidas" component={ ExplorerFood } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorerFoodIngredient }
        />
        <Route exact path="/explorar/bebidas" component={ ExplorerDrink } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorerDrinkIngredient }
        />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ Recipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default Routes;

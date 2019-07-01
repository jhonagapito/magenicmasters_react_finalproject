'use strict';

// Node Dependencies
import React from 'react';
import { BrowserRouter, Router, Route, Switch, IndexRoute } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';

// Page Dependencies
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import TeamManagementPage from './components/TeamManagement/TeamManagementPage';
import Home from './components/Home/Home';
import App from './App';
import Layout from './components/Common/Layout';

// Router Setup
const AppRouter = () => {
    return (
        <div>
            <BrowserRouter basename={'react-playground-app'}>
                <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/pokedex" component={App} />
                    {/* <Route path="/pokemon/:id" component={PokemonDetails} /> */}
                    <Route path="/myteam" component={TeamManagementPage} />
                </Switch>
                </Layout>
            </BrowserRouter>
            <ModalContainer />
        </div>
    );
};

export default AppRouter;
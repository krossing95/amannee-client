import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import News from './components/news/News';
import NotFound from './components/NotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { CssBaseline } from '@material-ui/core';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Header />
        <Switch>
          <Route path='/' exact component={ News } />
          <Route path='*' exact component={ NotFound } />
        </Switch>
      <Footer />
    </Router>
  )
}

export default App;

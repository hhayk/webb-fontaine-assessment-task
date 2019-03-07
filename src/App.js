import React, { Component } from 'react';
import SearchForRepositories from './components/Search/SearchForRepositories';
import AnalyticsForm from './components/Analytics/AnalyticsForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container App">
        <SearchForRepositories />
        <AnalyticsForm />
      </div>
    );
  }
}

export default App;

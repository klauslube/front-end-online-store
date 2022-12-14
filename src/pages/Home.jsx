import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Categories from '../components/Categories';
import Loading from '../components/Loading';
import { getProducts } from '../services/api';
import SearchResults from '../components/searchResults';
import './Home.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      products: [],
      loading: false,
    };
  }

  handleInputChange = async ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: [value],
    });
  }

  fetchProducts = async () => {
    const { inputSearch } = this.state;
    const { onClick } = this.props;
    this.setState({ loading: true });
    const fetchProducts = await getProducts(inputSearch);
    const resultsProducts = fetchProducts.results.map((product) => (
      <SearchResults key={ product.id } product={ product } onClick={ onClick } />
    ));
    this.setState({
      products: resultsProducts,
      loading: false,
    });
  }

  render() {
    const { inputSearch, products, loading } = this.state;
    const { onClick } = this.props;
    return (
      <div className="container">
        <div className="header">
          <header>
            <h1>Frontend-online-store</h1>
          </header>
        </div>
        <div className="forms">
          <h3
            className="search-h3"
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.

          </h3>
          <div>
            <input
              data-testid="query-input"
              placeholder="Busque aqui"
              type="text"
              value={ inputSearch }
              name="inputSearch"
              onChange={ this.handleInputChange }
            />
            <button
              className="search-button"
              type="button"
              data-testid="query-button"
              onClick={ this.fetchProducts }
            >
              Pesquisar

            </button>
          </div>
          <div className="cart">
            <Link
              className="forms"
              data-testid="shopping-cart-button"
              to="/Cart"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="carrinho" width="30px" />
            </Link>
          </div>
        </div>
        <div className="category">
          <div>
            <Categories onClick={ onClick } />
          </div>
        </div>
        <div className="products">
          {loading ? <Loading /> : products }
        </div>

      </div>
    );
  }
}

Home.propTypes = {
  onClick: PropTypes.func.isRequired,
};

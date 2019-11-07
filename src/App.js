import React, { Fragment } from 'react';
import './App.css';
import loading from './img/loading.gif';
import fetchQuote from './fetchQuote';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      quote: '',
      loading: true,
    };

    this.renderText = this.renderText.bind(this);
  }

  async componentDidMount() {
    const quoteObj = await fetchQuote();
    this.setState({ author: quoteObj.author, quote: quoteObj.content, loading: false });
  }

  async renderText() {
    this.setState({ loading: true, quote: '', author: '' });
    let { content, author } = await fetchQuote();
    const showText = (text, key, index) => {
      if (index < text.length) {
        this.setState({ [key]: this.state[key] + text[index++] });
        setTimeout(() => showText(text, key, index), 20);
      }
    };
    this.setState({ loading: false });
    showText(content, 'quote', 0);
    showText(author, 'author', 0);
  }

  render() {
    return (
      <div id="quote-box">
        {this.state.loading ? (
          <img className="spinner" src={loading} alt="loading" />
        ) : (
          <Fragment>
            <h1 id="text">{this.state.quote}</h1>
            <p id="author">{'- ' + this.state.author}</p>
          </Fragment>
        )}
        <div className="button-cont">
          <button id="tweet-quote" className="button">
            Tweet
          </button>
          <button id="new-quote" className="button" onClick={this.renderText}>
            New quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;

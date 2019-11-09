import React from 'react';
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
      fontIndex: 0,
    };

    document.body.className += ' js-loading';
    window.addEventListener('load', this.showPage, false);

    this.showPage = this.showPage.bind(this);
    this.renderText = this.renderText.bind(this);
  }

  showPage() {
    document.body.className = document.body.className.replace('js-loading', '');
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
    let fontIndex = Math.floor(Math.random() * 7);
    this.setState({ loading: false, fontIndex });
    showText(content, 'quote', 0);
    showText(author, 'author', 0);
  }

  render() {
    const fontPairs = [
      ['Yeon Sung, cursive', 'Roboto, sans-serif'],
      ['McLaren, cursive', 'Open Sans, sans-serif'],
      ['Supermercado One, cursive', 'Open Sans, sans-serif'],
      ['Rubik, sans-serif', 'Roboto, sans-serif'],
      ['Lobster, cursive', 'Roboto, sans-serif'],
      ['Indie Flower, cursive', 'Open Sans, sans-serif'],
      ['Sunshiney, cursive', 'Lato, sans-serif'],
    ];

    let [quoteFont, bodyFont] = fontPairs[this.state.fontIndex];

    return (
      <>
        <div id="quote-box">
          {this.state.loading ? (
            <img className="spinner" src={loading} alt="loading" />
          ) : (
            <div className="quote-cont">
              <h1 id="text" style={{ fontFamily: quoteFont }}>
                <span className="symbol">"</span>
                {this.state.quote}
              </h1>
              <p id="author" style={{ fontFamily: bodyFont }}>
                {'- ' + this.state.author}
              </p>
            </div>
          )}
        </div>
        <div className="button-cont" style={{ fontFamily: bodyFont }}>
          <a
            href={`https://twitter.com/intent/tweet?text=${this.state.quote}++-+${this.state.author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button id="tweet-quote" className="button">
              <i className="tweet-icon"></i>
            </button>
          </a>
          <button id="new-quote" className="button" onClick={this.renderText}>
            New quote
          </button>
        </div>
        <a href="#footer" className="heart">
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </a>
        <footer id="footer" style={{ fontFamily: bodyFont }}>
          <span>With</span>
          <span>
            by <a href="#top">Suheyb</a>
          </span>
        </footer>
      </>
    );
  }
}

export default App;

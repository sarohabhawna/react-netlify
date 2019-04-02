import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import marked from 'marked';

class Home extends Component {
    constructor () {
        super();
        this.state = {
            markdown: '',
            title: ''
        }
    }
    componentDidMount() {
        const mdPath = require("./test.md");

        fetch(mdPath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                this.setState({
                    markdown: marked(text)
                })
            });

    }

    componentDidUpdate(previousState) {
        if (this.state !== previousState) {
            let { markdown: mdData } = this.state;
            let stringTitleSearchPattern = /title:/i;
            let indexOfTitle = mdData.search(stringTitleSearchPattern);
            let titleToEndFile = mdData.substr(indexOfTitle);
            let lineBreak = /\n/;
            let lineBreakIndex = titleToEndFile.search(lineBreak);
            let startIndex = 7;
            let endIndex = lineBreakIndex - 5;
            let title = titleToEndFile.substring(startIndex, endIndex);

            if (title !== this.state.title) {
                this.setState({ title })
            } else {
                return;
            }
        }
    }

    render() {
        const { markdown, title } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={ logo } className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
          </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
          </a>
                    <Link className="App-link" to="/invalid">Invalid Route</Link>
                    <p>
                        <a className="App-link" href="/admin/">NetlifyCMS Admin</a>
                    </p>
                    <section>
                        <article>
                            <h1>{ title }</h1>
                            <div dangerouslySetInnerHTML={{__html: markdown}}></div>
                        </article>
                    </section>
                </header>
            </div>
        );
    }
}

export default Home;
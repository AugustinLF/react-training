import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import getUniqueKeywords from './helpers/getUniqueKeywords';
import ContactList from './contactList';
import Filters from './filters/filters';
import hasContactKeywords from './helpers/hasContactKeywords';

import contacts from '../../practice/day1/mockData';

class App extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
    };

    state = {
        selectedKeywords: [],
    };

    addKeyword = (keyword) => {
        const isAlreadySet = this.state.selectedKeywords.includes(keyword);
        if (!isAlreadySet)
            this.setState({selectedKeywords: this.state.selectedKeywords.concat([keyword])});
    }

    removeKeyword = (keywordToRemove) => {
        this.setState({
            selectedKeywords: this.state.selectedKeywords.filter(
                keyword => keyword !== keywordToRemove,
            ),
        });
    }

    render() {
        const {
            contacts,
        } = this.props;

        const filteredContacts = contacts.filter(
            contact => hasContactKeywords(contact, this.state.selectedKeywords),
        );

        return (
            <div>
                <h1>My contacts</h1>
                <Filters
                    keywords={getUniqueKeywords(contacts)}
                    selectedKeywords={this.state.selectedKeywords}
                    addKeyword={this.addKeyword}
                    removeKeyword={this.removeKeyword}
                />
                <ContactList list={filteredContacts} />
            </div>
        );
    }
}

ReactDOM.render(
    <App contacts={contacts} />,
    document.getElementById('root'),
);

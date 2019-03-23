import React, { Component } from 'react';
import List from './List'
import STORE from './STORE'
import './App.css';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}
class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
    store: STORE,

  }

  handleDeleteItem = (card) => {
    console.log('Card ID', card);
    const {lists, allCards} = this.state.store;

    const newList = lists.map(list => {
      list.cardIds = list.cardIds.filter(id => id !== card);
      return list;
    });

    delete allCards[card];

    this.setState({
      store: {
        allCards,
        lists: newList
      }
    })
  }

  handleAddCard = (listId) => {
    // console.log('id', listId);
    const randomCardInfo = newRandomCard()
    // console.log('randomCardInfo ID', randomCardInfo.id)

    const newList = this.state.store.lists.map(list => {
      if (list.id === listId) {
        list.cardIds.push(randomCardInfo.id);
      }
      return list;
    })

  
    this.setState({
      store: {
        allCards: {
          ...this.state.store.allCards,
          [randomCardInfo.id]: randomCardInfo
        },
        lists: newList 
      }
    })
  }
  
  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.store.allCards[id])}
              onAddCard={this.handleAddCard}
              onDeleteItem={this.handleDeleteItem}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;

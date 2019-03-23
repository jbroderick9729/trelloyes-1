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

  handleDeleteItem() {
    console.log('clicked delete');
  }

  handleAddCard = (id) => {
    console.log('id', id);
    const randomCardInfo = newRandomCard()
          
    // let something = this.state.store.lists.map(item => {
    //   if (item.id === id) {
    //     console.log('item.id',item.id);
    //     console.log(item.cardIds);

    //       [item.cardIds]: [...item.carIds, [randomCardInfo.id]]
    //   }

    // })
  
    this.setState({
      store: {
        allCards: {
          ...this.state.store.allCards,
          [randomCardInfo.id]: randomCardInfo
        },
        lists: something
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

import React, {Component} from 'react';
import CatServices from '../services/cat-services';
import AppHeader from '../app-header';

import './app.css'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [], 
      filter: 'all'
    }

    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }
  componentDidMount() {
    this.update();
  }

  catService = new CatServices();

  addItem(item) {
    const newItem = {
      url: item.url,
      id: item.id,
      liked: false,
    }
    return this.state.data.push(newItem);
  }

  update() {
    this.catService.getResource()
      .then(elem => {
        elem.forEach(item => {
          this.setState(() => this.addItem(item));
        })
      })
  }

  onToggleLiked(id) {
    this.setState(({data}) => {
      const index = data.findIndex(item => item.id === id);
      const old = data[index];
      const newItem = {...old, liked: !old.liked};

      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      
      return {
        data: newArr,
      }
    })
  }

  filterPost(items, filter) {
    if (filter === 'liked') {
      return items.filter(item => item.liked);
    } else {
      return items;
    }
  }

  onFilterSelect(filter) {
    this.setState({filter});
  }

  render() {
    const {data, filter} = this.state;
    const likedPosts = this.filterPost(data, filter);
    const images = likedPosts.map(({url, id, liked}) => {
      let classNames = 'app__list-item';

      if (liked) {
        classNames += ' app__list-item--like';
      }

      return (
        <li className={classNames} key={id}>
          <img src={url} id={id} width='225' height='225' alt=''></img>
          <button 
            type='button' 
            className='app__btn'
            onClick={() => this.onToggleLiked(id)}
          />
        </li>
      )
    })
    return (
      <div>
        <AppHeader
          filter={filter}
          onFilterSelect={this.onFilterSelect}
        />        
        <ul className='app__list'>
          {images}
        </ul>
      </div>
    )
  }
}
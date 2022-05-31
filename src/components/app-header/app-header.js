import React, {Component} from 'react';

import './app-header.css'

export default class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.buttons = [
      {name: 'all', label: 'Все котики'},
      {name: 'liked', label: 'Любимые котики'}
    ]
  }

  render() {
    const buttons = this.buttons.map(({name, label}) => {
      const {filter, onFilterSelect} = this.props;
      const active = filter === name;
      const clazz = active ? 'select' : '';

      return (
        <button 
          className={clazz}
          key={name} 
          type='button'
          onClick={() => onFilterSelect(name)}
        >
          {label}
        </button>
      )
    })

    return (
      <header className='app-header'>
        <div className='app-header__container'>
        {buttons}
        </div>
      </header>
    )
  }
}
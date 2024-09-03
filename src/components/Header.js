import PropTypes from 'prop-types'
import React, { useState } from 'react';

function Header() {
  const [title, setTitle] = useState('Todo List');
  return (
    <header>
        <h1>{title}</h1>
    </header>
  )
}

export default Header;
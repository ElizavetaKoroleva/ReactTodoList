import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context';
import deleteLogo from '../../delete.png';

function TodoItem({todo, index, onChange}) {
    const classes = [];
    const { removeTodo } = useContext(Context);

    if (todo.complited) {
        classes.push('done');
    }

    return(
        <li className="todo-item">
            <span className="todo-item__container">
                <input type="checkbox" className="todo-item__checkbox" 
                       onChange={() => onChange(todo.id)}
                       checked={todo.complited}/>
                <p className={classes.join(' ').concat(" todo-item__text")}>
                    {todo.title}
                </p>
            </span>
            <button type="button" className="todo-item__button" onClick={removeTodo.bind(null, todo.id)}>
                <img src={deleteLogo} alt="Delete" className="todo-item__image"></img>
            </button>
        </li>
    );
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;
import React from "react";


const ReadOnlyRow = ({book, handleEdit, handleDelete}) => {
    return (
            <tr>
                <td>{book.name}</td>
                <td>{book.genre}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.pages}</td>
                <td>
                    <button className="table-button" type="button" onClick={e => {handleEdit(e,book)}}>Edit</button>
                    <button className="table-button" type="button" onClick={ () => handleDelete(book.id)}>Delete</button>
                </td>
            </tr>
    )
}

export default ReadOnlyRow;
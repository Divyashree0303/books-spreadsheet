import React from "react";

const EditRow = ({editFormData,handleEditChange, handleCancelClick}) => {
    return(
        <tr>
            <td>
                <input type="text" name='name' value={editFormData.name} required="required" placeholder='Book' onChange={handleEditChange}/>
            </td>
            <td>
                <input type="text" name='genre' value={editFormData.genre} required="required" placeholder='Genre' onChange={handleEditChange}/>
            </td>
            <td>
                <input type="text" name='author' value={editFormData.author} required="required" placeholder='Author' onChange={handleEditChange}/>
            </td>
            <td>
                <input type="text" name='publisher' value={editFormData.publisher} required="required" placeholder='Publisher' onChange={handleEditChange}/>
            </td>
            <td>
                <input type="text" name='pages' value={editFormData.pages} required="required" placeholder='Number of Pages' onChange={handleEditChange}/>
            </td>
            <td>
            <button className="table-button"  type="Submit">Save</button>
            <button className="table-button" type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default EditRow;
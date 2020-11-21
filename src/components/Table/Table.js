// Import modules
import React from 'react';

// Import styles
import './styles/Table.css';

const Table = ({title, headers})=>{
    return(
        <div className='TableContainer'>
            <div className='new'>
                <h2>
                    {title}
                </h2>
                <button>
                    Agregar nuevo
                </button>
            </div>
            <table className='Table'>
                <tr className='TableHead'>
                    {
                        headers.map( (header)=>(
                            <th>
                                {header}
                            </th>
                         ) )
                    }
                </tr>
            </table>
        </div>
    );
}

export default Table;
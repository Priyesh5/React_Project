import React,{useContext} from 'react';

const TableHookComponent = (props) => {


    const deleteStudent=(evt) => {        
        props.emitValue(evt.target.value, 'delete');
    }

    const updateStudent=(row) => {
        
        props.emitValue(row, 'update');
    }

    
    return (
        <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>StudentId</th>
                            <th>StudentName</th>
                            <th>University</th>
                            <th>Course</th>
                            <th>Fees</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.data.map((s,i) => (
                                <tr key={i}>
                                    <td>{s.StudentId}</td>
                                    <td>{s.StudentName}</td>
                                    <td>{s.University}</td>
                                    <td>{s.Course}</td>
                                    <td>{s.Fees}</td>
                                    <td><button name="update" className="btn btn-warning" value={s.StudentId} onClick={() => updateStudent(s)}>Update</button></td>
                                    <td><button name="delete" className="btn btn-danger" value={s.StudentId} onClick={deleteStudent}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
    );
}

export default TableHookComponent;
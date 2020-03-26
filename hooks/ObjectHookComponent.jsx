import React, {useState} from 'react';
import {Universities, Courses} from'./../models/constants';
import SelectHookComponent from './SelectHookComponent';
import TableHookComponent from './TableHookComponent';

const ObjectHookComponent=() => {

    const [student, updateStudent] = useState({StudentId:0, StudentName:'', University:'Amravati', Course:'IT', Fees:0});
    const [students, Students] = useState([]);
    const setCourseValue=(value) =>   {
        updateStudent({...student, Course: value});
    }

    const setUniversityValue=(value) =>   {
        updateStudent({...student, University: value});
    }

    const clear=() => {
        updateStudent({StudentId:0, StudentName:'', University:'Amravati', Course:'IT', Fees:0});
    }

    const save=() => {
        let index;
        let updated = false;
        console.log(students);
        students.map((d,i) => {
            if(d.StudentId === student.StudentId)   {
                index = i;
                updated=true;
            }
        });
        
        if(updated == true)    {
            let data = [...students]
            data[index] = {StudentId: student.StudentId, StudentName: student.StudentName, University: student.University, Course: student.Course, Fees: student.Fees};
            Students(data);            
        }else    {
        Students([...students, {StudentId: student.StudentId, StudentName: student.StudentName, University: student.University, Course: student.Course, Fees: student.Fees}]);
        }
        clear();
    }

    const handleTableComp=(row, option) => {
            console.log(row);
            if(option === 'delete') {
                let index;
                students.map((d,i) => {
                    if(d.StudentId === parseInt(row))
                        index=i;
                });
                let data = [...students];
                data.splice(index, 1);
                Students(data);
            }
            else {
                updateStudent({StudentId: row.StudentId, StudentName: row.StudentName, University: row.University, Course: row.Course, Fees: row.Fees});                
            }
    }


    return (
        <div className="container">
            <div className="form-group">
                <label>Student Id</label>
                <input type="text" className="form-control" value={student.StudentId} onChange={(evt) => updateStudent({...student, StudentId: parseInt(evt.target.value)})}/>
            </div>
            <div className="form-group">
                <label>Student Name</label>
                <input type="text" className="form-control" value={student.StudentName} onChange={(evt) => updateStudent({...student, StudentName: evt.target.value})}/>
            </div>
            <div className="form-group">
                <label>University</label>
                <SelectHookComponent data={Universities} emitValue={setUniversityValue}></SelectHookComponent>
            </div>
            <div className="form-group">
                <label>Course</label>
                <SelectHookComponent data={Courses} emitValue={setCourseValue}></SelectHookComponent>
            </div>
            <div className="form-group">
                <label>Fees</label>
                <input type="text" className="form-control" value={student.Fees} onChange={(evt) => updateStudent({...student, Fees: parseInt(evt.target.value)})}/>
            </div>
            <div className="form-group">
                <input type="button" value="New" className="btn btn-primary" onClick={clear}/>
                <input type="button" value="Save" className="btn btn-success" onClick={save}/>
            </div>
            <TableHookComponent data={students} emitValue={handleTableComp}></TableHookComponent>
        </div>
    );

}


export default ObjectHookComponent;
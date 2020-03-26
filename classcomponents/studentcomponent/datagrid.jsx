import React, { Component } from 'react';
import Logic from '../../models/logic';

class DatagridAppComponent extends Component {
    constructor(props) {
        super(props);
        this.logic = new Logic();
        this.state = { 
            student: {},
            students: [],
            rowcheckbox: [],
            maincheckbox: false,
            displayTable: 'table',
            deleteSelectedStudents: []
         }
    }

    handleRowClick=(d)=> {
        this.props.dataValues(d)  
    }

    checkRecordsIsEmpty(records) {
        if(records.length === 0)  {
            this.setState({displayTable: 'none'});
        }
    }

    deleteStudent(evt)  {
        console.log("Hello" + evt.target.value);
        console.log(this.props.studentData);
        let studs = this.logic.deleteStudent(parseInt(evt.target.value));        
        this.setState({students: studs});
        console.log(studs);
        this.checkRecordsIsEmpty(studs);
    }



    deleteSelectedSt(evt)   {
        let indexes = this.state.deleteSelectedStudents;
        if(indexes.length == 0)
            return;
        console.log(indexes);
        let studs;
        for(var i in indexes)   {
            studs = this.logic.deleteStudent(parseInt(indexes[i]));
        }
        let checkboxValues=[];
        for(let i=0;i < studs.length;i++) {
            checkboxValues.push(false);
        }
        this.setState({rowcheckbox: checkboxValues});
        this.setState({students: studs});
        this.setState({deleteSelectedStudents: []});
        this.checkRecordsIsEmpty(studs);
        this.setState({maincheckbox: false});
    }

    mainCheckBox(evt) { 
        this.setState({maincheckbox: evt.target.checked});
        let indexes = this.state.deleteSelectedStudents;
        let checkBoxes = this.state.rowcheckbox;
        let listStudents = this.state.students;
        for(var i in checkBoxes) {
            if(checkBoxes[i] !== evt.target.checked)
                checkBoxes[i] = evt.target.checked;
            if(!indexes.includes(listStudents[i].StudentId.toString()) && evt.target.checked)
                indexes.push(listStudents[i].StudentId.toString());
        }
        if(!evt.target.checked)
            indexes = [];
        this.setState({rowcheckbox: checkBoxes});
        this.setState({deleteSelectedStudents: indexes});
    }

    handleCheckBox(evt) {
        let checkboxValue = this.state.rowcheckbox;
        let deleteList = this.state.deleteSelectedStudents;
        if(evt.target.checked === true) {
            deleteList.push(evt.target.value);
        }
        else    {
            deleteList.splice(deleteList.indexOf(evt.target.value),1);
        }
        
        this.setState({deleteSelectedStudents: deleteList});
        checkboxValue[parseInt(evt.target.id)] = evt.target.checked;        
        this.setState({rowcheckbox: checkboxValue});
    }

    getSortOrder(attr)  {
        return function(a,b) {
            if (a[attr] > b[attr]) {  
            return 1;  
        } else if (a[attr] < b[attr]) {  
            return -1;  
        }  
        return 0; 
    }
    }

    sortStudentsData(option, sortOption)    {
        let data = this.state.students;
        data.sort(this.getSortOrder([option]));
        if(sortOption === 'desc')
            data.reverse();
        this.setState({students: data});
    }

    handleSort(evt)    {
        if(evt.target.className === 'btn btn-warning'){
            this.sortStudentsData(evt.target.id, 'asc');
            console.log(evt.target.id + "Ascendings");
        }
            
        if(evt.target.className === 'btn btn-primary')
            this.sortStudentsData(evt.target.id, 'desc');
    }


    componentDidMount=() => {
        let studentsList = this.logic.getStudents();
        
        this.setState({students: studentsList});
        let checkboxValue = [];
        for(let i=0;i < studentsList.length;i++) {
            checkboxValue.push(false);
        }
        this.setState({rowcheckbox: checkboxValue});
        if(studentsList.length !== 0) {
            this.setState({displayTable: 'table'});
        }
    }

    componentDidUpdate=() => {
        if(this.props.studentData !== this.state.student)   {
            this.setState({student: this.props.studentData});
            console.log(this.props.studentData);
            
            if(Object.keys(this.props.studentData).length !== 0)    {
                let studs = this.logic.addStudent(this.props.studentData);
                this.setState({displayTable: 'table'});
                this.setState({students:  studs});
            }
        }
    }

    


    render() { 
        
        return (
        <table className="table table-bordered table-striped" style={{display: this.state.displayTable}}>
                    <thead>
                        <tr>
                            <th>
                                StudentId
                                <input type="button" id="StudentId" value="Sort" className="btn btn-warning" onClick={this.handleSort.bind(this)}/>
                                <input type="button" id="StudentId" value="Rev" className="btn btn-primary" onClick={this.handleSort.bind(this)}/>                            
                            </th>
                            <th>
                                StudentName
                                <input type="button" id="StudentName" value="Sort" className="btn btn-warning" onClick={this.handleSort.bind(this)}/>
                                <input type="button" id="StudentName" value="Rev" className="btn btn-primary" onClick={this.handleSort.bind(this)}/>
                            </th>
                            <th>
                                University
                                <input type="button" id="University" value="Sort" className="btn btn-warning" onClick={this.handleSort.bind(this)}/>
                                <input type="button" id="University" value="Rev" className="btn btn-primary" onClick={this.handleSort.bind(this)}/>
                            </th>
                            <th>
                                Course
                                <input type="button" id="Course" value="Sort" className="btn btn-warning" onClick={this.handleSort.bind(this)}/>
                                <input type="button" id="Course" value="Rev" className="btn btn-primary" onClick={this.handleSort.bind(this)}/>
                            </th>
                            <th>
                                Fees
                                <input type="button" id="Fees" value="Sort" className="btn btn-warning" onClick={this.handleSort.bind(this)}/>
                                <input type="button" id="Fees" value="Rev" className="btn btn-primary" onClick={this.handleSort.bind(this)}/>
                            </th>
                            <th><div className="custom-control custom-checkbox"><button className="btn btn-primary" onClick={this.deleteSelectedSt.bind(this)}>Delete Selected</button><br/><input type="checkbox" onChange={this.mainCheckBox.bind(this)} checked={this.state.maincheckbox}/></div></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            this.state.students.map((s,i) => (
                                <tr key={i} onClick={() => this.handleRowClick(s)}>
                                    <td>{s.StudentId}</td>
                                    <td>{s.StudentName}</td>
                                    <td>{s.University}</td>
                                    <td>{s.Course}</td>
                                    <td>{s.Fees}</td>
                                    <td ><div className="custom-control custom-checkbox"><input type="checkbox" onChange={this.handleCheckBox.bind(this)}  id={i} checked={this.state.rowcheckbox[i]}  value={s.StudentId}/></div></td>
                                    <td><button className="btn btn-danger" value={s.StudentId} onClick={this.deleteStudent.bind(this)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
        </table>
        );
    }
}
 
export default DatagridAppComponent;

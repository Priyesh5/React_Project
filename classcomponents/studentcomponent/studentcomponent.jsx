import React, { Component } from 'react'

import SelectComponent from './../selectcomponent';

import Logic from './../../models/logic';

import {Universities, Courses} from './../../models/constants';

class StudentComponent extends Component {
    constructor(props) {
        super(props)
        this.logic = new Logic();
        this.state = {
                 StudentId: 0,
                 StudentName: '',
                 University: '',
                 Course: '',
                 Fees: 0,
                 universities: Universities,
                 courses: Courses,
                 students: [],
                 isStudentIdValid: true,
                 isStudentNameValid: true,
                 isFormValid: true
        };
    }

    handleInputs=(evt)=>{
        this.setState({[evt.target.name]: evt.target.value});
        this.validateForm(evt.target.name,evt.target.value);
    };

    handleClear=(evt)=>{
        this.setState({'StudentId':0});
        this.setState({'StudentName':''});
        this.setState({'Fees':0});
    };
    handleSave=(evt)=>{
        let student = {
            StudentId : this.state.StudentId,
            StudentName : this.state.StudentName,
            University : this.state.University,
            Course : this.state.Course,
            Fees : this.state.Fees
        }
        let studs = this.logic.addStudent(student);
        this.setState({'students': studs});
        console.log(JSON.stringify(this.state.students));
    };
    handleDelete=(evt)=>{
        // console.log(this.state.students);
        // console.log("Delete is pressed");
        // console.log("print " + evt.StudentId);
        // let studs = this.logic.deleteStudent(this.state.students,evt);
        // this.setState({'students': studs});
        // console.log(this.state.students);
        let studs = this.logic.deleteStudent(this.state.students,evt);
        this.setState({'students': studs});
    }

    componentDidMount=()=>{
        let studs = this.logic.getStudents();
        this.setState({'students': studs});
    }

    getSelectedUniversity(val) {
        console.log(`Vaule Received from SelectComponent ${val}`);
        this.setState({University: val})
    }
    getSelectedCourse(val) {
        console.log(`Vaule Received from SelectComponent ${val}`);
        this.setState({Course: val})
    }
    validateForm(name,value){
        if(name === 'StudentId'){
            if(parseInt(value) < 0 || value.length > 5 || value === ''){
                this.setState({isStudentIdValid:false});
                this.setState({isFormValid:false});

            } else {
                this.setState({isStudentIdValid:true});
                this.setState({isFormValid:true});
            }
        }
        if(name === 'StudentName'){
            var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            if(value === '' || value.length > 20 || value.match(format)){
                this.setState({isStudentNameValid:false});
                this.setState({isFormValid:false});
            } else {
                this.setState({isStudentNameValid:true});
                this.setState({isFormValid:true});
            }
        }
        if(name === 'Select University'){
            
        }
    }
    rowClick(s){
        console.log(s.StudentId);
        this.setState({'StudentId': s.StudentId});
        this.setState({'StudentName': s.StudentName});
        this.setState({'University': s.University});
        this.setState({'Course': s.Course});
        this.setState({'Fees': s.Fees});
    }
    
    render() {
        return (
            <div className = "container">
                <div className = "form-group" >
                    <label>Student Id</label>
                    <input type="text" name="StudentId" className="form-control" onChange={this.handleInputs.bind(this)}/>
                    <div hidden={this.state.isStudentIdValid} className="alert alert-danger">Student Id is invalid</div>
                </div>
                <div className = "form-group">
                    <label>Student Name</label>
                    <input type="text" name="StudentName" className="form-control" onChange={this.handleInputs.bind(this)}/>
                </div>
                <div hidden={this.state.isStudentNameValid} className="alert alert-danger">Student Name is invalid</div>
                <div className="form-group">
                  <label>University</label>
                  <SelectComponent name="University" data={this.state.University} selectedValue={this.getSelectedUniversity.bind(this)} value={this.state.University} dataSource={this.state.universities}></SelectComponent>
               </div>
               <div className="form-group">
                 <label>Courses</label>
                 <SelectComponent name="Course" data={this.state.Course} selectedValue={this.getSelectedCourse.bind(this)} dataSource={this.state.courses}></SelectComponent>
               </div>
                <div className = "form-group">
                    <label>Fees</label>
                    <input type="text" value={this.state.Fees} name="Fees" className="form-control" onChange={this.handleInputs.bind(this)}/>
                </div>
                <div>
                <input type="button"  value="New" onClick={this.handleClear.bind(this)} className="btn btn-warning"/>
                   <input type="button" value="Save" disabled={!this.state.isFormValid} onClick={this.handleSave.bind(this)} className="btn btn-success"/>
                </div>
                <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Student Id</th>
                        <th>Student Name</th>
                        <th>University</th>
                        <th>Course</th>
                        <th>Fees</th>
                    </tr>
                </thead>
                <tbody>
                {
                         this.state.students.map((s,i) => (
                             <tr key={i} onClick={()=>this.rowClick(s)}>
                                 {/* <input type="checkbox" value={this.state.Fees} name="Chechbox" className="form-control" onChange={this.handleInputs.bind(this)}/> */}
                                <td>{s.StudentId}</td>
                                <td>{s.StudentName}</td>
                                <td>{s.University}</td>
                                <td>{s.Course}</td>
                                <td>{s.Fees}</td>
                                <td><input type="button" value="Delete" onClick={this.handleDelete.bind(this)} className="btn btn-danger"/></td>
                             </tr>
                         ))
                     }
                </tbody>
            </table>
            </div>
    );
}
}
export default StudentComponent;
// here we are calling the method instead of binding it , that means first the onclick is performed and then the function is called as callback, if we had binded it, it will send the row element data 
import { log } from "util";

class Logic{
    constructor(){
        this.students = [
            {StudentId: 101, StudentName: 'Mahesh', University: 'Pune', Course: 'IT', Fees:10000},
            {StudentId: 102, StudentName: 'Tejas', University: 'Amravati', Course: 'IT', Fees:10000},
            {StudentId: 103, StudentName: 'Akash', University: 'Kolhapur', Course: 'IT', Fees:10000}
        ];
    }

    getStudents(){
        return this.students;
    }

    addStudent(student){
        this.students.push(student);
        return this.students;
    }
    deleteStudent(student){
        // console.log(student.StudentId);
        // console.log(studentes);
        // for(var i=0;i<studentes.length;i++){
        //     if(studentes[i].StudentId == student.StudentId){
        //         studentes.splice(i,1);
        //     }
        // }
        for(var i=0;i<this.students.length;i++){
            if(this.students[i].StudentId === student){
                console.log("Prinint" + student);
                this.students.splice(i,1);
            }
        }
        console.log(student);
        console.log(this.students);
        
        // var a = this.students.splice(student,1);
        // console.log(a);
        return this.students;
    
    }
}

export default Logic;
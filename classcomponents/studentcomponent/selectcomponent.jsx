import React, { Component } from 'react';
class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource:[],
        }
    }

    handleChange(evt){
        console.log(evt.target.value);
        this.props.selectedValue(evt.target.value);
    }
    
    render() { 
        return ( 
              <select className="form-control-lg" value={this.props.data} onChange={this.handleChange.bind(this)}>
                 {  
                     this.props.dataSource.map((d,i) => (
                         
                         <option key={i} value={d}>{d}</option>
                     ))
                 }
                </select> 
         );
    }
}
 
export default SelectComponent;
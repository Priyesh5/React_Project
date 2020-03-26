import React,{Component} from 'react';
class ValidationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            setValidId: true,
            setValidName: true,
            setValidFees: true
        }
    }

    validateForm(name, value)   {
        if(name === "StudentId") {         
              
            if(parseInt(value) < 0 || value.length > 5) {                
                if(false !== this.state.setValidId) {
                    this.setState({setValidId: false});
                    this.props.validId(false);
                }
            }
            else{
                if(true !== this.state.setValidId)  {
                    this.setState({setValidId: true});
                    this.props.validId(true);
                }
            }
        }

        if(name === "StudentName")  {
            if(value.length > 20 || !value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value !== '')   {
                if(false !== this.state.setValidName)   {
                    this.setState({setValidName: false});
                this.props.validId(false);
                }
            } 
            else{
                if(true !== this.state.setValidName)    {
                    this.setState({setValidName: true});
                this.props.validId(true);
                }
            }
        }

        if(name === 'Fees') {
            if(!value.toString().match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")) {
                if(false !== this.state.setValidFees)  {
                    this.setState({setValidFees: false})
                    this.props.validId(false);
                }
            }
            else{
                if(true !== this.state.setValidFees)  {
                    this.setState({setValidFees: true})
                    this.props.validId(true);
                }
            }
        }
    }

    render()    {
        this.validateForm(this.props.name, this.props.data);
        if(this.props.name === 'StudentId') { 
            return (
                <div hidden={this.state.setValidId} className="alert alert-danger" style={{'margin-right': '850px' }}>Student Id is not have length greater than 5 </div>
            );
        }
        if(this.props.name === 'StudentName') { 
            return (
                <div hidden={this.state.setValidName} className="alert alert-danger" style={{'margin-right': '850px' }}>Student Name should contain only alphabets or length not greater than 20 </div>
            );
        }

        if(this.props.name === 'Fees')  {
            return (
                <div hidden={this.state.setValidFees} className="alert alert-danger" style={{'margin-right': '850px' }}>Fees should only contain numbers</div>
            );
        }
    }
}

export default ValidationComponent;
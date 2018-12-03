import React from "react";
import Home from "./home"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


import "../styles/create.css"


class CreateFile extends React.Component {
    
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state={
            isFile:false,
            fileName:""
        }
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    CreateFile(){
        this.setState({isFile:true})
    }
    openfileConfirm = () => {
        if (this.state.fileName === ""){
          confirmAlert({
            title:"File name missing",
            message: "You need to enter a valid file name",
            buttons:[
              {
                label:'ok'
              }
            ]

          })
         }else{
        confirmAlert({
          title: 'Confirm to create file',
          message: 'Are you sure creating file as: ' + this.state.fileName,
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.CreateFile()
            },
            {
              label: 'No',
              onClick: () => alert('Create file canceled')
            }
          ]
        })
      }
      };

    render(){
        if(this.state.isFile===false){
            return(
              <div className="everything">
                <div className="title">
                  <h2>Welcome to VNetLab</h2>
                  <h4>To get started, created a file</h4>
                </div>
             
                <div className="form">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">File name: </InputGroupAddon>
                  <Input name="fileName" value={this.state.fileName} onChange={this.handleChange}></Input>
                  <Button onClick={this.openfileConfirm}>Create File</Button>
                </InputGroup>
                <a>Need help?</a>
                </div>
                
              </div>
            );
          }else{
            return(<Home id={this.state.fileName}/>);
           }
        
    }
}

export default CreateFile
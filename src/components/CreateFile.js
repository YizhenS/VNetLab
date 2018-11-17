import React from "react";
import Home from "./home"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
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
              <div>
                <label>File name: </label>
                    <input name="fileName" value={this.state.fileName} onChange={this.handleChange}></input>
                    <button onClick={this.openfileConfirm}>Newfile</button>
              </div>
            );
          }else{
            return(<Home id={this.state.fileName}/>);
           }
        
    }
}

export default CreateFile
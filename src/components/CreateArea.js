import React from "react";
import Draggable, {DraggableCore} from 'react-draggable';
import dragArea from "./dragArea";
import data from '../default.json';
import Popup from 'react-popup';



class CreateArea extends React.Component {
    
  constructor(){
    super();
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addVm = this.addVm.bind(this);
        this.addHub = this.addHub.bind(this);
        this.state={
            VMname:"",
            VMos:"",
            VMversion:"",
            VMsrc:"",
            VMeth:[],
            HubName:"",
            HubSubnet:"",
            HubNetmast:"",
            HubInterface:[]
           
        }
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

    addVm(){
      console.log("add vm")
      console.log(this.state.VMos)
      Object.keys(data).forEach((key)=>{
        if(key === "vm"){
          data[key].push({"name":this.state.VMname,"os":this.state.VMos,"version":this.state.VMversion,"src":this.state.VMsrc,"eth":[]})
        }
      })
      this.setState({VMname:"",VMos:"",VMversion:"",VMsrc:""})
    }
    addHub(){
      console.log("add hub")
      Object.keys(data).forEach((key)=>{
        if(key === "hub"){
          data[key].push({"name":this.state.HubName,"subnet":this.state.HubSubnet,"netmask":this.state.HubNetmast,"interface":[]})
        }
      })
      this.setState({HubName:"",HubSubnet:"",HubNetmast:""})
    }


    render(){
        return(
            <div className="box" style={{height: '100px', width: '1000px', position: 'relative', overflow: 'auto', padding: '0'}}>
               
                <label>name: </label>
                <input  name="VMname" value={this.state.VMname} onChange={this.handleChange}/>
                <label>os: </label>
                <input  name="VMos" value={this.state.VMos} onChange={this.handleChange}/>
                <label>version: </label>
                <input  name="VMversion" value={this.state.VMversion} onChange={this.handleChange}/>
                <label>src: </label>
                <input  name="VMsrc" value={this.state.VMsrc} onChange={this.handleChange}/>
                <button onClick={this.addVm}>create new vm</button>
                <br/>
                <label>name: </label>
                <input name="HubName" value={this.state.HubName} onChange={this.handleChange}></input>
                <label>subnet: </label>
                <input name="HubSubnet" value={this.state.HubSubnet} onChange={this.handleChange}></input>
                <label>netmast: </label>
                <input name="HubNetmast" value={this.state.HubNetmast} onChange={this.handleChange}></input>
                <button onClick={this.addHub}>create new hub</button>
                


            </div>
        );
    }

}

export default CreateArea;
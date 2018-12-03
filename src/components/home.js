import React from "react";

import data from '../default.json';
import Draggable, {DraggableCore} from 'react-draggable';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import StayScrolled from 'react-stay-scrolled';
import {saveAs,FileSaver} from 'file-saver';
import "../styles/Main.css"

import { readFile, read } from "fs";

class Home extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addVm = this.addVm.bind(this);
        this.addHub = this.addHub.bind(this);
        this.CreateFile = this.CreateFile.bind(this);
        this.deleteHub = this.deleteHub.bind(this);
        this.state={
            VMname:"",
            VMos:"",
            VMversion:"",
            VMsrc:"",
            VMeth:[],
            HubName:"",
            HubSubnet:"",
            HubNetmast:"",
            HubInterface:[],
            FileName:this.props.id,
            isFile:false,
            VMs:[],
            Hubs:[],
            CreateVmPosition: {
                x: -500, y: 400
            },
            CreateHubPosition: {
                x: -450, y: 400
            },
            createVm:false,
            log:[],
            file:this.props.file,
            data:[],
           
           
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
        CreateFile(){
          data["name"]=this.props.id
          console.log(data)
          this.setState({isFile:true})
        }
        addVm(name,os,version,src,eth){
          console.log("add vm")
          this.setState({VMs: this.state.VMs.concat([name])
          })
          this.setState({log:this.state.log.concat(["vm: "+name +"was created"])})
          Object.keys(data).forEach((key)=>{
            if(key === "vm"){
              data[key].push({"name":"VM:"+name,"os":os,"version":version,"src":src,"eth":eth})
            }
          })
          this.setState({file:this.state.file.concat("vm    :"+name +"{\n os:" + os+"\n version: \u0022" + version + "\u0022\n scr: \u0022" + src + "\u0022 \n eth:\u0022" +eth + "\u0022\n}\n")})
          this.setState({VMname:"",VMos:"",VMversion:"",VMsrc:"",VMeth:[]})
        }
        
        addHub(name,subnet,netmast,hubinterface){
          console.log("add hub")
          this.setState({Hubs: this.state.Hubs.concat([name])
              })
              Object.keys(data).forEach((key)=>{
                if(key === "hub"){
                  data[key].push({"name":"hub:"+name,"subnet":subnet,"netmask":netmast,"interface":[hubinterface]})
                }
              })
          this.setState({log:this.state.log.concat(["hub: "+name +"was created"])})
          this.setState({file:this.state.file.concat("Hub    :"+name +"{\n inf:" + hubinterface+"\n subnet: \u0022" + subnet + "\u0022\n netmast: \u0022" + netmast + "\u0022\n}\n")})
          this.setState({HubName:"",HubSubnet:"",HubNetmast:"",HubInterface:""})
          
        }

          CreateVm(){
            this.setState({ vm: ++this.state.vm });
          }
        
          CreateHub(){
            this.setState({ hub: ++this.state.hub });
          }
        
          
        
          

          deleteHub(name){
            console.log("working")
            var hub = this.state.Hubs
            for(var i = 0;i < hub.length; i++){
                  console.log(hub[i])
              if(hub[i] === name){
                hub.splice(i,1)
                
                this.setState({Hubs: hub})
                console.log(this.state.Hubs)
               
              }
            };
            this.setState({log:this.state.log.concat(["hub: "+name +"was deleted"])}) 
          }

          deleteVm(name){
            var vm = this.state.VMs
            console.log("delete vm working")
            for(var i = 0;i < vm.length; i++){
              if(vm[i] === name){
                vm.splice(i,1)
                
                this.setState({VMs: vm})
               
              }
            };
            this.setState({log:this.state.log.concat(["vm: "+name +"was deleted"])})  
          }

          createVMConfirm =() =>{
            if (this.state.VMname === "" && this.state.VMos === "" && this.state.VMsrc === "" && this.state.VMversion === "" && this.state.VMeth === ""){
              confirmAlert({
                title:"VM attribute missing",
                message: "You are missing something",
                buttons:[
                  {
                    label:'ok'
                  }
                ]

              })
             }else{
              confirmAlert({
                title: 'Confirm to create VM',
                message: 'Are you sure vm name as: ' + this.state.VMname,
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => this.addVm(this.state.VMname,this.state.VMos,this.state.VMversion,this.state.VMsrc,this.state.VMeth)
                  },
                  {
                    label: 'No',
                    onClick: () => alert('Create vm canceled')
                  }
                ]
              })
             }
          }
          
          createHubConfirm =() =>{
            if (this.state.HubName === "" && this.state.HubInterface === "" && this.state.HubNetmast === "" && this.state.HubSubnet === "" ){
              confirmAlert({
                title:"Hub attribute missing",
                message: "You are missing something",
                buttons:[
                  {
                    label:'ok'
                  }
                ]

              })
             }else{
              confirmAlert({
                title: 'Confirm to create Hub',
                message: 'Are you sure hub name as: ' + this.state.HubName,
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => this.addHub(this.state.HubName,this.state.HubSubnet,this.state.HubNetmast,this.state.HubInterface)
                  },
                  {
                    label: 'No',
                    onClick: () => alert('Create vm canceled')
                  }
                ]
              })
             }
          }

          
          
          saveFileConfirm(){
            if (this.state.file === ""){
              confirmAlert({
                title:" file  missing",
                message: "No file can be saved",
                buttons:[
                  {
                    label:'ok'
                  }
                ]

              })
             }else{
            confirmAlert({
              title: 'Confirm to save file',
              message: 'Are you sure saving file as: ' + this.props.id,
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => this.save()
                },
                {
                  label: 'No',
                  onClick: () => alert('Create file canceled')
                }
              ]
            })
          }
          }
          save(){
            var blob = new Blob([this.state.file], {type: "text/plain;charset=utf-8"});
            saveAs(blob, this.props.id+".cfg");
          }
          

          deleteHubConfirm(name){
            confirmAlert({
              title: 'Confirm to delete hub',
              message: 'Are you sure deleting this hub: ' + name,
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => this.deleteHub(name)
                },
                {
                  label: 'No',
                  onClick: () => alert('delete hub canceled')
                }
              ]
            })
          }
          deleteVMConfirm(name){
            confirmAlert({
              title: 'Confirm to delete vm',
              message: 'Are you sure deleting this vm: ' + name,
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => this.deleteVm(name)
                },
                {
                  label: 'No',
                  onClick: () => alert('delete vm canceled')
                }
              ]
            })
          }
          changeVM(){

          }
          componentDidMount() {
           
           this.CreateFile()
        }
        

    render(){
    var VMs = this.state.VMs;
    var Hubs = this.state.Hubs;
    var log = this.state.log;
    var file = this.state.file;
      console.log(this.props)
       
            return(
            <div>
             
                
                <div className="box" style={{height: '100px', width: '1000px', position: 'relative', overflow: 'auto', padding: '0',border: "1px solid #999"}}>
                

                  <label>name: </label>
                  <input  name="VMname" value={this.state.VMname} onChange={this.handleChange}/>
                  <label>os: </label>
                  <input  name="VMos" value={this.state.VMos} onChange={this.handleChange}/>
                  <label>version: </label>
                  <input  name="VMversion" value={this.state.VMversion} onChange={this.handleChange}/>
                  <label>src: </label>
                  <input  name="VMsrc" value={this.state.VMsrc} onChange={this.handleChange}/>
                  <label>eth: </label>
                  <input  name="VMeth" value={this.state.VMeth} onChange={this.handleChange}/>
                  <button onClick={()=> this.createVMConfirm()}>create new vm</button>
                  <br/>
                  <label>name: </label>
                  <input name="HubName" value={this.state.HubName} onChange={this.handleChange}></input>
                  <label>subnet: </label>
                  <input name="HubSubnet" value={this.state.HubSubnet} onChange={this.handleChange}></input>
                  <label>netmask: </label>
                  <input name="HubNetmast" value={this.state.HubNetmast} onChange={this.handleChange}></input>
                  <label>Interface: </label>
                  <input name="HubInterface" value={this.state.HubInterface} onChange={this.handleChange}></input>
                  <button onClick={()=>this.createHubConfirm()}>create new hub</button>
                  <br/>
                  <button onClick={()=> this.saveFileConfirm()}>Save file</button>
              </div>
                <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto',padding: '0'}}>
                
                
                  {VMs.map(vmname =>{
                    return (
                     <Draggable bounds="parent"><div className="box"><p key={vmname}>{vmname}</p><button onClick={() => this.changeVM(vmname)}>Change</button><br/><button onClick={() => this.deleteVMConfirm(vmname)}>delete vm</button></div></Draggable>
                    );
                  })}

                  {Hubs.map(hubname =>{
                    return (
                     <Draggable bounds="parent"><div className="box"><p key={hubname}>{hubname}</p><button onClick={() => this.deleteHubConfirm(hubname)}>delete hub</button></div></Draggable>
                    );
                  })}
                  
         
                </div>
                <div className="box" style={{height: '500px', width: '500px'}}>
                {file.split('\n').map((files,i)=>
                  <p key={i}>{files}</p>
        
                  )}
                </div>  
       
                 <div className="box" style={{height:"100px",width:"1000px" }}>
                  {log.map((lines)=>
                  <div><p>{lines}</p>
                        </div>
                    )}
                    </div>
                  
                    
                    
            
        </div>
              
        
        );
    
}


    
}

export default Home;
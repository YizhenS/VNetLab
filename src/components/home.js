import React from "react";

import data from '../default.json';
import Draggable, {DraggableCore} from 'react-draggable';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import StayScrolled from 'react-stay-scrolled';
import {saveAs,FileSaver} from 'file-saver';
import { Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import "../styles/Main.css";
import LineTo from 'react-lineto';

import { readFile, read } from "fs";

class Home extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addVm = this.addVm.bind(this);
        this.addHub = this.addHub.bind(this);
        this.CreateFile = this.CreateFile.bind(this);
        this.deleteHub = this.deleteHub.bind(this);
        this.handleDragVM = this.handleDragVM.bind(this);
        this.handleDragHub = this.handleDragHub.bind(this);
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
            file:[],
            data:[],
            display:[],
            vmChange:false,
            hubChange:false,
            changeName:"",
           
            deltaPositionVM: {
              x:0,y:0
            },
            deltaPositionHub: {
              x:0,y:0
            },
            location:{}
           
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
      upload(){
        this.setState({file:this.state.file.concat(this.props.file)});
      }
      handleDragVM(e,ui) {
        
        const {x, y} = this.state.deltaPositionVM;
        
        this.setState({
          deltaPositionVM: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
        console.log(this.state.deltaPositionVM)
      }
      handleDragHub(e,ui) {
        
        const {x, y} = this.state.deltaPositionHub;
        
        this.setState({
          deltaPositionHub: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
        console.log(this.state.deltaPositionHub)
      }
      addPostion(name){
        console.log("working")
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
          this.setState({log:this.state.log.concat(["VM: "+name +" was created"])})
          Object.keys(data).forEach((key)=>{
            if(key === "vm"){
              data[key].push({"name":"VM:"+name,"os":os,"version":version,"src":src,"eth":eth})
            }
          })
          this.setState({file:this.state.file.concat("VM  :"+name +"{\n os:" + os+"\n version: \u0022" + version + "\u0022\n scr: \u0022" + src + "\u0022 \n eth:\u0022" +eth + "\u0022\n}\n")})
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

         
          deleteHub(name){
            console.log("working")
            var hub = this.state.Hubs
            var file  = this.state.file
            for(var i = 0;i < hub.length; i++){
                  console.log(hub[i])
              if(hub[i] === name){
                hub.splice(i,1)
                
                this.setState({Hubs: hub})
                console.log(this.state.Hubs)
               
              }
              if(file[i].includes("Hub    :"+name)){
                file.splice(i,1)
                this.setState({file: file})
              }
            };
            this.setState({log:this.state.log.concat(["hub: "+name +"was deleted"])}) 
          }

          deleteVm(name){
            var vm = this.state.VMs
            var file  = this.state.file
            console.log(file)
            for(var i = 0;i < vm.length; i++){
              if(vm[i] === name){
                vm.splice(i,1)
                
                this.setState({VMs: vm})
               
              }
              if(file[i].includes("vm    :"+name)){
                file.splice(i,1)
                this.setState({file: file})
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
          addHub(name,subnet,netmast,hubinterface){
            console.log("add hub")
            this.setState({Hubs: this.state.Hubs.concat([name])
                })
                Object.keys(data).forEach((key)=>{
                  if(key === "hub"){
                    data[key].push({"name":"hub:"+name,"subnet":subnet,"netmask":netmast,"interface":[hubinterface]})
                  }
                })
            this.setState({log:this.state.log.concat(["Hub: "+name +" was changed"])})
            this.setState({file:this.state.file.concat("Hub    :"+name +" {\n inf:" + hubinterface+"\n subnet: \u0022" + subnet + "\u0022\n netmast: \u0022" + netmast + "\u0022\n}\n")})
            this.setState({HubName:"",HubSubnet:"",HubNetmast:"",HubInterface:""})
            
          }
          changeHubConfirm =() =>{
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
                    onClick: () => {this.changeHub(this.state.HubName,this.state.HubSubnet,this.state.HubNetmast,this.state.HubInterface,);this.setState({hubChange:false});this.setState({HubName:"",HubSubnet:"",HubNetmast:"",HubInterface:""})}
                  },
                  {
                    label: 'No',
                    onClick: () => alert('Create vm canceled')
                  }
                ]
              })
             }
          }

          changeVMConfirm =() =>{
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
                title: 'Confirm to change VM',
                message: 'Are you sure vm name as: ' + this.state.VMname,
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {this.changeVM(this.state.VMname,this.state.VMos,this.state.VMversion,this.state.VMsrc,this.state.VMeth);this.setState({vmChange:false,VMname:"",VMos:"",VMversion:"",VMsrc:"",VMeth:[]})}
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
          change(entity,name){
            
            if(entity === "hub"){
              this.setState({hubChange:true})
              this.setState({HubName:name,HubSubnet:"",HubNetmast:"",HubInterface:""})
              this.changeHub(name,this.state.HubSubnet,this.state.HubNetmast,this.state.HubInterface);
              
            }else if(entity === "vm"){
              this.setState({vmChange:true})
              this.setState({VMname:name,VMos:"",VMversion:"",VMsrc:"",VMeth:[]})
              this.changeVM(name,this.state.VMos,this.state.VMversion,this.state.VMsrc,this.state.VMeth);
            }
          }
          changeVM(name,os,version,src,eth){
            var vm = this.state.VMs
            var file  = this.state.file
            for(var i = 0;i < vm.length; i++){
                  console.log(vm[i])
              
              if(file[i].includes("vm    :"+name)){
                file[i] = "vm    :"+name +"{\n os:" + os+"\n version: \u0022" + version + "\u0022\n scr: \u0022" + src + "\u0022 \n eth:\u0022" +eth + "\u0022\n}\n"
              }
            };
            this.setState({log:this.state.log.concat(["hub: "+name +"was changed"])}) 

          }
          changeHub(name,subnet,netmast,hubinterface){
          
            var hub = this.state.Hubs
            var file  = this.state.file
            for(var i = 0;i < hub.length; i++){
                  console.log(hub[i])
              
              if(file[i].includes("Hub    :"+name)){
                file[i] = "Hub    :"+name +"{\n inf:" + hubinterface+"\n subnet: \u0022" + subnet + "\u0022\n netmast: \u0022" + netmast + "\u0022\n}\n"
              }
            };
            this.setState({log:this.state.log.concat(["hub: "+name +"was changed"])}) 
            
          }

        componentDidMount() {
           if(this.props.file){
             this.upload()
           }
           this.CreateFile()
           console.log(this.state.file)
        }
        

    render(){
    var VMs = this.state.VMs;
    var Hubs = this.state.Hubs;
    var log = this.state.log;
    var file = this.state.file;
    

            if(this.state.hubChange === false&& this.state.vmChange === false){
            return(
            <div>
  
                <div className="box" style={{width: '40%', position: 'relative', overflow: 'auto',padding: '0'}} >
                <h2>Create Hubs and VMs:</h2>
                <br/>
                <br/>
                <div className="inner">
                  <div className="group1">
                    <div className="row">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">Name: </InputGroupAddon>
                        <Input name="VMname" value={this.state.VMname} onChange={this.handleChange}></Input>
                      </InputGroup>

                      <InputGroup>
                        <InputGroupAddon addonType="prepend">OS: </InputGroupAddon>
                        <Input  name="VMos" value={this.state.VMos} onChange={this.handleChange}></Input>
                      </InputGroup>
                    </div>
                    <div className="row">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">Version: </InputGroupAddon>
                        <Input name="VMversion" value={this.state.VMversion} onChange={this.handleChange}></Input>
                      </InputGroup>

                      <InputGroup>
                        <InputGroupAddon addonType="prepend">SRC: </InputGroupAddon>
                        <Input name="VMsrc" value={this.state.VMsrc} onChange={this.handleChange}></Input>
                      </InputGroup>
                    </div>

                    <div className="row">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">ETH: </InputGroupAddon>
                        <Input name="VMeth" value={this.state.VMeth} onChange={this.handleChange}></Input>
                      </InputGroup>
                    </div>
                    <br/>
                    <Button onClick={()=> this.createVMConfirm()}>create new vm</Button>
                  </div>

                  <div className="group2">
                    <InputGroup>
                          <InputGroupAddon addonType="prepend">Name: </InputGroupAddon>
                          <Input name="HubName" value={this.state.HubName} onChange={this.handleChange}></Input>
                    </InputGroup>

                    <InputGroup>
                          <InputGroupAddon addonType="prepend">Subnet: </InputGroupAddon>
                          <Input name="HubSubnet" value={this.state.HubSubnet} onChange={this.handleChange}></Input>
                    </InputGroup>

                    <InputGroup>
                          <InputGroupAddon addonType="prepend">Netmask: </InputGroupAddon>
                          <Input  name="HubNetmast" value={this.state.HubNetmast} onChange={this.handleChange}></Input>
                    </InputGroup>

                    <InputGroup>
                          <InputGroupAddon addonType="prepend">Interface: </InputGroupAddon>
                          <Input  name="HubInterface" value={this.state.HubInterface} onChange={this.handleChange}></Input>
                    </InputGroup>
                  <br/>
                    <Button onClick={()=>this.createHubConfirm()}>Create New Hub</Button>
                  </div>
                </div>
                <br/>
                <br/>
                  <br/>
                  <Button color="success" onClick={()=> this.saveFileConfirm()}>Save file</Button>
                  
              </div>
              


                <div className="box" style={{height: '500px', width: '55%', position: 'relative', overflow: 'auto',padding: '0'}}>
                <h6>Workspace:</h6>
                

                
                  {VMs.map(vmname =>{
                    return (
                     
                     <Draggable bounds="parent" onDrag={this.handleDragVM}  >
                      <div className={vmname} style={{width: '150px', height: 'auto',backgroundColor: '#e8f0ff'}} >
                        <p key={vmname}> <b>VM:</b> {vmname}</p>
                        
                        <Button color="primary" onClick={() => this.change("vm",vmname)}>Change</Button><br/>
                        <Button color="secondary">Connect</Button>
                        <br/>
                        <Button color="danger" onClick={() => this.deleteVMConfirm(vmname)}>Delete</Button>
                        </div>
                     </Draggable>
                     
                    );
                  })}

                  {Hubs.map(hubname =>{
                    return (
                     <Draggable bounds="parent" onDrag={this.handleDragHub}>
                      <div className={hubname} style={{width: '150px',height: 'auto', backgroundColor: '#e8fdff'}}>
                      <p key={hubname}><b>Hub:</b> {hubname}</p>
                      <Button color="primary" onClick={() => this.change("hub",hubname)}>Change</Button>
                      <Button color="secondary">Connect</Button><br/>
                      
                      <Button color="danger" onClick={() => this.deleteHubConfirm(hubname)}>Delete</Button>
                      </div>
                     </Draggable>
                    );
                  })}
                  <LineTo from={"vm1"} to={"hub1"}/>
                  
         
                </div>
                <div className="box" style={{height: '500px', width: '40%'}}>
                <h6>Information:</h6>

                {file.map((files,i)=>
                  <p key={i}>{files}</p>
        
                  )}
                </div>  
       
                 <div className="box" style={{height:"500px",width:"55%" }}>
                  <h6>History:</h6>
                  {log.map((lines)=>
                  <div><p>{lines}</p>
                        </div>
                    )}
                    </div>                  
            
        </div>
              
        
        );
                  }else if(this.state.vmChange === true){
                    return(
                      <div className="box" style={{ width: '1000px', position: 'relative', overflow: 'auto', padding: '0',border: "1px solid #999"}}>
                
                <InputGroup>
                          <InputGroupAddon addonType="prepend">Name: </InputGroupAddon>
                          <Input name="VMname" value={this.state.VMname} onChange={this.handleChange}></Input>
                </InputGroup>
                <InputGroup>
                        <InputGroupAddon addonType="prepend">OS: </InputGroupAddon>
                        <Input  name="VMos" value={this.state.VMos} onChange={this.handleChange}></Input>
                </InputGroup>
                <InputGroup>
                        <InputGroupAddon addonType="prepend">Version:  </InputGroupAddon>
                        <Input  name="VMversion" value={this.state.VMversion} onChange={this.handleChange}></Input>
                </InputGroup>

                <InputGroup>
                        <InputGroupAddon addonType="prepend">SRC: </InputGroupAddon>
                        <Input name="VMsrc" value={this.state.VMsrc} onChange={this.handleChange}></Input>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">ETH: </InputGroupAddon>
                        <Input name="VMeth" value={this.state.VMeth} onChange={this.handleChange}></Input>
                      </InputGroup>
                      <br/>
                    <br/>
                  <Button onClick={()=>this.changeVMConfirm()}>Change Hub</Button>
                  <Button color="danger" onClick={()=>{this.setState({vmChange:false})}}>Cancel</Button>
                  <br/>
                  
              </div>
                    )
                  }else if(this.state.hubChange === true){
                    return(
                      <div className="box" style={{ width: '1000px', position: 'relative', overflow: 'auto', padding: '0',border: "1px solid #999"}}>
                
                <InputGroup>
                          <InputGroupAddon addonType="prepend">Name: </InputGroupAddon>
                          <Input name="HubName" value={this.state.HubName} onChange={this.handleChange}></Input>
                    </InputGroup>

                    <InputGroup>
                          <InputGroupAddon addonType="prepend">Subnet: </InputGroupAddon>
                          <Input name="HubSubnet" value={this.state.HubSubnet} onChange={this.handleChange}></Input>
                    </InputGroup>

                    <InputGroup>
                          <InputGroupAddon addonType="prepend">Netmask: </InputGroupAddon>
                          <Input  name="HubNetmast" value={this.state.HubNetmast} onChange={this.handleChange}></Input>
                    </InputGroup>

                    <InputGroup>
                          <InputGroupAddon addonType="prepend">Interface: </InputGroupAddon>
                          <Input  name="HubInterface" value={this.state.HubInterface} onChange={this.handleChange}></Input>
                    </InputGroup>
                    <br/>
                    <br/>

                  <Button onClick={()=>this.changeHubConfirm()}>Change Hub</Button>
                  <Button color="danger" onClick={()=>{this.setState({hubChange:false})}}>Cancel</Button>
            
                  
              </div>
                    )
                  }
    
}


    
}

export default Home;
import React from "react";
import DragArea from './dragArea';
import CreateArea from './CreateArea';
import ConfigFile from './configFile';
import Console from './console';
import data from '../default.json';
import Draggable, {DraggableCore} from 'react-draggable';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
class Home extends React.Component {

    constructor(){
        super();
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
            FileName:"",
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
            data:[]
           
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
        CreateFile(){
          console.log("add file")
          data["name"]=this.state.FileName
          console.log(data)
          this.setState({isFile:true})
        }
        addVm(){
          console.log("add vm")
          this.setState({Hubs: this.state.VMs.concat([this.state.VMname])
          })
        }
        addHub(){
          console.log("add hub")
          this.setState({Hubs: this.state.Hubs.concat([this.state.HubName])
              })
          // Object.keys(data).forEach((key)=>{
          //   if(key === "hub"){
          //     data[key].push({"name":"HUB: "+this.state.HubName,"subnet":this.state.HubSubnet,"netmask":this.state.HubNetmast,"interface":[]})
              
            
          //   }
          // })
          
          
          this.setState({log:this.state.log.concat(["hub: "+this.state.HubName +"was created"])})
          this.setState({HubName:"",HubSubnet:"",HubNetmast:""})
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
                console.log("deleted")
                this.setState({Hubs: hub})
                console.log(this.state.Hubs)
               
              }
            }; 
          }

          deleteVm(name){
            var vm = this.state.VMs
            for(var i = 0;i < vm.length; i++){
              if(vm[i] === name){
                vm.splice(i,1)
                console.log("deleted")
                this.setState({VMs: vm})
               
              }
            }; 
          }

          openfileConfirm = () => {
            if (this.state.FileName === ""){
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
              message: 'Are you sure creating file as: ' + this.state.FileName,
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
    var VMs = this.state.VMs;
    var Hubs = this.state.Hubs;
    var log = this.state.log
    
        if(this.state.isFile===false){
            return(
              <div>
                <label>File name: </label>
                    <input name="FileName" value={this.state.FileName} onChange={this.handleChange}></input>
                    <button onClick={this.openfileConfirm}>Newfile</button>
              </div>
            );
          }else{
            return(
            <div>
                <div className="box" style={{height: '100px', width: '1000px', position: 'relative', overflow: 'auto', padding: '0'}}>
                  <label>name: </label>
                  <input  name="VMname" value={this.state.VMname} onChange={this.handleChange}/>
                  <label>os: </label>
                  <input  name="VMos" value={this.state.VMos} onChange={this.handleChange}/>
                  <label>version: </label>
                  <input  name="VMversion" value={this.state.VMversion} onChange={this.handleChange}/>
                  <label>src: </label>
                  <input  name="VMsrc" value={this.state.VMsrc} onChange={this.handleChange}/>
                  <button onClick={()=> this.addVm()}>create new vm</button>
                  <br/>
                  <label>name: </label>
                  <input name="HubName" value={this.state.HubName} onChange={this.handleChange}></input>
                  <label>subnet: </label>
                  <input name="HubSubnet" value={this.state.HubSubnet} onChange={this.handleChange}></input>
                  <label>netmast: </label>
                  <input name="HubNetmast" value={this.state.HubNetmast} onChange={this.handleChange}></input>
                  <button onClick={()=>this.addHub()}>create new hub</button>
                  <br/>
              </div>
                <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
                
                
                  {VMs.map(name =>{
                    return (
                     <Draggable bounds="parent"><div className="box"><p key={name}>{name}</p><button onClick={() => {this.deleteVm(name)}}>delete</button></div></Draggable>
                    );
                  })}
                  {Hubs.map(name =>{
                    return (
                     <Draggable bounds="parent"><div className="box"><p key={name}>{name}</p><button onClick={() => this.deleteHub(name)}>delete</button></div></Draggable>
                    );
                  })}

         
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


    
}

export default Home;
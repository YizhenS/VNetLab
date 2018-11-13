import React from "react";
import DragArea from './dragArea';
import CreateArea from './CreateArea';
import ConfigFile from './configFile';
import Console from './console';
import data from '../default.json';
import Draggable, {DraggableCore} from 'react-draggable';
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
          console.log(this.state.VMos)
          Object.keys(data).forEach((key)=>{
            if(key === "vm"){
              data[key].push({"name":"VM:"+this.state.VMname,"os":this.state.VMos,"version":this.state.VMversion,"src":this.state.VMsrc,"eth":[]})
            }
          })
          this.setState({log:this.state.log.concat(["vm: "+this.state.VMname +"was created"])})
          this.setState({VMname:"",VMos:"",VMversion:"",VMsrc:""})
        }
        addHub(){
          console.log("add hub")
          Object.keys(data).forEach((key)=>{
            if(key === "hub"){
              data[key].push({"name":"HUB: "+this.state.HubName,"subnet":this.state.HubSubnet,"netmask":this.state.HubNetmast,"interface":[]})
            }
          })
          this.setState({log:this.state.log.concat(["hub: "+this.state.HubName +"was created"])})
          this.setState({HubName:"",HubSubnet:"",HubNetmast:""})
        }
        
        
          
        
        
          CreateVm(){
            return this.setState({ vm: ++this.state.vm });
          }
        
          CreateHub(){
            this.setState({ hub: ++this.state.hub });
          }
        
          
        
          addItem(){
            var vm = [];
            var hub = [];
            var all = [];
            Object.keys(data).forEach((key)=>{
              
              if(key === "vm"){
                for(var i = 0;i < data[key].length; i++){
                  //console.log(data[key][i]["name"]);
                  vm[i] = data[key][i]["name"];
                  //console.log(data)
                  
                };
              }else if(key === "hub"){
                for(var i = 0;i < data[key].length; i++){
                  //console.log(data[key][i]["name"]);
                  hub[i] = data[key][i]["name"];
                  //console.log(data)
                };
              }
              
              
            });
            this.setState({VMs:vm,Hubs:hub})
            console.log(data)
          }

          deleteHub(){
              console.log("wokring");
          }

    render(){
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;
    var VMs = this.state.VMs;
    var Hubs = this.state.Hubs;
    var log = this.state.log
        if(this.state.isFile===false){
            return(
              <div>
                <label>File name: </label>
                    <input name="FileName" value={this.state.FileName} onChange={this.handleChange}></input>
                    <button onClick={this.CreateFile}>Newfile</button>
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
                  <button onClick={()=>{this.addVm();this.addItem()}}>create new vm</button>
                  <br/>
                  <label>name: </label>
                  <input name="HubName" value={this.state.HubName} onChange={this.handleChange}></input>
                  <label>subnet: </label>
                  <input name="HubSubnet" value={this.state.HubSubnet} onChange={this.handleChange}></input>
                  <label>netmast: </label>
                  <input name="HubNetmast" value={this.state.HubNetmast} onChange={this.handleChange}></input>
                  <button onClick={()=>{this.addHub();this.addItem()}}>create new hub</button>
                  <br/>
              </div>
                <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
                <button onClick={()=>{this.deleteHub()}}>delete</button>
                {VMs.map(function(VMs, index){
                   return <Draggable bounds="parent"><div  className="box"><p key={ index }>{VMs}</p><button onClick={()=>{this.deleteHub()}}>delete</button></div></Draggable>;
                 })}
                 {Hubs.map(function(Hubs, index){
                   return <Draggable bounds="parent"><div  className="box"><p key={ index }>{Hubs}</p><button onClick={()=>{this.deleteHub()}}>delete</button></div></Draggable>;
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
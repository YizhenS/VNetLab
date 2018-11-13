import React, { Component } from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import "../styles/Main.css";
import Popup from 'react-popup';
import data from '../default.json';



class DragArea extends React.Component{
  constructor() {
    super();
    this.CreateVmDrag = this.CreateVmDrag.bind(this);
    this.state = {
      items:[],
      CreateVmPosition: {
        x: -500, y: 400
      },
      CreateHubPosition: {
        x: -450, y: 400
      },
      createVm:false,
    
    };
    
  }
  
  

  handleDrag(e, ui) {
    const {x, y} = this.state.deltaPosition;
    this.setState((state)=>{
      return{
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }
      }
    });
  }

  
  CreateVmDrag(e, position) {
    const {x, y} = position;
    if(x>-510 && x<-260 && y < 260 && y>10){
      
      this.setState({ createVm: true });
      this.CreateVm();
    }
    console.log(x,y);
    //this.setState((state)=>{return{controlledPosition: {x, y}}});
  }
  CreateHubDrag(e, position) {
    const {x, y} = position;
    console.log(x,y);
    //this.setState((state)=>{return{controlledPosition: {x, y}}});
  }

  CreateVm(){
    console.log("working")
    console.log(this.state.vm)
    return this.setState({ vm: ++this.state.vm });
  }

  CreateHub(){
    console.log("working")
    console.log(this.state.hub)
    this.setState({ hub: ++this.state.hub });
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
  }

  

  onControlledDrag(e, position) {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
  }

  openFile(){
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
      all = vm.concat(hub)
      
    });
    this.setState({items:all})
    console.log(data)
  }
  
  
  componentDidMount(){
    this.openFile()
}



  render() {
    
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;
    var boxes = this.state.items
    return (
      <div>        
        
        
        
        <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
         
          {boxes.map(function(boxes, index){
                    return <Draggable bounds="parent"><div  className="box"><p key={ index }>{boxes}</p></div></Draggable>;
                  })}
          <button onClick={()=>this.openFile()}>openfile</button>
            
         
        </div>
        
     
        
        {/* <Draggable position={this.state.CreateVmPosition} {...dragHandlers} onDrag={this.CreateVmDrag}>
          <div className="box">
            New Vm
          </div>
        </Draggable>
        <Draggable position={this.state.CreateHubPosition} {...dragHandlers} onDrag={this.CreateHubDrag}>
          <div className="box">
            New Hub
          </div>
        </Draggable> */}
        

      </div>
    );
  }
}
export default DragArea;
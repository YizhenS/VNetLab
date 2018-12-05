import React from "react";
import Home from "./home"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import ReactFileReader from 'react-file-reader';

import "../styles/create.css"


class CreateFile extends React.Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.state = {
      isFile: false,
      fileName: ""
    }
  }

  /* handle change event for input fields */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /* create a file */
  CreateFile() {
    this.setState({ isFile: true })
  }

  /* open confirmation dialog for entering a file */
  openfileConfirm = () => {
    if (this.state.fileName === "") {
      confirmAlert({
        title: "File name missing",
        message: "You need to enter a valid file name",
        buttons: [
          {
            label: 'ok'
          }
        ]

      })
    } else {
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

  /* assign files to state */
  handleFiles = files => {
    var reader = new FileReader()
    reader.onloadend = this.handleFilesRead;

    reader.readAsText(files[0])
    this.setState({ fileName: files[0]["name"] });
  }

  /* handle reading in a file */
  handleFilesRead = (e) => {
    var content = e.target.result;
    this.setState({ isFile: true, fileContent: content })
  }



  render() {
    if (this.state.isFile === false) {
      return (
        <div className="everything">
          <div className="title">
            <h2>Welcome to VNetLab</h2>
            <h4>To get started, create a file</h4>
          </div>

          <div className="form">
            <InputGroup>
              <InputGroupAddon addonType="prepend">File name: </InputGroupAddon>
              <Input name="fileName" value={this.state.fileName} onChange={this.handleChange}></Input>
              <Button onClick={this.openfileConfirm}>Create File</Button>
            </InputGroup>
            <a>Need help?</a>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={[".cfg"]}>
              <button className='btn'>Upload</button>

            </ReactFileReader>
          </div>

        </div>
      );
    } else {
      return (<Home id={this.state.fileName} file={this.state.fileContent} />);
    }

  }
}

export default CreateFile
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Home from "./components/home";
import CreateFile from './components/CreateFile';
import { expect } from 'chai';
import { configure, mount, shallow } from 'enzyme';
import Input from 'reactstrap';
configure({ adapter: new Adapter() });


  /*
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });*/


/* tests for CreateFile component */
describe('CreateFile Component tests...', () => {

	it('Create File and Upload buttons are rendered in component.', () => {
		const CreateFileComponent = shallow(<CreateFile />);
		
		expect(CreateFileComponent.find('#btnCreateFile').exists());
		expect(CreateFileComponent.find('#btnUpload').exists());
		expect(CreateFileComponent.find('#txtFileName').exists());
	});
  

});

describe('Home Component test...', () => {

	it('Home component renders all appropriate input fields.', () => {
		const HomeComponent = shallow(<Home />);

		expect(HomeComponent.find('#txtVMNAME').exists());
		expect(HomeComponent.find('#txtVMOS').exists());
		expect(HomeComponent.find('#txtVMVERSION').exists());
		expect(HomeComponent.find('#txtVMSRC').exists());
		expect(HomeComponent.find('#txtVMETH').exists());
	});
	
	it('Home component validate input fields update state onchange.', () => {
		const HomeComponent = shallow(<Home />);

		// input fields for vm
		const VMNameInputField = HomeComponent.find('#txtVMNAME');
		let vmname = 'JacobBox';

		const VMOSInputField = HomeComponent.find('#txtVMOS');
		let vmos = 'linux';
		
		const VMVersionInputField = HomeComponent.find('#txtVMVERSION');
		const vmversion = '1.0.0';

		const VMSRCInputField = HomeComponent.find('#txtVMSRC');
		const vmsrc = '/bin/vm';

		const VMMETHInputField = HomeComponent.find('#txtVMETH');
		const vmmeth = '127.0.0.1';
		
		VMNameInputField.simulate('change', {
			target: {
				name: 'VMname',
				value: vmname
			}
		});

		VMOSInputField.simulate('change', {
			target: {
				name: 'VMos',
				value: vmos
			}
		});

		VMVersionInputField.simulate('change', {
			target: {
				name: 'VMversion',
				value: vmversion
			}
		});

		VMSRCInputField.simulate('change', {
			target: {
				name: 'VMsrc',
				value: vmsrc
			}
		});

		VMMETHInputField.simulate('change', {
			target: { name: 'VMeth', value: vmmeth }
		});

		expect(HomeComponent.state().VMname).to.equal(vmname);
		expect(HomeComponent.state().VMos).to.equal(vmos);
		expect(HomeComponent.state().VMversion).to.equal(vmversion);
		expect(HomeComponent.state().VMsrc).to.equal(vmsrc);
		expect(HomeComponent.state().VMeth).to.equal(vmmeth);
	});
	
	it('Home component validate virtual machine input fields update state onchange.', () => {
		const HomeComponent = shallow(<Home />);

		// input fields for vm
		const HubNameInputField = HomeComponent.find('#txtVMNAME');
		let hubname = 'JacobBox';

		const HubSubnetInputField = HomeComponent.find('#txtVMOS');
		let hubsubnet = 'linux';
		
		const HubNetmaskInputField = HomeComponent.find('#txtVMVERSION');
		const hubnetmask = '1.0.0';

		const HubInterfaceInputField = HomeComponent.find('#txtVMSRC');
		const hubinterface = '/bin/vm';
		
		HubNameInputField.simulate('change', { target: {name: 'HubName',value: hubname} });

		HubSubnetInputField.simulate('change', {target: {name: 'HubSubnet',value: hubsubnet}});

		HubNetmaskInputField.simulate('change', {target: {name: 'HubNetmast',value: hubnetmask}});

		HubInterfaceInputField.simulate('change', { target: {name: 'HubInterface',value: hubinterface}});

		expect(HomeComponent.state().HubName).to.equal(hubname);
		expect(HomeComponent.state().HubSubnet).to.equal(hubsubnet);
		expect(HomeComponent.state().HubNetmast).to.equal(hubnetmask);
		expect(HomeComponent.state().HubInterface).to.equal(hubinterface);
	});


	it('Home component validate hub input fields update state onchange.', () => {
		const HomeComponent = shallow(<Home />);

		// input fields for vm
		const VMNameInputField = HomeComponent.find('#txtVMNAME');
		let vmname = 'JacobBox';

		const VMOSInputField = HomeComponent.find('#txtVMOS');
		let vmos = 'linux';
		
		const VMVersionInputField = HomeComponent.find('#txtVMVERSION');
		const vmversion = '1.0.0';

		const VMSRCInputField = HomeComponent.find('#txtVMSRC');
		const vmsrc = '/bin/vm';

		const VMMETHInputField = HomeComponent.find('#txtVMETH');
		const vmmeth = '127.0.0.1';
		
		VMNameInputField.simulate('change', {
			target: {
				name: 'VMname',
				value: vmname
			}
		});

		VMOSInputField.simulate('change', {
			target: {
				name: 'VMos',
				value: vmos
			}
		});

		VMVersionInputField.simulate('change', {
			target: {
				name: 'VMversion',
				value: vmversion
			}
		});

		VMSRCInputField.simulate('change', {
			target: {
				name: 'VMsrc',
				value: vmsrc
			}
		});

		VMMETHInputField.simulate('change', {
			target: { name: 'VMeth', value: vmmeth }
		});

		expect(HomeComponent.state().VMname).to.equal(vmname);
		expect(HomeComponent.state().VMos).to.equal(vmos);
		expect(HomeComponent.state().VMversion).to.equal(vmversion);
		expect(HomeComponent.state().VMsrc).to.equal(vmsrc);
		expect(HomeComponent.state().VMeth).to.equal(vmmeth);
	});



	it('renders without crashing', () => {});
	it('have create file button', () => {});
	it('have create file input', () => {});
	it('create file button work', () => {});
	it('create file w/o file name will be canceled AND cancel file', () => {});
	it('create vm with every attribute', () => {});
	it('create hub with every attribute', () => {});
	it('save a new/existing attribute', () => {});
	it('cancel save a new/existing file', () => {});
	it('create hub with missing attribute', () => {});
	it('create vm with missing attribute', () => {});

});





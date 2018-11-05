import React from "react";
import DragArea from './dragArea';
import CreateArea from './CreateArea';
import ConfigFile from './configFile';
import Console from './console';
class Home extends React.Component {




    render(){
        return(
            <div>
                <p>home page</p>
                <CreateArea/>
                <DragArea/>
                <ConfigFile/>
                <Console />
            </div>
        );
    }

}

export default Home;
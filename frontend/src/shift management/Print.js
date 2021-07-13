import React, {Component, PropTypes} from 'react';

class PrintThisComponent extends Component{
   render(){
       return(
           <div>
                <button onClick={() => window.print()} variant="success">Print</button>
                <p>click above button to get this as a pdf</p>
           </div>
       )
   } 
}

export default PrintThisComponent
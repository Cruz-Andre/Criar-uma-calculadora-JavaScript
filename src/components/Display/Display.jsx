import { useEffect, useState } from 'react';
import './Display.css'

const Display = (props) => {

  const [fontSize, setFontSize] = useState(2.1);
    
  const valueString = (props.value).toString();

  const textLength = valueString.length
  
  useEffect(() => {

    console.log('TextLength:', textLength)
    
    let newFontSize = 2.1;

    if (textLength > 10) {
      newFontSize = 1.5;
    }
    
    if (textLength > 15) {
      newFontSize = 1.1;
    }
    
    setFontSize(newFontSize);

  }, [textLength]);


  return (
    <div id={props.id} className='display' style={{ fontSize: `${fontSize}em` }}>
      {props.value}
    </div>
  )
}

export default Display
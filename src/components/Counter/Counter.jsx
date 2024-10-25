import { useState } from 'react'
import './Counter.css'

function Counter(props) {
 
// let value= props.value
const [value, setValue] = useState(props.value || 0)

function increment () {
    setValue(value+1)
    console.log(value)
}
function decrment () {
    setValue(value-1)
    console.log(value)
}

    return (
        <div className="counter-container">
            <h3 className='counter-title'>{props.name || "jonn" }</h3>
            <button className='b1' onClick={decrment}>&minus;</button>
            <span className='counter-value'>{value}</span>
            <button className='b2' onClick={increment}>+</button>
        </div>
    )
}

export default Counter;
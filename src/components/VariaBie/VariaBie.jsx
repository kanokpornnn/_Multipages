import './VariaBie.css';


function Variable({type,name,value,setValue}) {

    // let value= props.value
    // const [value, setValue] = useState(props.value  0)


     return (
        <div className="variable-container">
            <h3 className='counter-title'>{name  || 'jone'}</h3>
            <button className='tem2' onClick={() => setValue(value - 1)}>&minus;</button>
            <span className='counter-value'>{type && type === 'int' ? value : value.toFixed(2) }</span>
            <button className='tem3' onClick={() => setValue(value + 1)}>+</button>
        </div>
    )
}


export default Variable;
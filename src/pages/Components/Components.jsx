import Counter from '../../components/Counter/Counter'
import Timer from'../../components/Timer/Timer'
import Add from'../../components/Add/Add'
import Temperatures from'../../components/Temperatures/Temperatures'


import './Components.css'


function Components() {

  return (
      <div className='main-container'>

        <h1 className='main-title'>REACT COPONENTS</h1>
        <div className='cream'>
        <div><Counter name = {'COUNTER'} value = {0}/>
        <Timer  name = {'TIMER'} value = {0}/></div>
        <Add aValue={0} bValue2={0} />
        
        </div>
        <Temperatures  name = {'Temperatures'} />
        <h2 className='main-footer'>นางสาวกนกพร ไชยเค้า รหัส 66085098</h2>
      </div>
  )
}

export default Components
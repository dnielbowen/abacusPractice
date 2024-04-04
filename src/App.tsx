import { useState } from 'react'
import './App.css'

function numStrToNum(numStr: string) {
  var numbers = numStr.match(/[\d\.]+/g);
  if (numbers) {
    return parseFloat(numbers.join(''));
  } else {
    return 0;
  }
}

function App() {
  const [max, setMax] = useState(5e6);

  const getNext = () => Math.floor(max * Math.random());
  const [nums, setNums] = useState([...Array(5)].map(() => getNext()));

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className='text-4xl text-gray-500'>Soroban practice</div>
      <div className='flex justify-center items-end flex-col gap-4'>
        {nums.map((num, i) => <div className='flex flex-col items-end gap-0'>
          <div className='text-4xl font-mono'>
            {num.toLocaleString()}
          </div>
          <div className='text-sm'>
            {nums.slice(0, i + 1).reduce((acc, x) => acc + x, 0).toLocaleString()}
          </div>
        </div>)}
        <div className='flex flex-col gap-1 items-center'>
          <div className="flex items-center gap-1">
            <input className='text-xl p-2 rounded-md w-[150px] border border-gray-400' type="text" value={max.toLocaleString()} onChange={ev => setMax(numStrToNum(ev.currentTarget.value))} />
            <button className='p-3 text-xl text-gray-600 border border-gray-500 rounded-lg'
              onClick={() => setNums(nums => [...nums, getNext()])}>
              Add
            </button>
          </div>
          <button className='p-3 text-xl text-gray-500 border border-gray-200 rounded-lg'
            onClick={() => setNums([])}>
            Reset
          </button>
        </div>
      </div>

    </div>
  );
}

export default App

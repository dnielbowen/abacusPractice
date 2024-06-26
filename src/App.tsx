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

function AbacusIcon() {
  return (
    <svg className='w-[30px] h-[30px]' stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 3v18"></path><path d="M19 21v-18"></path><path d="M5 7h14"></path><path d="M5 15h14"></path><path d="M8 13v4"></path><path d="M11 13v4"></path><path d="M16 13v4"></path><path d="M14 5v4"></path><path d="M11 5v4"></path><path d="M8 5v4"></path><path d="M3 21h18"></path></svg>
  );
}

function RefreshIcon() {
  return (
    <svg className='w-[25px] h-[25px]' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M433 288.8c-7.7 0-14.3 5.9-14.9 13.6-6.9 83.1-76.8 147.9-161.8 147.9-89.5 0-162.4-72.4-162.4-161.4 0-87.6 70.6-159.2 158.2-161.4 2.3-.1 4.1 1.7 4.1 4v50.3c0 12.6 13.9 20.2 24.6 13.5L377 128c10-6.3 10-20.8 0-27.1l-96.1-66.4c-10.7-6.7-24.6.9-24.6 13.5v45.7c0 2.2-1.7 4-3.9 4C148 99.8 64 184.6 64 288.9 64 394.5 150.1 480 256.3 480c100.8 0 183.4-76.7 191.6-175.1.8-8.7-6.2-16.1-14.9-16.1z"></path></svg>
  );
}

function App() {
  const [max, setMax] = useState(5000);
  const [includeNegative, setIncludeNegative] = useState(false);

  const getNext = () => Math.floor(max * Math.random()) * ((includeNegative && Math.random() < 0.4) ? -1 : 1);

  const [nums, setNums] = useState([...Array(5)].map(() => getNext()));
  const [showAnswers, setShowAnswers] = useState(true);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className='flex flex-col gap-1 items-center text-4xl text-gray-500 dark:text-gray-300'>
        <div className='text-4xl flex items-center gap-2'>
          <AbacusIcon />
          Abacus practice
        </div>
        <div className='text-sm text-center'>Add each number and check with the running total below, helpful for learning the abacus/soroban</div>
      </div>
      <div className='flex justify-center items-end flex-col gap-4'>
        {nums.map((num, i) => <div key={i} className='flex flex-col items-end gap-0'>
          <div className="font-mono flex gap-1 items-baseline">
            <div className='text-base'>{num > 0 ? "+" : "-"}</div>
            <div className='text-4xl'>
              {Math.abs(num).toLocaleString()}
            </div>
          </div>
          <div className={'transition-all duration-500 text-sm' + (!showAnswers ? ' opacity-0' : '')}>
            = {nums.slice(0, i + 1).reduce((acc, x) => acc + x, 0).toLocaleString()}
          </div>
        </div>)}
        <div className='flex flex-col gap-1 items-center'>
          <div className="flex flex-col items-start gap-0">
            <div className='text-xs px-3'>Max value</div>
            <div className="flex items-center gap-1">
              <input className='text-xl p-2 rounded-md w-[150px] border border-gray-400 dark:border-gray-900' type="text" value={max.toLocaleString()} onChange={ev => setMax(numStrToNum(ev.currentTarget.value))} />
              <button className='p-2 text-xl text-gray-600 border border-gray-500 rounded-lg'
                onClick={() => setNums(nums => [...nums, getNext()])}>
                Add
              </button>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className="flex flex-col gap-0">
              <div className='flex items-center gap-1'>
                <input type="checkbox" id="hide" checked={showAnswers} onChange={ev => setShowAnswers(ev.currentTarget.checked)} />
                <label htmlFor="hide">Show answers</label>
              </div>
              <div className='flex items-center gap-1'>
                <input type="checkbox" id="negative" checked={includeNegative} onChange={ev => setIncludeNegative(ev.currentTarget.checked)} />
                <label htmlFor="negative">Include negative</label>
              </div>
            </div>
            <button className='p-2 text-xl text-gray-500 border border-gray-200 dark:border-gray-600 rounded-lg'
              onClick={() => setNums(nums => [...Array(nums.length)].map(() => getNext()))}>
              <RefreshIcon />
            </button>
            <button className='p-2 h-full text-xl text-gray-500 border border-gray-200 dark:border-gray-600 rounded-lg'
              onClick={() => setNums([])}>
              Clear
            </button>
          </div>
        </div>
      </div>
      <a className='mt-7 text-sm' href="mailto:dnielbowen@gmail.com">Ask a question, make a suggestion, etc</a>
    </div>
  );
}

export default App

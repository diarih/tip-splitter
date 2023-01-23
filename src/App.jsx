import { useState, useCallback } from 'react'
import dollarLogo from './assets/images/icon-dollar.svg'
import personLogo from './assets/images/icon-person.svg'
import './App.css'

function App() {

  const [values, setValues] = useState({
    bill: '',
    tip: {
      from: '',
      value: ''
    },
    people: ''
  })

  const [invalid, setInvalid] = useState({
    bill: false,
    tip: false,
    person: false,
  })

  const [tips, setTips] = useState([
    {
      id: 1,
      value: '5',
      label: '5%'
    },
    {
      id: 2,
      value: '10',
      label: '10%'
    },
    {
      id: 3,
      value: "15",
      label: '15%'
    },
    {
      id: 4,
      value: "25",
      label: '25%'
    },
    {
      id: 5,
      value: "50",
      label: '50%'
    },
  ])


  const [bill, setBill] = useState(0)
  const [tip, setTip] = useState(0)
  const [people, setPeople] = useState(0)

  const handleBill = (e) => {
    setBill(e.target.value)
    setValues({
      ...values,
      bill: e.target.value
    })
  }

  const handleTip = (e, from) => {

    if (from === 'input') {
      setValues({
        ...values,
        tip: {
          from: from,
          value: e.target.value
        }
      })
      setTips(tips.map((tip) => {
        return {
          ...tip,
          selected: false
        }
      }))
      return
    }

    setValues({
      ...values,
      tip: {
        from: 'button',
        value: e.value
      }
    })
    setTips(tips.map((tip) => {
      if (tip.id === e.id) {
        return {
          ...tip,
          selected: true
        }
      } else {
        return {
          ...tip,
          selected: false
        }
      }
    }))
  }

  const handlePeople = (e) => {
    if (e.target.value === '0') {
      setInvalid({
        ...invalid,
        person: true
      })
      return
    }
    setInvalid({
      ...invalid,
      person: false
    })
    setValues({
      ...values,
      people: e.target.value
    })
  }

  const calculate = useCallback(() => {
    const { bill, tip, people } = values
    const billAmount = parseFloat(bill);
    const tipPercent = parseInt(tip.value);
    const peopleAmount = parseInt(people);
    const tipAmount = billAmount * (tipPercent / 100);
    const tipPerson = (tipAmount / peopleAmount).toFixed(2);
    const total = ((billAmount + tipAmount) / peopleAmount).toFixed(2);
    return {
      tipPerson: isNaN(tipPerson) ? 0 : tipPerson,
      total: isNaN(total) ? 0 : total
    }
  }, [values])


  const reset = () => {
    setValues({
      bill: '',
      tip: {
        from: '',
        value: ''
      },
      people: ''
    })
    setTips(tips.map((tip) => {
      return {
        ...tip,
        selected: false
      }
    }))
    setInvalid({
      bill: false,
      tip: false,
      person: false,
    })
  }


  return (
    <>
      <div className='md:mb-12 mb-6 md:mt-0 mt-8 text-center tracking-[0.7em] text-darkcyan'>SPLI<br />TTER</div>
      <div className="App">
        <div className='flex md:flex-row flex-col bg-white p-8 rounded-lg gap-x-8 gap-y-8'>
          <div className='flex flex-col gap-y-8'>
            <div className='flex flex-col gap-y-2'>
              <div className='text-sm text-[#5a5f67]'>
                Bill
              </div>
              <div>
                <div className="relative rounded-md ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <img src={dollarLogo} alt="" />
                  </div>
                  <input value={values.bill} onChange={handleBill} className="form-input py-2 pl-10 pr-5 rounded-md transition duration-150 ease-in-out bg-[#f7f8f9] placeholder-[#8d979f] focus:outline focus:outline-2 focus:outline-emerald-300 hover:outline hover:outline-2 hover:outline-emerald-300 active:bg-gray-50 text-darkcyan text-right text-lg w-full appearance-none" type="number" placeholder="0" />
                </div>

              </div>
            </div>
            <div className='flex flex-col gap-y-2'>
              <div className='text-sm text-[#5a5f67]'>
                Select Tip %
              </div>
              <div className="grid gap-3 grid-cols-3">
                {
                  tips?.map((tip) => (
                    <button key={tip.id} onClick={() => handleTip(tip)} className={`bg-[#002d3c] hover:bg-lightgraycyan hover:text-darkcyan w-full text-white rounded h-full px-9 py-2 ${tip.selected ? 'bg-darkcyan' : null}`}>
                      <div className='flex justify-center items-center'>{tip.label}</div>
                    </button>
                  ))
                }
                <input value={values.tip.from == 'input' ? values.tip.value : ''} placeholder={`custom`} onChange={(e) => handleTip(e, 'input')} className='w-[100px] p-2 text-right placeholder:text-center focus:placeholder-transparent cursor-pointer' type='number' />
              </div>
            </div>
            <div className='flex flex-col gap-y-2'>
              <div className='flex justify-between'>
                <div className='text-sm text-[#5a5f67]'>
                  Number of People
                </div>
                {
                  invalid.person && <div className='text-red-500 text-sm'>Can't be zero</div>
                }
              </div>
              <div>
                <div className="relative rounded-md ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <img src={personLogo} alt="" />
                  </div>
                  <input value={values.people} min="1" onChange={handlePeople} className="out-of-range:outline-red-500 out-of-range:outline-2 out-of-range:outline form-input py-2 pl-10 pr-5 rounded-md transition duration-150 ease-in-out bg-[#f7f8f9] placeholder-[#8d979f] focus:outline focus:outline-2 focus:outline-emerald-300 hover:outline hover:outline-2 hover:outline-emerald-300 active:bg-gray-50 text-darkcyan text-right text-lg w-full" type="number" placeholder="0" />
                </div>
              </div>
            </div>
          </div>
          <div className='px-6 md:pb-6 py-6 md:pt-12 bg-darkcyan rounded-md flex justify-between flex-col'>
            <div className='flex flex-col md:gap-y-10 gap-y-6 md:mb-0 mb-8'>
              <div className='flex items-center justify-between gap-x-12'>
                <div>
                  <div className='text-white text-sm'>Tip Amount</div>
                  <div className='text-grayishcyan text-xs'>/ person</div>
                </div>
                <div>
                  <div className='text-lightgraycyan text-4xl'>{`$${calculate().tipPerson}`}</div>
                </div>
              </div>
              <div className='flex items-center justify-between gap-x-12'>
                <div>
                  <div className='text-white text-sm'>Total</div>
                  <div className='text-grayishcyan text-xs'>/ person</div>
                </div>
                <div>
                  <div className='text-lightgraycyan text-4xl'>{`$${calculate().total}`}</div>
                </div>
              </div>
            </div>
            <button onClick={() => reset()}>
              <div className='bg-lightcyan text-darkcyan text-sm rounded-md px-8 py-2 hover:bg-lightgraycyan'>
                RESET
              </div>
            </button>
          </div>
        </div>
      </div >
    </>
  )
}

export default App

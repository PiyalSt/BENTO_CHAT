import React from 'react'

const ActiveCard = () => {
  return (
    <div className='w-full flex items-center justify-between border-2 border-slate-400 py-2 px-4 rounded-2xl bg-amber-400/10 cursor-pointer active:scale-95 transition-all duration-200'>
      <div className='flex items-center gap-2'>
        <div className='w-14 h-14 rounded-full bg-gray-400'></div>
        <div className=''>
          <h2 className='text-base font-extrabold text-slate-800'>Naruto Uzumaki</h2>
          <p className='text-sm font-medium text-slate-600'>See you soon! Hinata.</p>
        </div>
      </div>
      <div className='flex flex-col items-end gap-1'>
        <h4 className='text-sm font-medium text-slate-600'>12:04 PM</h4>
        <div className=' w-fit p-1 rounded-full bg-amber-300 text-slate-800 text-xs font-bold'>
          03
        </div>
      </div>
    </div>
  )
}

export default ActiveCard
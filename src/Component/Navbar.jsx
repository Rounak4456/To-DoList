import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-500 text-yellow py-3'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8'>To - Do List</span>
        </div>
        <ul className='flex gap-10 mx-9 text-xl'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar

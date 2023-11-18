import Link from 'next/link'


const page = () => {
  return (
    <form className='w-[350px]  bg-[#ffffff] mx-auto md:mt-[5%] p-4 flex flex-col gap-4 rounded-md shadow-md '>
      <p className='text-semibold text-[20px] leading-3 mb-8 mt-2'>Register Form</p>
      <div className='flex flex-col gap-2'>
        <label htmlFor="">Email</label>
        <input type="Email"  className='w-full px-2 py-2 placeholder:text-neutral-500 bg-neutral-100 outline-none placeholder:leading-6 ' placeholder='Email@gmail.com'/>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="">Username</label>
        <input type="text"  className='w-full px-2 py-2 placeholder:text-neutral-500 bg-neutral-100 outline-none placeholder:leading-6 ' placeholder='Email@gmail.com'/>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="">Password</label>
        <input type="password" className='w-full px-2 py-2 placeholder:text-neutral-500 bg-neutral-100  outline-none' placeholder='********'/>
      </div>
      <input className='mt-4 px-6 py-2 hover:cursor-pointer rounded-md text-white bg-blue-500 ' type="submit" value="Register" />
      <span>already have an account <Link href="/login" className='text-blue-500 underline font-semibold'>Login</Link></span>
      
    </form>
  )
}

export default page

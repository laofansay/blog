import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    return (
        <>

            <div className='fixed top-0 left-0 w-full h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-32 bg-white shadow-md z-50'>


                <div className='h-full flex items-center md:hidden justify-between flex-1 ' >
                    <Link href="/" className='flex  flex-center' >
                        <Image src="/logo1.png" alt="" width={80} height={20}
                        />
                        <div className='text-2xl tracking-wide'>老范SAY</div>
                    </Link>
                    <div className='flex  gap-1'>
                        <NavIcons />
                        <Menu />
                    </div>


                </div>
                {/* bigger screens */}
                <div className='hidden md:flex items-center justify-between gap-8 h-full'>
                    {/* left  */}
                    <div className='w-2/3'>
                        <Link href="/" className='flex  flex-center items-center gap-2' >
                            <Image src="/logo1.png" alt="" width={80} height={20} />
                            <div className='text-2xl tracking-wide'> </div>
                            <div className='text-2xl tracking-wide'>老范SAY</div>
                        </Link>
                        <div className='hidden xl:flex gap-4'>
                            <Link href="/">首页</Link>
                            <Link href="/list">博客</Link>
                            <Link href="/list?category=jhipster">JHipster专区</Link>
                            <Link href="/list?category=life">生活</Link>
                            <Link href="/list?category=AI">AI</Link>
                            <Link href="list?category=AI">视频号</Link>
                            <Link href="/about">关于</Link>
                        </div>
                    </div>
                    {/* right */}
                    <div className='w-1/3 flex items-center justify-between gap-8'>
                        <SearchBar />
                        <NavIcons />
                    </div>

                </div>
            </div >
            <div className='h-20 bg-gray-100'></div> {/* 占位符 */}
        </>
    )
}

export default Navbar
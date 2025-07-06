import { ReactNode } from 'react'

interface PageProps {
  children: ReactNode
}

export default function Page ({ children }: PageProps ) {
  return (
    <div className='px-8 py-4 w-page-width h-page-height bg-white text-black'>
      { children }
    </div>
  )
} 
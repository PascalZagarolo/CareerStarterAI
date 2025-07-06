'use client'

import { useState, useEffect } from 'react'

const DownloadedPdfFilename = 'generated_pdf_resume.pdf'

export default function PDFResumePage() {
  const [bgToggle, setBgToggle] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Webster',
    occupation: 'Department Manager',
    website: 'LinkedIn.com/john-webster',
    email: 'JWebster@email.com',
    phone: '123-456-7890',
    profilePic: '/profile-pic-podpros-unsplash.jpg',
  })
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(profileData.name)
  
  useEffect(() => {
    const elements = document.querySelectorAll('#layout')
    bgToggle
      ? elements.forEach((block, index) => { block.classList.add(`bg-${index % 2 === 0 ? 'gray' : 'blue'}-100`) })
      : elements.forEach((block, index) => { block.classList.remove(`bg-${index % 2 === 0 ? 'gray' : 'blue'}-100`) })
  }, [bgToggle])

  // Listen for profile data updates from PDF API
  useEffect(() => {
    const handleProfileDataUpdate = (event: CustomEvent) => {
      setProfileData(event.detail)
    }

    // Check localStorage for profile data (for PDF generation)
    const storedProfileData = localStorage.getItem('currentProfileData')
    if (storedProfileData) {
      try {
        const parsedData = JSON.parse(storedProfileData)
        setProfileData(parsedData)
      } catch (error) {
        console.error('Error parsing stored profile data:', error)
      }
    }

    // Listen for custom events from PDF API
    window.addEventListener('profileDataUpdated', handleProfileDataUpdate as EventListener)

    return () => {
      window.removeEventListener('profileDataUpdated', handleProfileDataUpdate as EventListener)
    }
  }, [])

  const handleNameChange = (newName: string) => {
    setProfileData(prev => ({ ...prev, name: newName }))
  }

  const handleNameEdit = () => {
    if (isEditingName) {
      handleNameChange(tempName)
    }
    setIsEditingName(!isEditingName)
  }

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameEdit()
    } else if (e.key === 'Escape') {
      setTempName(profileData.name)
      setIsEditingName(false)
    }
  }

  const handleDownloadPDF = () => {
    // Encode the current profile data and pass it to the PDF API
    const encodedProfileData = encodeURIComponent(JSON.stringify(profileData))
    const downloadUrl = `/api/pdf?profileData=${encodedProfileData}`
    
    // Create a temporary link to trigger the download
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'generated_pdf_resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='min-h-screen bg-slate-800'>
      <header id='header' className='flex py-4 mb-2 justify-center border-b-2 border-gray-400'>
        {/* Download Button and Layout Colors Toggle */}
        <div className='flex items-center'>
          {/* Download PDF Button */}
          <button 
            onClick={handleDownloadPDF}
            className='inline-flex px-6 py-3 items-center text-base font-medium rounded-md border border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Download PDF
          </button>

          {/* Background Layouts Helper Switch */}
          <div className='flex px-4 py-2 ml-4 items-center bg-zinc-300 rounded-md'>
            <button
              onClick={() => setBgToggle(!bgToggle)}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                bgToggle ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span 
                aria-hidden='true'
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                  bgToggle ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className='ml-2'>Toggle Background Layouts</span>
          </div>
        </div>
      </header>

      {/* Resume PDF Workspace */}
      <main className='flex flex-col items-center'>
        <div id='layout' className='w-full max-w-4xl bg-white shadow-lg'>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg pdf-edit-controls">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Edit Name:</label>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={handleNameKeyPress}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={handleNameEdit}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setTempName(profileData.name)
                        setIsEditingName(false)
                      }}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{profileData.name}</span>
                    <button
                      onClick={handleNameEdit}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
              
              {/* Custom Download Button */}
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm font-medium"
              >
                Download PDF with Current Name
              </button>
            </div>
          </div>

          {/* Resume Content */}
          <div className='p-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>{profileData.name}</h1>
              <p className='text-xl text-gray-600 mb-2'>{profileData.occupation}</p>
              <div className='text-gray-500 space-y-1'>
                <p>{profileData.email}</p>
                <p>{profileData.phone}</p>
                <p>{profileData.website}</p>
              </div>
            </div>

            <div className='space-y-6'>
              <section>
                <h2 className='text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2'>Experience</h2>
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-semibold text-gray-900'>Senior Manager</h3>
                    <p className='text-gray-600'>Tech Company Inc. | 2020 - Present</p>
                    <p className='text-gray-700 mt-2'>Led a team of 15 developers and managed multiple high-impact projects.</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900'>Project Manager</h3>
                    <p className='text-gray-600'>Startup XYZ | 2018 - 2020</p>
                    <p className='text-gray-700 mt-2'>Managed agile development processes and delivered projects on time and budget.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className='text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2'>Education</h2>
                <div>
                  <h3 className='font-semibold text-gray-900'>Bachelor of Science in Computer Science</h3>
                  <p className='text-gray-600'>University of Technology | 2014 - 2018</p>
                  <p className='text-gray-700 mt-2'>Graduated with honors, GPA: 3.8/4.0</p>
                </div>
              </section>

              <section>
                <h2 className='text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2'>Skills</h2>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Technical Skills</h3>
                    <ul className='text-gray-700 space-y-1'>
                      <li>• JavaScript, TypeScript, React</li>
                      <li>• Node.js, Python, Java</li>
                      <li>• AWS, Docker, Kubernetes</li>
                      <li>• Git, CI/CD, Agile</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Soft Skills</h3>
                    <ul className='text-gray-700 space-y-1'>
                      <li>• Leadership & Team Management</li>
                      <li>• Project Planning & Execution</li>
                      <li>• Communication & Presentation</li>
                      <li>• Problem Solving & Analysis</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer id='footer' className='flex h-8 mt-2 items-center justify-center'>
        <span className='text-slate-200'>
          SpillaneMakes 2022
        </span>
      </footer>
    </div>
  )
} 
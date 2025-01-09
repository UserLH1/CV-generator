import React from 'react'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const PersonalDetails = () => {

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }
    const onSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(resumeInfo)
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>
        <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name:</label>
                    <Input name="firstName" className='border-gray-300 rounded' required onChange={handleChange}/>
                </div>
                <div>
                    <label className='text-sm'>Last Name:</label>
                    <Input name="lastName" className='border-gray-300 rounded' required onChange={handleChange}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title:</label>
                    <Input name="jobTitle" className='border-gray-300 rounded' required onChange={handleChange}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address:</label>
                    <Input name="address" className='border-gray-300 rounded' required onChange={handleChange}/>
                </div>
                
                <div>
                    <label className='text-sm'>Phone:</label>
                    <Input name="phone" className='border-gray-300 rounded' required onChange={handleChange}/>
                </div>
                <div>
                    <label className='text-sm'>Email:</label>
                    <Input name="email" className='border-gray-300 rounded' required onChange={handleChange}/>
                </div>           

            </div>
            <Button className='flex justify-end text-white border rounded mt-3' type='submit'>Save</Button>
        </form>
    </div>
  )
}

export default PersonalDetails
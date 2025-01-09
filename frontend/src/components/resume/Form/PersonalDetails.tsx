import React, { useState } from 'react'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import axios from 'axios'
interface PersonalDetailsProps {
    enableNext: (value: boolean) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ enableNext }) => {

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [formData, setFormData] = useState<{ firstName?: string; lastName?: string; jobTitle?: string; address?: string; phone?: string; email?: string }>({});
    const [loading, setLoading] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        enableNext(false)
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }
    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
          await axios.put(`${import.meta.env.VITE_API_URL}/api/cv/updateCV`, {
            id: resumeInfo.id, // Or however you store the CV id
            ...resumeInfo,
          });
          enableNext(true);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
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
                    <Input type='tel' name="phone" className='border-gray-300 rounded' required onChange={handleChange}/>
                </div>
                <div>
                    <label className='text-sm'>Email:</label>
                    <Input type='email' name="email" className='border-gray-300 rounded' required onChange={handleChange}/>
                </div>           

            </div>
            <Button className='flex justify-end text-white border rounded mt-3' type='submit' disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : 'Save'}</Button>
        </form>
    </div>
  )
}

export default PersonalDetails
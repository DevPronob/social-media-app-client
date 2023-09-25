import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
const About = () => {
    const [user, loading, error] = useAuthState(auth)
    const[user1,setUser] =useState()
    useEffect(() =>{
        handleSearch()
    },)
    const handleSearch = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/profile/${user?.email}`);
          setUser(response.data);
        } catch (error) {
          console.error(error);
          setUser(null);
        }
      };
   
    const queryClient = useQueryClient();

  // Define the mutation function
  const createPost = async (postData) => {
    const response = await axios.post('http://localhost:5000/profile/', postData);
    return response.data;
  };

  // Use the useMutation hook
  const { mutate, isLoading, isError } = useMutation(createPost, {
    // onSuccess is called when the mutation is successful
    onSuccess: () => {
      // Invalidate and refetch the relevant query to update the data
      queryClient.invalidateQueries('posts'); // Replace 'posts' with your query key
    },
  });
    
    const onSubmit = event =>{
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const university = form.university.value;
        const address = form.address.value;
        const email=user?.email
      const booking ={
              name,
              university,
              address,
              email
            }
           
            mutate(booking)
            
        }
     
        
          
    return (
        <div>
            <div class="w-screen bg-white py-16">
  <div class="mx-auto px-3 md:max-w-screen-lg ">
  <div class="mt-8">
    <div class="mb-14 flex items-center justify-center text-gray-900">
    </div>
    <ul class="mb-6 space-y-3 text-gray-900 sm:space-y-0 md:grid md:grid-cols-1 md:gap-4 lg:gap-8 xl:col-span-10 xl:col-start-3">
      <li class="bg-white relative overflow-hidden rounded-lg border border-black shadow-md text-left">
        <div class="mt-8 w-full">
        <button onClick={()=>window.my_modal_3.showModal()} class="relative mt-4 rounded-lg border-2 ms-5 border-blue-700 bg-blue-700 px-6 py-2 font-medium text-white transition hover:translate-y-1">
    <div class="-scale-x-100 absolute left-0 -bottom-10 inline-flex h-10 w-10 -rotate-12 text-blue-700">
    </div>
    Update Profile
  </button>
          <div class="p-5 text-center md:w-full lg:px-5 lg:py-8">
            <h3 class="font-serif text-xl font-bold lg:text-2xl lg:leading-7">Profile</h3>
          </div>
          <span class="block w-full border-b"></span>
          <label for="viewmore-2">
            <input class="peer hidden" type="checkbox" id="viewmore-2" />
            <span class="my-8 mx-auto flex cursor-pointer select-none flex-col items-center text-center normal-case sm:hidden">
              View Features<svg width="16" height="7" viewBox="0 0 16 7" fill="none" xmlns="http://www.w3.org/2000/svg" class="block align-middle text-gray-600">
                <path d="M15.7 5.67409L8.7 0.214485C8.6 0.13649 8.5 0.0584958 8.4 0.0584958C8.2 -0.0194986 7.9 -0.0194986 7.6 0.0584958C7.5 0.0584958 7.4 0.13649 7.3 0.214485L0.3 5.67409C-0.1 5.98607 -0.1 6.45404 0.3 6.76602C0.7 7.07799 1.3 7.07799 1.7 6.76602L8 1.85237L9 2.63231L14.3 6.76602C14.7 7.07799 15.3 7.07799 15.7 6.76602C16.1 6.45404 16.1 5.98607 15.7 5.67409Z" fill="currentColor" class="  "></path>
              </svg>
            </span>
            <div class="my-5 hidden px-5 text-center peer-checked:block sm:text-left md:block lg:my-8 lg:px-10">
              <ul class=" w-[300px] mx-auto text-center">
                <li class="mb-2">
                  <p class="font-sans text-base font-bold lg:text-base lg:leading-6"><b class="  "><span className='font-bold text-lg'>Name : </span>{user1?user1.name:"Unknown"}</b></p>
                </li>
                <li class="mb-2">
                  <p class="font-sans font-bold text-base lg:text-base lg:leading-6"><span className='font-bold text-lg'>Email : </span> {user?.email}</p>
                </li>
                <li class="mb-2">
                  <p class="font-sans font-bold text-base lg:text-base lg:leading-6"><span className='font-bold text-lg'>University : </span>{user1?user1.university:"Unknown"}</p>
                </li>
                <li class="mb-2">
                  <p class="font-sans font-bold text-base lg:text-base lg:leading-6"><span className='font-bold text-lg'>Address : </span>{user1?user1.address:"Unknown"}</p>
                </li>
              </ul>
            </div>
          </label>
        </div>
      </li>
    </ul>
  </div>
</div>

</div>
<dialog id="my_modal_3" className="modal">
  <form onSubmit={onSubmit}  method="dialog" className="modal-box text-center flex flex-col items-center">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <h3 className="text-lg font-bold">Update Profile</h3>
     {/* <form className=''> */}
    <input name='name' type="text" placeholder='Name'   class="input mt-1 my-1 input-bordered w-full max-w-xs" />
    <input name='university'  type="text" placeholder="University" class="input my-1 mt-1 input-bordered w-full max-w-xs" />
    <input name='address'  type="text" placeholder="Address" class="input my-1 mt-1 input-bordered w-full max-w-xs" />
 <input for="my-modal-6" type="submit" className='btn my-1 block w-80 mx-auto text-black mx-4'  value="Submit" />
 
  {/* </form> */}
  </form>
</dialog>
        </div>
    );
}

export default About;

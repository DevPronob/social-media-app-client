import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Media = () => {
    const [posts,setPosts]=useState([])
    const navigate=useNavigate()
    function truncateText(text) {
        if (text.length <= 50) {
          return text;
        } else {
          return text.substring(0, 80 - 3) + '...';
        }
      }
    const handleGetRequest = async () => {
        try {
          // Define your custom headers
          const headers = {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          };
      
          // Make the GET request using Axios with headers
          const response = await axios.get('http://localhost:5000/api/post', { headers });
      
          // Handle the response data as needed
          console.log('GET Response:', response.data);
          setPosts(response.data)
        } catch (error) {
          // Handle any errors that occur during the GET request
          console.error('Error:', error);
        }
      };
      useEffect(() => {
        handleGetRequest();
      }, []); // The empty dependency array means this effect runs once when the component mounts
      const handleNavigate = (id) =>{
        navigate(`/post/${id}`);
    }
    return (
        <div>
            <div className='lg:px-32 px-8 text-center'>
        <h3 className='text-3xl font-bold'>Posts</h3>
        <div className='flex items-center justify-center flex-wrap gap-10 product_card'>
            {
               posts.map(items =>{
                return <div onClick={() => handleNavigate(items._id)} class="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                  <img class="peer absolute top-0 right-0 h-full w-[83%] object-cover pe-5" src={items.url} alt="product image" />
                  {/* <img class="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" /> */}
                  {/* <div class="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
                    <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div> 
                    <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
                    <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
                  </div>  */}
                  <svg class=" absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                 {/* <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>  */}
                </a>
                <div class="mt-4 px-5 pb-5">
                  <a href="#">
                    <h5 class="text-sm tracking-tight text-slate-900">{truncateText(items.text)}</h5>
                  </a>
                  <div class="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      {/* <span class="text-xl text-center font-bold text-slate-900">${items.price}</span> */}
                      {/* <span class="text-sm text-slate-900 line-through">$699</span> */}
                    </p>
                  </div>
                </div>
              </div>
               }) 
            }
        </div>
      
    </div>
        </div>
    );
}

export default Media;

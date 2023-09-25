import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// import SweetAlert2 from 'react-sweetalert2';
// const MySwal = withReactContent(Swal)
const Home = () => {
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
    const avatarInputRef = useRef(null);
  const commentTextareaRef = useRef(null);

  // Event handler to submit the form data
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Accessing form data using refs
    const avatarFile = avatarInputRef.current.files[0];
    const commentText = commentTextareaRef.current.value;
    const formData = new FormData();
    formData.append('image', avatarFile);

    try {
        // Make a POST request to ImageBB API to upload the image
        const response = await axios.post('https://api.imgbb.com/1/upload?key=9077eb3443ec8771ed08cb1bb2ff29ce', formData);
  
        // The ImageBB API response will contain the URL of the uploaded image
        const imageUrl = response.data.data.url;

        const data ={
            url:imageUrl,
            text:commentText
          }
          fetch('http://localhost:5000/api/post', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
              console.log(data)
                   Swal.fire({
                    position: 'top-up',
                    icon: 'success',
                    title: `Post added Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                //    notify()
                // refetch();
            });
  
        // Now you can use imageUrl as needed, e.g., save it in state or display it
        console.log('Image URL:', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }

    // You can now use avatarFile and commentText as needed.
    console.log('Avatar:', avatarFile);
    console.log('Comment:', commentText);
    // You can also send the form data to an API or perform other actions here.
  };
  const sortedPosts = posts.slice().sort((a, b) => b.like - a.like);

  // Get the top 3 popular posts
  const top3Posts = sortedPosts.slice(0, 3);
    return (
        <div>
           <div>
           <div class="">
  <div class="mx-auto max-w-screen-sm px-4">
    <h1 class="mt-6 text-xl font-bold sm:mb-6 sm:text-3xl">Whats On your Mind</h1>


<form onSubmit={handleSubmit}>
    <div class="-ml-20 flex p-4 text-left text-gray-700">
      <img class="mr-5 h-12 w-12 rounded-full" src="https://ui-avatars.com/api/?name=John+Doe" alt="" />
      <div class="w-full space-y-3 text-gray-700">
        <div class="flex items-center">
        <img src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg"
             alt="Avatar"
             class="w-16 h-16 rounded-full"/>
        <input type="file" 
        ref={avatarInputRef}
               class="ml-4 p-1 w-full text-slate-500 text-sm rounded-full leading-6 file:bg-violet-200 file:text-violet-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded-full hover:file:bg-violet-100 border border-gray-300"/>
      </div>
        <div class="">
          <textarea ref={commentTextareaRef} name="comment" id="" placeholder="Write your comment here" cols="30" rows="6" class="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"></textarea>
        </div>
        <div class="float-right">
          <input type="submit" value="Post" class="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-blue-700 px-4 text-center text-sm font-medium normal-case text-white opacity-100 outline-none focus:ring" />
        </div>
      </div>
    </div>


</form>


  </div>
</div>

            </div> 
            {/* other */}
           <div>
            <h3 className='text-center font-bold'>Popular Post</h3>
            <div className='flex items-center justify-center flex-wrap gap-10 product_card'>
            {
               top3Posts.map(items =>{
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

export default Home;

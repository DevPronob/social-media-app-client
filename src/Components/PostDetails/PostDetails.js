import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    
    // const [postData, setPostData] = useState({});
    const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState("");
  useEffect(() => {
    setLiked(false); // Assume the user has not liked the post by default
  }, []);
  const { data: postData, isLoading, isError, refetch } = useQuery(
    ['post', id], // A unique query key
    () => getPostById(id), // Function to fetch the post data
    {
      refetchOnWindowFocus: false, // Disable auto-refetch on window focus (optional)
    }
  );

  async function getPostById(id) {
    try {
      const headers = {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };

      // Make a GET request to fetch the post data
      const response = await axios.get(`http://localhost:5000/api/${id}`, {
        headers,
      });

      return response.data; // Return the fetched data
    } catch (error) {
      throw error; // Let React Query handle the error
    }
  }

//   useEffect(() => {
//     // Fetch post data when the component mounts
//     refetch(); // Use refetch to trigger the query

//     // You can optionally include any cleanup code here
//     return () => {
//       // Cleanup code, if needed
//     };
//   }, [id, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }




  const handleLike = async () => {
    try {
      if (liked) {
        await axios.post(`http://localhost:5000/api/posts/${postData._id}/unlike`);
        setLiked(false);
        refetch()
      } else {
        await axios.post(`http://localhost:5000/api/posts/${postData._id}/like`);
        setLiked(true);
        refetch()
      }
    } catch (error) {
      console.error(error);
    }
  };

    

    const handleComment = async () => {
        try {
          await axios.post(`http://localhost:5000/api/posts/${postData._id}/comment`, { comment });
          setComments([...comments, comment]);
          setComment('');
          refetch()
        } catch (error) {
          console.error(error);
        }
      };
  
    
    return (
        <div>
           <div>
       <div>
      <div className="card bg-white lg:py-5 lg:my-12 lg:mx-24 my-5 mx-4 grid lg:grid-cols-2 lg:card-side shadow-2xl">
        <div className="lg:border-r  border-purple-900">
          <div className="big-img flex items-center justify-center">
            <img className="w-[300px]" src={postData.url} alt="product" />
          </div>

        </div>

        <div className="card-body ms-10 mt-6">
          <h2 className="card-title mb-6">{postData.text}</h2>

          <div class="mt-5 flex items-center  text-gray-600">
      {/* <button class="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg">Reply</button> */}
      <a
  onClick={handleLike}
  title="Likes"
  className={`group flex cursor-pointer items-center ${liked ? 'text-red-500' : ''}`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-10 w-10 rounded-full p-1 group-hover:bg-red-200 ${liked ? 'group-hover:text-red-500' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
  {postData.likes}
  {/* {refetch()} */}
</a>
    </div>
          {/* <p className="text-xl grow-0 flex items-center  font-bold">
            Price: <span className="text-[#ff3633] ps-3"> ${product.price}</span>
          </p>
          <p className="text-xl grow-0 flex items-center   font-bold">
          
        
         Available {product.Available}
          </p> */}
        
        </div>

        <div>
        <div class="ps-10 mt-12">
          <textarea value={comment}
        onChange={(e) => setComment(e.target.value)} name="comment" id="" placeholder="Write your comment here" cols="10" rows="3" class="h-30 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"></textarea>
        <button className='mt-3 focus:ring outline-none rounded-lg text-white bg-indigo-600 px-4 py-2 font-bold  shadow-md border-b-4 border-indigo-300  atransition aduration-100 active:scale-95 hover:translate-y-0.5' onClick={handleComment}>Comment</button>
        </div>
        <h4 className='pt-5 ms-12'>Comments</h4>
        {postData.comments?.map((comment, index) => (
          <div class="rounded-lg bg-gray-100 p-4 mt-3 w-[300px] ms-12">
          <p class="mb-2 text-gray-500">You commented on Sep 4</p>
          <p class="">{comment}</p>
        </div>
        ))}
        </div>
        
      </div>
      
     

     
    </div>
{/*     
               {
                open ?
                <BookingModal
                product={product}
                    refetch={refetch}
                ></BookingModal>:""
               }
           */}

    </div> 
        </div>
    );
}

export default PostDetails;

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import auth from '../../Firebase/Firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
// import useToken from '../hooks/useToken';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import useToken from '../hooks/useToken';
const Signup = () => {
    const navigate =useNavigate()
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    // const [updateProfile, updating, error2] = useUpdateProfile(auth);
  const [
      createUserWithEmailAndPassword,
      user1,
      loading1,
      error1,
    ] = useCreateUserWithEmailAndPassword(auth);
    
    // const [token] =useToken(user)
    let signInError;
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [token] =useToken(user || user1)
  const onSubmit = data => {
      console.log(data.email)
      // createUserWithEmailAndPassword(data.email, data.password);
      createUserWithEmailAndPassword(data.email, data.password);
       }
       if(error || error1){
          signInError= <p className='text-red-500'> {error?.message} || {error1?.message}</p>
        }
        if(user || user1){
          console.log(user)
          Swal.fire({
            position: 'top-up',
            icon: 'success',
            title: `Sign Up Successfull`,
            showConfirmButton: false,
            timer: 1500
          })
          navigate("/")
        }
        if(loading || loading1){
          return <LoadingSpinner></LoadingSpinner>
        }
    return (
        <div>
            <div className='flex justify-center items-center mt-16 h-100'>
    <div class="card w-96 bg-base-100 shadow-xl">
<div class="card-body">
  <h2 class=" text-center font-bold text-2xl">SignUp</h2>


<form onSubmit={handleSubmit(onSubmit)}>
<div class="form-control w-full max-w-xs">
<label class="label">
  <span class="label-text">Name</span>
  
</label>
<input {...register("name", {
  required:{
    value:true,
    message:"Error name"
  }
 
})} type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" />
<label className="label">
{errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}

</label>
</div>
<div class="form-control w-full max-w-xs">
<label class="label">
  <span class="label-text">Email</span>
  
</label>
<input {...register("email", {
  required:{
    value:true,
    message:"Error email message"
  },
  pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
})} type="email" placeholder="Email" class="input input-bordered w-full max-w-xs" />
<label className="label">
{errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
{errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
</label>
</div>

<div class="form-control w-full max-w-xs">
<label class="label">
<span class="label-text">Password</span>

</label>
<input {...register("password", {
required:{
  value:true,
  message:" Error password  message"
},
minLength: {
  value: 6,
  message: 'Must be 6 characters or longer'
}
})} type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
<label className="label">
{errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
{errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
</label>
</div>
{signInError}
<input className='w-full max-w-xs btn btn-outline' type="submit" />
</form>
  <p>Already Signup   <Link to="/login">Login</Link></p>
<div class="divider">OR</div>
<button class="btn btn-outline" onClick={() => signInWithGoogle()}>Continue with Google</button>

</div>
</div>
</div>
        </div>
    );
}

export default Signup;

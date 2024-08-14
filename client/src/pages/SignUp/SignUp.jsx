import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../api/utils/index";
import logoVertical from "../../assets/images/digishopVertical.png";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const handleGoogleSign =()=>{
    signInWithGoogle()
    // Redirect to home page after successful login
    .then((res) => {
      navigate(location?.state ? location.state : "/");
      toast('you are now logged in.!!')
    })
    .catch((error) => {
      toast('something went wrong.')
    });
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const image = data.image[0];
    try {
      const { name, password, mobile, email } = data;
      const imageUrl = await imageUpload(image);
      const userInfo = {
        name,
        password,
        mobile,
        email,
        image_url: imageUrl || null,
      };

      const response = await axiosPublic.post("/users/register", userInfo);

      if (response.data.user) {
        toast.success(
          "Registration successful! Please wait for admin approval."
        );
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } catch (error) {
      toast.error("Email or Phone number is already in use.");
      console.error(error);
    }
  };

  return (
    <div className="lg:min-h-screen flex items-center justify-center lg:py-12 lg:px-4 sm:px-6">
      <div className="lg:rounded-md lg:flex items-center justify-center gap-4 p-8">
        <img
          src={logoVertical}
          className="lg:w-2/6 mx-auto"
          alt="Digishop Logo"
        />
        <div className="space-y-8 text-black">
          <h2 className="text-center text-3xl font-bold text-primary">
            Register to Get Started
          </h2>
          <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              autoComplete="name"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              autoComplete="email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-4 bg-gray-800"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-4 bg-gray-800"
                {...register("password", {
                  required: {
                    value: true,
                    message: "You must input a password.",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must contain at least 6 characters.",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Your password must contain an uppercase and a lowercase letter.",
                  },
                })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-xl top-2 text-white cursor-pointer"
              >
                <FaEye />
              </span>
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm text-gray-400"
              >
                Select Image:
              </label>
              <input
                type="file"
                id="image"
                {...register("image", { required: "Image is required" })}
                accept="image/*"
                className="file:border-none file:bg-blue-500 file:text-white"
              />
              {errors.image && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-6 text-sm">
              <p className="text-gray-400">Already have an account?</p>
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </a>
            </div>
            <div
              onClick={handleGoogleSign}
              className=" flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
            >
              <FcGoogle size={32} />

              <p>Continue with Google</p>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

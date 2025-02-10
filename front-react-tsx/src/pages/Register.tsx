import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingOverlay/LoadingOverlay";

interface RegisterValues {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  birthdate: Date;
  country: string;
  state: string;
  city: string;
  address: string;
  phoneNumber: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  confirmEmail: Yup.string()
    .email("Invalid email")
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Please confirm your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  birthdate: Yup.date()
    .typeError("Invalid date format")
    .required("Birthdate is required")
    .max(new Date(), "Birthdate cannot be in the future"),

  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State/Province is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),

  phoneNumber: Yup.string().required("Phone number is required"),
});

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "BR", name: "Brazil" },
];

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    try {
      setIsLoading(true);
      const resp = await api.post('/register', { 
        ...data,
        birthdate: data.birthdate.toLocaleDateString(),
        address:  `${data.address}, ${data.city} - ${data.state} (${data.country})`
      });
      if (resp.data.UserConfirmed !== null && !resp.data.UserConfirmed) {
          setIsLoading(false);
          navigate(
            "/confirmAuth",
            {
              state: {
                "email": data.email,
                "password": data.password
              }
            }
          );
        } else {
          setIsLoading(false);
          navigate('/home');
        }
        
      } catch (error) {
        setIsLoading(false);
        console.log(error);
    }
    
  };

  if (isLoading) {
    return <LoadingSpinner message="Submitting..."/>
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                {...register("name")}
                className="border w-full p-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className="border w-full p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Confirm Email</label>
              <input
                type="email"
                {...register("confirmEmail")}
                className="border w-full p-2"
              />
              {errors.confirmEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Birthdate</label>
              <input
                type="date"
                {...register("birthdate")}
                className="border w-full p-2"
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.birthdate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                className="border w-full p-2"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="border w-full p-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Country</label>
              <select
                {...register("country")}
                className="border w-full p-2"
              >
                <option value="">Select a country</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">State / Province</label>
              <input
                type="text"
                {...register("state")}
                className="border w-full p-2"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">City</label>
              <input
                type="text"
                {...register("city")}
                className="border w-full p-2"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                {...register("address")}
                className="border w-full p-2"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                {...register("phoneNumber")}
                className="border w-full p-2"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div />
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

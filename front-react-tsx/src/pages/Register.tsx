import React from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiLock,
  FiGlobe,
  FiMapPin,
  FiHome,
  FiPhone,
  FiCheck,
} from "react-icons/fi";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import ThemeSwitch from "../components/ThemeSwitch";
import NanoLoadingAnimation from "../components/animations/NanoLoadingAnimation";

interface RegisterValues {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
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
  birthdate: Yup.string()
    .required("Birthdate is required")
    .test("is-date", "Invalid date format", (value) => !isNaN(Date.parse(value || "")))
    .test("max-date", "Birthdate cannot be in the future", (value) => {
      if (!value) return false;
      return new Date(value) <= new Date();
    }),
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

interface CardProps {
  title: string;
  fields: (keyof RegisterValues)[];
  control: any;
  errors: any;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = React.memo(
  ({ title, fields, control, errors, children }) => {
    const watchedValues = useWatch({ control, name: fields });

    const isValid = React.useMemo(() => {
      return fields.every((field, index) => {
        const value = watchedValues[index];
        return value !== undefined && value !== null && value !== "" && !errors[field];
      });
    }, [watchedValues, errors, fields]);

    const getCheckIconStyle = () => ({
      transform: isValid ? "rotate(360deg) scale(1)" : "rotate(0deg) scale(0)",
      opacity: isValid ? 1 : 0,
    });

    return (
      <div className="relative bg-base-200 shadow rounded p-6 pt-12 flex-1">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center transition-all duration-300 ease-out"
            style={getCheckIconStyle()}
          >
            <FiCheck className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        {children}
      </div>
    );
  }
);

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      country: "",
      state: "",
      city: "",
      address: "",
      phoneNumber: "",
    },
  });
  const navigate = useNavigate();
  const { setGlobalLoading, setLoadingComponent } = useLoading();

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    try {
      setLoadingComponent(<NanoLoadingAnimation textLoading="Signing Up"/>);
      setGlobalLoading(true);
      const resp = await api.post("/register", {
        ...data,
        birthdate: new Date(data.birthdate).toLocaleDateString(),
        address: `${data.address}, ${data.city} - ${data.state} (${data.country})`,
      });
      if (resp.data.UserConfirmed !== null && !resp.data.UserConfirmed) {
        setGlobalLoading(false);
        navigate("/confirmAuth", {
          state: {
            email: data.email,
            password: data.password,
          },
        });
      } else {
        setGlobalLoading(false);
        navigate("/home");
      }
    } catch (error) {
      setGlobalLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <div className="absolute top-0 right-0 p-4">
        <ThemeSwitch />
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-4">
            <Card
              title="User Information"
              fields={[
                "name",
                "email",
                "confirmEmail",
                "birthdate",
                "password",
                "confirmPassword",
              ]}
              control={control}
              errors={errors}
            >
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-bold">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiUser />
                    </span>
                    <input
                      type="text"
                      placeholder="Full Name"
                      {...register("name")}
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-bold">Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiMail />
                    </span>
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-bold">Confirm Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiMail />
                    </span>
                    <input
                      type="email"
                      placeholder="Confirm Email"
                      {...register("confirmEmail")}
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                  {errors.confirmEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmEmail.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-bold">Birthdate</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiCalendar />
                    </span>
                    <input
                      type="date"
                      {...register("birthdate")}
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                  {errors.birthdate && (
                    <p className="text-red-500 text-sm mt-1">{errors.birthdate.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-bold">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                      className="input input-bordered w-full pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-bold">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiLock />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                      className="input input-bordered w-full pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card
              title="Address"
              fields={["country", "state", "city", "address"]}
              control={control}
              errors={errors}
            >
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-bold">Country</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiGlobe />
                    </span>
                    <select
                      {...register("country")}
                      className="select select-bordered w-full pl-10"
                    >
                      <option value="">Select a country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-bold">State / Province</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiMapPin />
                    </span>
                    <input
                      type="text"
                      placeholder="State / Province"
                      {...register("state")}
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-bold">City</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiMapPin />
                    </span>
                    <input
                      type="text"
                      placeholder="City"
                      {...register("city")}
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-bold">Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiHome />
                    </span>
                    <input
                      type="text"
                      placeholder="Address"
                      {...register("address")}
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card
              title="Contact"
              fields={["phoneNumber"]}
              control={control}
              errors={errors}
            >
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-bold">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiPhone />
                    </span>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      {...register("phoneNumber")}
                      className="input input-bordered w-full pl-10"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className={`
                flex items-center justify-center
                px-6 py-2 rounded-lg font-bold
                transition-colors duration-300
                ${isValid
                  ? "bg-secondary text-black"
                  : "bg-gray-400 text-gray-800 cursor-not-allowed"
                }
              `}
            >
              <FaUserPlus className="mr-2" />
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

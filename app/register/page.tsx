"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
    email: string;
    username: string;
    name: string;
    password: string;
};

const SignUpSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    username: z.string().min(3).max(30),
    name: z.string().min(3).max(30),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters length"),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const Page = () => {
    let route = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        console.log(data);
        const addNewUser = await axios.post("/api/register", data);
        if (addNewUser.status === 201) {
            route.push("/login");
        }
        setLoading(false)
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[350px]  bg-[#ffffff] mx-auto mt-12 md:mt-[5%] p-4 flex flex-col gap-4 rounded-md shadow-md "
        >
            <p className="text-semibold text-[20px] leading-3 mb-8 mt-2">
                Register Form
            </p>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold text-neutral-500">
                    Email
                </label>
                <input
                    type="text"
                    disabled ={loading}
                    {...register("email")}
                    className="w-full px-2 py-2 placeholder:text-neutral-500 bg-neutral-100 outline-none placeholder:leading-6 "
                    placeholder="Email@gmail.com"
                />
                {errors.email && (
                    <p className=" text-red-400 my-1 pl-2">
                        {errors.email?.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold text-neutral-500">
                    User Name
                </label>
                <input
                    type="text"
                    disabled ={loading}
                    {...register("username")}
                    className="w-full px-2 py-2 placeholder:text-neutral-500 bg-neutral-100 outline-none placeholder:leading-6 "
                    placeholder="sara123"
                />
                {errors.username && (
                    <p className=" text-red-400 my-1 pl-2">
                        {errors.username?.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold text-neutral-500">
                    Full Name
                </label>
                <input
                    type="text"
                    disabled ={loading}
                    {...register("name")}
                    className="w-full px-2 py-2 placeholder:text-neutral-500 bg-neutral-100 outline-none placeholder:leading-6 "
                    placeholder="Richard Woods"
                />
                {errors.name && (
                    <p className=" text-red-400 my-1 pl-2">
                        {errors.name?.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold text-neutral-500">
                    Password
                </label>
                <input
                    type="password"
                    disabled ={loading}
                    {...register("password")}
                    autoComplete="on"
                    className="w-full px-2 py-2 placeholder:text-neutral-500 bg-neutral-100  outline-none"
                    placeholder="********"
                />
                {errors.password && (
                    <p className=" text-red-400 my-1 pl-2">
                        {errors.password?.message}
                    </p>
                )}
            </div>
            <button
                disabled ={loading}
                className={`mt-4 px-6 py-2 hover:cursor-pointer rounded-md text-white ${loading ?  "bg-blue-200" : "bg-blue-500"} `}
                type="submit"
            >
                { loading === true ? "Redirecting to login"  : "Register" }
            </button>{" "}
            <span>
                already have an account{" "}
                <Link
                    href="/login"
                    className="text-blue-500 underline font-semibold"
                >
                    Login
                </Link>
            </span>
        </form>
    );
};

export default Page;

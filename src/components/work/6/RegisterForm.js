import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

// กำหนด schema สำหรับ validation ด้วย Yup
const schema = yup
  .object({
    username: yup.string().required("กรุณาใส่ Username").min(3, "Username ต้องมีอย่างน้อย 3 ตัวอักษร"),
    email: yup.string().required("กรุณาใส่ Email").email("รูปแบบ Email ไม่ถูกต้อง"),
    password: yup.string().required("กรุณาใส่ Password").min(6, "Password ต้องมอย่างน้อย 6 ตัวอักษร"),
    confirmPassword: yup
      .string()
      .required("กรุณาใส่ Passwords")
      .oneOf([yup.ref("password"), null], "Password ไม่ตรง"),
  })
  .required();

const RegisterForm = () => {
  // ใช้ useForm hook กับ yupResolver เพื่อเชื่อมโยง validation schema
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ฟังก์ชันที่เรียกเมื่อฟอร์มถูก submit
  const onSubmit = (data) => {
    console.log(data);
    alert("คุณสมัครสำเร็จ");
  };

  return (
    <div className="w-full md:w-[1000px] shadow-lg text-[18px] rounded-xl dark:text-white">
      <span className="flex justify-center bg-gray-200 dark:bg-slate-500 p-4 rounded-t-xl">ข้อ 6 Form Validation</span>
      <div className="p-4 dark:bg-slate-700">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* ชื่อผู้ใช้ */}
          <div className="grid md:grid-cols-3">
            <label htmlFor="username">Username</label>
            <input className="col-span-2 border-2 text-black" type="text" id="username" {...register("username")} />
            {errors.username && <p className="col-span-3 text-red-500">{errors.username.message}</p>}
          </div>

          {/* อีเมล */}
          <div className="grid md:grid-cols-3">
            <label htmlFor="email">Email</label>
            <input className="col-span-2 border-2 text-black" type="email" id="email" {...register("email")} />
            {errors.email && <p className="col-span-3 text-red-500">{errors.email.message}</p>}
          </div>

          {/* รหัสผ่าน */}
          <div className="grid md:grid-cols-3">
            <label htmlFor="password">Password</label>
            <input className="col-span-2 border-2 text-black" type="password" id="password" {...register("password")} />
            {errors.password && <p className="col-span-3 text-red-500">{errors.password.message}</p>}
          </div>

          {/* ยืนยันรหัสผ่าน */}
          <div className="grid md:grid-cols-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input className="col-span-2 border-2 text-black" type="password" id="confirmPassword" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="col-span-3 text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <div className=" flex justify-center">
            <button className="rounded-md bg-slate-400 w-[200px] p-4" type="submit">
              สมัคร
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

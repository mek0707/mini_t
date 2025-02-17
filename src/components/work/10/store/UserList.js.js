import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser, removeUser, updateUser} from "./userSlice";
import NextImage from "next/image.js";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const Image = NextImage.default;

  const [form, setForm] = useState({
    id: null,
    photo: "",
    firstName: "",
    lastName: "",
    prefix: "",
    gender: "",
    age: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({...form, photo: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!form.photo) {
      alert("กรุณาใส่รูปพนักงาน");
      return;
    }
    if (!form.prefix || !form.firstName || !form.lastName) {
      alert("กรุณากรอก ชื่อ-นามสกุลให้ครบ");
      return;
    }
    if (!form.gender) {
      alert("กรุณากรอก เพศ");
      return;
    }
    if (!form.age) {
      alert("กรุณากรอก อายุ");
      return;
    }

    // ถ้ามี id หมายความว่ากำลังแก้ไขข้อมูล
    if (form.id) {
      dispatch(updateUser(form));
    } else {
      // ถ้าไม่มี id แสดงว่าเป็นการเพิ่มข้อมูลใหม่
      const newUser = {
        id: Date.now(), // สร้าง id ใหม่เมื่อเพิ่มผู้ใช้
        photo: form.photo,
        firstName: form.firstName,
        lastName: form.lastName,
        prefix: form.prefix,
        gender: form.gender,
        age: form.age,
      };
      dispatch(addUser(newUser)); // เพิ่มผู้ใช้ใหม่
    }

    // รีเซ็ทฟอร์มหลังจากเพิ่มหรือแก้ไข
    setForm({photo: "", firstName: "", lastName: "", prefix: "", gender: "", age: "", id: null});
  };

  const handleEdit = (user) => {
    setForm({
      id: user.id, // กำหนด id ที่จะใช้ในการแก้ไข
      photo: user.photo,
      firstName: user.firstName,
      lastName: user.lastName,
      prefix: user.prefix,
      gender: user.gender,
      age: user.age,
    });
  };

  console.log(form);
  return (
    <div className="w-full md:w-[1000px] rounded-lg shadow-lg dark:text-white">
      <span className="flex justify-center bg-gray-200 p-4 dark:bg-slate-500 rounded-t-xl">ข้อ 10 Redux Toolkit ข้อมูลพนักงาน</span>
      <div className="p-4 dark:bg-slate-700">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid col-span-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              <input type="file" onChange={handlePhotoUpload} accept="image/*" className="block" />
            </div>
            {form.photo ? <Image src={form.photo} alt="รูปพนักงาน" width={100} height={100} className="" /> : <div className="w-full h-[100px] border flex justify-center items-center">รูปพนักงาน</div>}
            <select name="prefix" value={form.prefix} onChange={handleChange} className="border p-1 w-full dark:text-black">
              <option value="">คำนำหน้า</option>
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
              <option value="นาง">นาง</option>
            </select>

            {/* <input type="text" name="prefix" placeholder="คำนำหน้า" value={form.prefix} onChange={handleChange} className="border p-1 w-full" /> */}
            <input type="text" name="firstName" placeholder="ชื่อ" value={form.firstName} onChange={handleChange} className="border p-1 w-full dark:text-black" />
            <input type="text" name="lastName" placeholder="นามสกุล" value={form.lastName} onChange={handleChange} className="border p-1 w-full dark:text-black" />

            <select name="gender" value={form.gender} onChange={handleChange} className="border p-1 w-full dark:text-black">
              <option value="">เพศ</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>

            <input type="number" name="age" placeholder="อายุ" value={form.age} onChange={handleChange} className="border p-1 w-full dark:text-black" />

            <button type="submit" className="bg-blue-500 text-white p-2 rounded dark:text-black">
              {form.id ? "แก้ไขข้อมูล" : "เพิ่มพนักงาน"}
            </button>
          </div>
        </form>

        <h2 className="text-lg font-bold mt-4">รายชื่อพนักงาน</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border p-2 my-2 flex items-center space-x-4">
              {user.photo && <img src={user.photo} alt="รูปพนักงาน" width={50} height={50} className="" />}
              <div>
                <p>
                  {user.prefix} {user.firstName} {user.lastName} ({user.gender}, อายุ {user.age})
                </p>
              </div>
              <button onClick={() => dispatch(removeUser(user.id))} className="bg-red-500 text-white p-1 rounded">
                ลบ
              </button>
              <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white p-1 rounded">
                แก้ไข
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;

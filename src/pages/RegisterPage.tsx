import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface RegisterForm {
  email: string;
  password: string;
  nickname: string;
  firstName: string;
  lastName: string;
  isKvkkAccepted: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    nickname: "",
    firstName: "",
    lastName: "",
    isKvkkAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.email) newErrors.email = "E-posta boş olamaz.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Geçerli bir e-posta girin.";

    if (!form.password) newErrors.password = "Şifre boş olamaz.";
    else if (form.password.length < 6) newErrors.password = "Şifre en az 6 karakter olmalı.";
    else if (form.password.length > 50) newErrors.password = "Şifre en fazla 50 karakter olabilir.";

    if (!form.nickname) newErrors.nickname = "Kullanıcı adı boş olamaz.";
    else if (form.nickname.length < 3) newErrors.nickname = "Kullanıcı adı en az 3 karakter olmalı.";
    else if (form.nickname.length > 20) newErrors.nickname = "Kullanıcı adı en fazla 20 karakter olabilir.";

    if (form.firstName.length < 3) newErrors.firstName = "İsim en az 3 karakter olabilir.";
    else if (form.firstName.length > 50) newErrors.firstName = "İsim en fazla 50 karakter olabilir.";

    if (form.lastName.length < 3) newErrors.lastName = "Soyisim en az 3 karakter olabilir.";
    else if (form.lastName.length > 50) newErrors.lastName = "Soyisim en fazla 50 karakter olabilir.";

    if (!form.isKvkkAccepted) newErrors.isKvkkAccepted = "KVKK onayı zorunludur.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setApiError("");
      const res = await api.post("/User/register", form);
      console.log("✅ Kayıt başarılı:", res.data);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/"); // ana sayfaya yönlendir
      }
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Beklenmeyen bir hata oluştu.");
      console.error("❌ API hatası:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-md bg-white rounded shadow p-6 mx-auto mt-16">
      <h2 className="text-2xl font-semibold mb-4 text-center">Kayıt Ol</h2>

      {apiError && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-1">Şifre</label>
          <input type="password" name="password" value={form.password} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="block mb-1">Kullanıcı Adı</label>
          <input type="text" name="nickname" value={form.nickname} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
          {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}
        </div>

        <div>
          <label className="block mb-1">İsim</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block mb-1">Soyisim</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="isKvkkAccepted" checked={form.isKvkkAccepted} onChange={handleChange}
            className="mr-2" />
          <label className="text-sm">KVKK metnini okudum ve onaylıyorum.</label>
        </div>
        {errors.isKvkkAccepted && <p className="text-red-500 text-sm">{errors.isKvkkAccepted}</p>}

        <button
          type="submit"
          className="w-full !bg-blue-600 text-white py-2 rounded-lg shadow-md transition duration-200 hover:!bg-blue-700 active:scale-95">
          Kayıt Ol
        </button>
      </form>
    </div>
    
  );
};

export default RegisterPage;

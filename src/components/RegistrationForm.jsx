import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { addUser as addUserAction } from "../actions/userActions"; // Проверьте путь
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./RegistrationForm.module.css";

// Схема валидации с помощью Zod
const registrationSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
  confirmPassword: z.string(),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  nickname: z.string().min(3, "Никнейм должен содержать минимум 3 символа"),
  age: z.number()
    .or(z.string().regex(/^\d+$/, "Возраст должен быть числом").transform(Number)),
  gender: z.enum(["Мужской", "Женский", "Другой"], "Выберите пол"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли должны совпадать",
  path: ["confirmPassword"],
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Инициализируем navigate
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    console.log("Данные для регистрации:", data);
    
    try {
      // Вызов действия для добавления пользователя
      dispatch(addUserAction({
        email: data.email,
        name: data.name,
        nickname: data.nickname,
        age: data.age,
        gender: data.gender,
      }));
      
      alert('Регистрация успешна!');
      navigate('/home'); // Переход на домашнюю страницу
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      alert('Произошла ошибка при регистрации. Попробуйте еще раз.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className={`w-full max-w-md p-6 bg-white rounded-lg shadow-md ${styles.formContainer}`}>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Поля формы */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Пароль</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Повторите пароль</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Имя</label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Никнейм</label>
            <input
              type="text"
              {...register("nickname")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.nickname && <p className="text-red-500">{errors.nickname.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Возраст</label>
            <input
              type="number"
              {...register("age")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Пол</label>
            <select
              {...register("gender")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выберите</option>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
              <option value="Другой">Другой</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Привязка действия к компоненту
const mapDispatchToProps = {
  addUser: addUserAction,
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
import { useForm } from "react-hook-form";
import logo from "../../images/add.png";

import { useDispatch } from "react-redux";
import clsx from "clsx";
import styles from "./Register.module.scss";

function Register(props) {
      const {
            handleSubmit,
            register,
            formState: { errors },
      } = useForm({ mode: "onChange" });

      const dispatch = useDispatch();

      const onSubmit = (data) => {
            console.log(data);
            // dispatch(register(data));
      };

      console.log(errors);

      return (
            <>
                  <section className={styles.container}>
                        <div className={styles.wrapper}>
                              <img src={logo} alt="Логотип" className={styles.logo} />
                              <h1 className={styles.title}>Greetings!!</h1>
                              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                    <span className={styles.form__title}>E-mail</span>
                                    <input
                                          className={styles.input}
                                          placeholder="E-mail"
                                          autoComplete="off"
                                          {...register("email", {
                                                required: true,
                                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                          })}
                                    />
                                    {errors.email && (
                                          <span className={styles.error}>
                                                Email должен соответствовать паттерну
                                                example@example.com
                                          </span>
                                    )}
                                    <span className={styles.form__title}>Password</span>
                                    <input
                                          className={styles.input}
                                          name="password"
                                          type="password"
                                          placeholder="Password"
                                          {...register("password", {
                                                required: true,
                                                minLength: 8,
                                                maxLength: 50,
                                                pattern: /^(?=.*[A-Z])[a-zA-Z0-9]*$/,
                                          })}
                                    />
                                    {errors.password && (
                                          <span className={styles.error}>
                                                Пароль должен быть более 8 и не более 50 символов, и
                                                содержать хотя бы одну большую букву
                                          </span>
                                    )}

                                    <button
                                          type="submit"
                                          className={clsx(
                                                styles.button,
                                                styles.active,
                                                styles.primary
                                          )}
                                          disabled={
                                                (errors.email && true) || (errors.password && true)
                                          }>
                                          Register
                                    </button>
                              </form>
                              <div className={styles.link}>
                                    <p className={styles.text}>Already registered?</p>
                                    <p
                                          // onClick={changeToLogin}
                                          className={clsx(styles.text, styles.text__underbottom)}>
                                          Login
                                    </p>
                              </div>
                        </div>
                  </section>
            </>
      );
}

export default Register;

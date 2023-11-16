import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({sendEmailToParent}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logError, setLogError] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user.id);

        sendEmailToParent(email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        console.log('message that login goes wrong');
        setLogError(true);
      });
  };

  const ErrorMessage = () => {
    return(
      <p className="error-login">User doesn't exist, try to Sign Up</p>
    )
  }

  return (
    <>
      <main>
        <section>
          <div className="login__main">
            <h1 className="login__title title">Welcome to <span>ComIT</span> chat</h1>

            <form className="login__form">
              <div>
                <label htmlFor="email-address"></label>
                <input className="login__mail deep"
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  autoComplete="username"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password"></label>
                <input className="login__password deep"
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button className="login__btn" onClick={onLogin}>Login</button>
              </div>
            </form>

            <p className="text-sm text-white text-center login__link">
              <strong>No account yet?</strong> <NavLink to="/signup"><strong>Sign up</strong></NavLink>
            </p>

            {logError && <ErrorMessage/>}
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
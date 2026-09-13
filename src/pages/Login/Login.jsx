import "./Login.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


function Login() {


    const navigate = useNavigate();


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);



    const handleLogin = async (e)=>{

        e.preventDefault();


        if(!email || !password){

            alert("Please fill all fields.");
            return;

        }



        try{


            setLoading(true);


            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            alert("Login Successful!");


            navigate("/");


        }
        catch(error){


            switch(error.code){


                case "auth/invalid-email":
                    alert("Invalid email address.");
                    break;


                case "auth/user-not-found":
                    alert("No account found.");
                    break;


                case "auth/wrong-password":
                    alert("Incorrect password.");
                    break;


                case "auth/invalid-credential":
                    alert("Invalid email or password.");
                    break;


                default:
                    alert(error.message);

            }


        }
        finally{

            setLoading(false);

        }


    };



    return (


        <section className="login">


            <div className="login-container">


                <h1>Login</h1>



                <form onSubmit={handleLogin}>


                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />



                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />



                    <button 
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                            ? "Logging In..."
                            : "Login"
                        }


                    </button>



                </form>



                <p>

                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>


                </p>



            </div>



        </section>


    );


}


export default Login;
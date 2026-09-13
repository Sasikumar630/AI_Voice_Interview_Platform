import "./Register.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";


function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {

        e.preventDefault();


        if (!name || !email || !password) {
            alert("Please fill all fields.");
            return;
        }


        try {

            setLoading(true);


            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


            // Save user's name in Firebase profile
            await updateProfile(userCredential.user, {
                displayName: name
            });


            alert("Registration Successful!");

            navigate("/login");


        } catch (error) {

            switch(error.code){

                case "auth/email-already-in-use":
                    alert("Email already registered.");
                    break;


                case "auth/invalid-email":
                    alert("Invalid email address.");
                    break;


                case "auth/weak-password":
                    alert("Password should be at least 6 characters.");
                    break;


                default:
                    alert(error.message);

            }


        } finally {

            setLoading(false);

        }

    };


    return (

        <section className="register">

            <div className="register-container">


               


                <form onSubmit={handleRegister}>


                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />


                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />


                    <input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />


                    <button type="submit" disabled={loading}>

                        {
                            loading 
                            ? "Creating Account..."
                            : "Register"
                        }

                    </button>


                </form>


             


            </div>

        </section>

    );

}


export default Register;
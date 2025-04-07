import { useState, JSX } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
// import { ReactComponent as EmailIcon } from "../assets/email.svg";
// import { ReactComponent as PasswordIcon } from "../assets/passwordKey.svg";
import EmailIcon from "../assets/email.svg";
import PasswordIcon from "../assets/passwordKey.svg";
import Logo from '../assets/sona2.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../Redux/Store";
import endpoints from "../api/endpoint";
import loginValidation from "./loginValidation";
import InputField from "./InputField";
import { setCredentials } from "../Redux/authSlice";
import PrimaryButton from "./PrimaryButton";


const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema: loginValidation,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await axios.post(endpoints.USERS_AUTH_ENDPOINT, values);
                dispatch(setCredentials(response.data));
                setLoading(false);
                navigate("/");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                toast.error("Password or Username is incoreect");
                setLoading(false);
                console.log(err);
            }
        },
    });

    return (

        <section className="w-full h-fit flex flex-col gap-2 md:gap-20 items-center justify-center text-lg animate-slowfade py-8">
            <img src={Logo} className="w-[300px] h-40" alt="Sonatrach" />
            {/* <LogoBackoffice className="w-[300px] h-40" /> */}
            <div className=" w-[600px] p-3 h-fit shadow-lg rounded ">
                <form onSubmit={formik.handleSubmit} className="w-full p-8 md:p-8">
                    <div className="space-y-6 md:space-y-8 w-full pb-6">
                        {["email", "password"].map((fieldName) => (
                            <InputField
                                key={fieldName}
                                Icon={getIcon(fieldName)}
                                fieldName={fieldName}
                                label={fieldName}
                                type={getFieldType(fieldName)}
                                placeholder={`enter${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
                                formik={formik}
                                borderStyle="hover:border-primaryColor"
                            />
                        ))}
                    </div>
                    <PrimaryButton bgColor="bg-[#FF4B00]" type="submit" width="full" onClick={formik.handleSubmit} text="Connect" isLoading={loading} />
                </form>
            </div>
        </section>
    );
};

const getIcon = (fieldName: string) => {
    const icons: Record<string, JSX.Element> = {
        username: <img src={EmailIcon} alt="" className={`start-2 w-5 scale-90 h-fit absolute bottom-[23px] duration-150 text-gray-600 `} />,
        // <EmailIcon className={`start-2 w-5 scale-90 h-fit absolute bottom-[23px] duration-150 text-gray-600 `} />,
        password: <img src={PasswordIcon} alt="" className={`start-2 w-5 scale-90 h-fit absolute bottom-[23px] duration-150 text-gray-600 `} />,
        // <PasswordIcon className={`start-2 w-5 h-fit absolute bottom-[23px] duration-150 text-gray-600`} />,
    };
    return icons[fieldName];
};

const getFieldType = (fieldName: string) => {
    const fieldTypes: Record<string, "text" | "password"> = {
        username: "text",
        password: "password",
    };
    return fieldTypes[fieldName];
};

export default LoginForm;

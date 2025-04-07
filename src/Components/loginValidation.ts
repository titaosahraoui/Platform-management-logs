import * as Yup from 'yup';

const loginValidation = Yup.object({
  email: Yup.string()
    .max(255, 'Max characters 255')
    .required('Required')
    .email('Invalid email'),
  password: Yup.string()
    .max(255, 'Max characters 255')
    .min(6, 'Min characters 6')
    .required('Required'),
});

export default loginValidation;

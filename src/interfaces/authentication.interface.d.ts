interface LoginResponse {
  status: string;
  message: string;
  data: UserLoginDetail;
}

interface UserLoginDetail {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

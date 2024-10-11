import { instance } from './instance';

export class AuthApi {
  static async login(formValues: any) {
    const { data } = await instance({
      method: 'POST',
      url: 'auth/login',
      data: formValues,
    });

    return data;
  }

  static async register(formValues: any) {
    const { data } = await instance({
      method: 'POST',
      url: 'auth/register',
      data: formValues,
    });
    return data;
  }

  static async forgotPassword(formValues: any) {
    const { data } = await instance({
      method: 'POST',
      url: 'auth/forgot-password',
      data: formValues,
    });
    return data;
  }

  static async resetPassword(formValues: any) {
    const { data } = await instance({
      method: 'POST',
      url: 'auth/reset-password',
      data: formValues,
    });
    return data;
  }

  static async changePassword(formValues: any) {
    const { data } = await instance({
      method: 'POST',
      url: 'auth/change-password',
      data: formValues,
    });
    return data;
  }

  static async activation(formValues: any) {
    const { data } = await instance({
      method: 'POST',
      url: 'auth/activation',
      data: formValues,
    });
    return data;
  }

  static async resendCode(formValues: any) {
    const { data } = await instance({
      method: 'POST',
      url: 'auth/resend-code',
      data: formValues,
    });
    return data;
  }
}

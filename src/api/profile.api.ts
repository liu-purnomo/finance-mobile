import { instance } from './instance';

export class ProfileApi {
  static async update(formValues: any) {
    const { data } = await instance({
      method: 'PUT',
      url: 'profile',
      data: formValues,
    });
    return data;
  }

  static async detail() {
    const { data } = await instance({
      method: 'GET',
      url: 'profile',
    });

    return data;
  }

  static async delete(formValues: any) {
    const { data } = await instance({
      method: 'GET',
      url: 'profile',
      data: formValues,
    });

    return data;
  }
}

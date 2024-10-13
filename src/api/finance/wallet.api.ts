import { instance } from '../instance';

export class WalletApi {
  static async index() {
    const { data } = await instance({
      method: 'GET',
      url: 'finance/wallet',
    });
  }

  static async create(formValues: any) {
    const { data } = await instance({
      method: 'POST',
      url: 'finance/wallet',
      data: formValues,
    });
    return data;
  }

  static async update(formValues: any) {
    const { data } = await instance({
      method: 'PUT',
      url: 'finance/wallet/' + formValues.id,
      data: formValues,
    });
    return data;
  }

  static async delete(formValues: any) {
    const { data } = await instance({
      method: 'DELETE',
      url: 'finance/wallet/' + formValues.id,
      data: formValues,
    });
    return data;
  }
}

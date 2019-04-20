import { Authenticator } from '../index';
import { httpMock } from '../../__mocks__';

describe('Authenticator Service', () => {
  let service: Authenticator;

  beforeEach(() => {
    service = new Authenticator(httpMock);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should make a get request to the api to check users token validity.', async () => {
    const httpGet = jest.spyOn(httpMock, 'get');

    await service.checkValidity();

    expect(httpGet).toHaveBeenCalled();
  });

  it('should make a post request to the api to log the user in.', async () => {
    const httpPost = jest.spyOn(httpMock, 'post');

    await service.login({ staffId: 'someStaffID', password: 'somePassword' });

    expect(httpPost).toHaveBeenCalled();
  });

  it('should make a post request to the api to request password reset.', async () => {
    const httpPost = jest.spyOn(httpMock, 'post');

    await service.requestPasswordReset({ staffId: 'someStaffID' });

    expect(httpPost).toHaveBeenCalled();
  });
});
import { OvertimeService } from '../index';
import { httpMock } from '../../__mocks__';

describe('AuthService Service', () => {
  let service: OvertimeService;

  beforeEach(() => {
    service = new OvertimeService(httpMock);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should initialise staff data.', async () => {
    // @ts-ignore-start
    const statistics = jest.spyOn(service, 'fetchStaffClaimStatistics').mockResolvedValue({});
    // @ts-ignore-start
    const pendingClaim = jest.spyOn(service, 'fetchStaffPendingClaim').mockResolvedValue({});
    // @ts-ignore-start
    const activities = jest.spyOn(service, 'fetchStaffActivities').mockResolvedValue([{}]);


    const result = await service.initialiseStaffData();

    expect(result).toHaveLength(3);
    expect(statistics).toHaveBeenCalled();
    expect(pendingClaim).toHaveBeenCalled();
    expect(activities).toHaveBeenCalled();
  });

  it('should initialise staff data.', async () => {
    // @ts-ignore-start
    jest.spyOn(service, 'fetchStaffClaimStatistics').mockRejectedValue('err');

    try {
      await service.initialiseStaffData();
    } catch(e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should fetch staff data.', async () => {
    const httpGet = jest.spyOn(httpMock, 'get');

    await service.fetchStaffClaimStatistics();
    await service.fetchStaffPendingClaim();
    await service.fetchStaffActivities();

    expect(httpGet).toHaveBeenCalledTimes(3);
  });

  it('should make a post request to create overtime request.', () => {
    const httpGet = jest.spyOn(httpMock, 'post');
    const overtimeRequest = { weekday: 2, weekend: 3 };
    const url = 'http://init.overtime-api.invergent-technologies.com/users/claim';

    service.createOvertimeRequest(overtimeRequest);

    expect(httpGet).toHaveBeenCalledWith(url, overtimeRequest, service.options);
  });

  it('should make a delete request to cancel pending claim.', () => {
    const httpGet = jest.spyOn(httpMock, 'delete');
    const url = 'http://init.overtime-api.invergent-technologies.com/users/claims/1';

    service.cancelClaim(1);

    expect(httpGet).toHaveBeenCalledWith(url, service.options);
  });
});

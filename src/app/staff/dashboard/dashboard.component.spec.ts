import { DashboardComponent } from './dashboard.component';
import {
  authServiceMock, overtimeServiceMock
} from '../../__mocks__';

describe('Comfirm password reset', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    component = new DashboardComponent(authServiceMock, overtimeServiceMock);
  });

  it('should should fetch staff details and claim statistics when component loads', () => {
    const initData = jest.spyOn(overtimeServiceMock, 'initialiseStaffData');

    component.ngOnInit();

    expect(initData).toHaveBeenCalled();
  });

  it('should display error message if an error occurs while fetching staff data.', () => {
    const initData = jest.spyOn(overtimeServiceMock, 'initialiseStaffData').mockRejectedValue('err');

    try {
      component.ngOnInit();
    } catch(e) {
      expect(initData).toHaveBeenCalled();
      expect(component.errorMessage).toBe('Unable to load content. Please reload');
      expect(component.showLoader).toBe(false);
    }
  });
});

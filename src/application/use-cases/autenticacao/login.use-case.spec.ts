import { AutenticacaoEntity } from '@/domain/entities';
import { ILogin } from '@/domain/use-cases';
import { createMock } from '@golevelup/nestjs-testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { LoginUseCase } from './login.use-case';
// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let httpService: HttpService;

  const mockLoginData = {
    cpf: '',
    accessToken:
      'eyJraWQiOiJaSlZKVEZsaTExSDhEMmFieGJYRG5OUkV4blRzS2xyYmdpeE1reWM2VFwvWT0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiOGYxOTVjN2ItYzk2Mi00NjQzLWE2ZDItZDhmM2VlY2UxMTA5Iiwic3ViIjoiNTMzYjRiOGQtOTU3My00MTQxLWE3MzAtNjM0MjE5YjMxMWY1IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcxMDQ2NTM5MiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNWZLM2dIQVVQIiwiZXhwIjoxNzEwNDY4OTkyLCJpYXQiOjE3MTA0NjUzOTIsImp0aSI6ImFmOTdkZmE2LWMwZTMtNDUzZS1hNTJlLTFhODFhZmIyZjAxYyIsImNsaWVudF9pZCI6IjIwaGFmNW0yNTRqNW4zc2J0Z2psYzNmZW1pIiwidXNlcm5hbWUiOiIxMjM0NTY3ODkwMCJ9.Fc7HYkJC6DhjU2i5IcPrjq6khXtYjKvguPQuL5qCDcPEtE1zMoYd74Q9WF8x8Lx9AuDggrQStYAbUQ-mX-GJv6JpIdpWvRM1IrokZlayd0hzdfJatNHMewTU-_3fBf3ZKgPzh7Jw8xgRvPRKQBrws5FHIWXTJBbHcte2OHRMNEymOe8wAzovbFbewAsvwwfiq_R0kIs_QrYmv4x7xAF3hdUK71fkpow9ZXinG7qButaBb923jkxfSWCXrEi11RXTDRdm9S1etYO1qRN5GDXfsCt8M6MROnrvEiMBGZ1u3uxbM8Yq9NGVtF8uYktsHg_7lh11wln9ltkn3YtlDG1bIw',
    refreshToken:
      'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.ISjry2v31Z_Gb99POuEJYJWXzjPhIrxtcac2e-aCJOos-hfNhcXLiw9h_xOHfnPs5uww0UYhkO3TAVoB-eMzDOtIamtJ91PLOD6NBN-7oJOlXAoCQ0SCYsdAz8XiV0b4yN-PAgj2BdyLTRoDzYpie5zctawBFC3jlyAWMgGbrCK-b4aM3c2YU9a76mUKVB5ZQneeNlTjVXiWBzSh74pq5UOvpONJvN4ff1DVJWx9TGoRRgWY6XyyVzdtuxU86QE5j1ph4xqw1RdeKORQqGexljnIjuqA13yULiTrvcNeIMGoO5XcitdQSYzRHEs_4ZvGH8WJajV2aWBsneQ9f5xQUA.rfgkyhZH0DMtdFzm.wKtvkJji0GsA6powOVIgi43cVK9d25ThQ4jxvGnxCdz15dr4jqVCtuZHnfN8IyauBS0yKJaNDsGs27wP7rbdFSK23Qk1KgeZVO1o_hyyMKYCfH7yksGL1wLUdnGkUvV87pCmJEEVrOnNEcUJI4ILvDSc0YDrBiTAxnvCzppvtcqR4CPPqdhbdaynYWyquYnwHCum1Y3CvdNHcLf0aqfOvysGfD2qj0E5mX4UaCl-Y2pyibQflEFHmuTW-zRkgZtq2O4PIDvVU13lkXPgfTcoCDJJ06FhUhNjkW3_gXE8kTrEtdvUwDd17Gk6smaX8BwJMqZs5lJ86VZlo6nL15kKieAiwLf3uHZY1ef-y3bjtmeviwzHVqSIaNYxLlvQlgDFvHnHagoiLuMESMADDewgXJqFN6ve9zzEu91yfHhqtAQWtTLQZ2DyjWnb30YrzdXVzc6kTOuy_mTwESyvcTizcOqFSm7sRaRebGGoG7mvpUO00MfmCrTRSjI9fn7ja87_6lqIDB2j8gitp6rtiRAJDe--BgaXVXBNZhyJPxjryhE0uFl9GSG2JozZma-IjsoR3Y75_m0905eMcy3cabLBLKbuuoI4lVd_wqB4GLySF6o6r8071er1eOA7eKLYesFDY6PrFf2yJ5aC-uxZapUQaVeS6p0W6Q7vHCS4Rb80__aO11UMWgtqZ0ySwzphI3hryijbPVZIIrpnvSlm1p7Efst_YX6dzZp7oaF079F08U0AFv9yQo5mRECmBFE77GEOOf-5gXrZZ-_Se5IteMfpXI_hjE0kQdPr78rw5tSIMPqZQKL-49Ifj1e9ZHTS14rlkJN8WYmOF5fJaiBrcUn1SKKQ2CGZfkTOYLif6nTPzlKzeQlKvznuNhjZnST63uvip6UkvHWYEAwrkgXFHBMxsCXpVqwH0sT7YPB75JR5nvN9cRXhmWhjG4Qw0gMW7rBi2y4oVEP8rZsa5zXVKe6GrSm8hrHQb5ASKvxKyXBxnvCKRXwqT2B1A-Lj-6-jaVnzO1aaG9oWS9ID3jyWx_MKipMyV-FXCa7s-qrAbx0ytLnVVL_vSmIQdvR6257R761Az9FdDg6iJNlu8vKVnGzgub6N0E5x_6bgSlnQPKy49A5OzdDgCxyqU1d-i8R4aIBRetT6zESz5PtyV0Z5fjqOgw_8nQysX2PIVyYvLA2Y_zCpJ55gSQgo.ysqNRczg38Qv-qW7Jt_5pg',
    type: 'Bearer',
    expiresIn: 3600,
  };

  beforeEach(async () => {
    httpService = createMock<any>();
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        LoginUseCase,
        {
          provide: ILogin,
          useValue: LoginUseCase,
        },
      ],
    }).compile();

    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should be defined', () => {
    expect(loginUseCase).toBeDefined();
  });

  it('should login', async () => {
    const login = new AutenticacaoEntity({
      cpf: '',
      accessToken: mockLoginData.accessToken,
      refreshToken: mockLoginData.refreshToken,
      type: mockLoginData.type,
      expiresIn: mockLoginData.expiresIn,
    });

    mockedAxios.post.mockResolvedValue({
      data: mockLoginData,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    (await loginUseCase.execute({ cpf: '11111111111' })).subscribe((data) => {
      expect(data.accessToken).toEqual(login.accessToken);
      expect(data.cpf).toEqual('11111111111');
    });
  });
});

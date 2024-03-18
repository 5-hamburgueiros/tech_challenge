import { SignUpEntity } from '@/domain/entities';
import { ISignUp } from '@/domain/use-cases';
import { createMock } from '@golevelup/nestjs-testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { SignUpUseCase } from './sign-up.use-case';
// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SignupUseCase', () => {
  let signupUseCase: SignUpUseCase;
  let httpService: HttpService;

  const mockSignupData = {
    message: 'User created successfully',
  };

  beforeEach(async () => {
    httpService = createMock<any>();
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        SignUpUseCase,
        {
          provide: ISignUp,
          useValue: SignUpUseCase,
        },
      ],
    }).compile();

    signupUseCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('should be defined', () => {
    expect(signupUseCase).toBeDefined();
  });

  it('should login', async () => {
    const signup = new SignUpEntity({
      message: 'User created successfully',
    });

    mockedAxios.post.mockResolvedValue({
      data: mockSignupData,
      status: 201,
      statusText: 'Created',
      headers: {},
      config: {},
    });

    (await signupUseCase.execute({ cpf: '11111111111' })).subscribe((data) => {
      expect(data.message).toEqual('User created successfully');
    });
  });
});

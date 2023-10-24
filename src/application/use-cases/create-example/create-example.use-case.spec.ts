import { ExampleEntity } from '@/domain/entities';
import { IExampleRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { CreateExampleUseCase } from './create-example.use-case';

jest.mock('@/common/id-generator');

const fakeDate = new Date('2023-01-01T00:00:00.000Z');
const exampleEntity = new ExampleEntity({
  id: '9dd65950-6c54-4276-8c16-f50bb7496145',
  name: 'Foo Bar',
  email: 'foo@bar.com',
  active: true,
  createdAt: fakeDate.toISOString(),
  updatedAt: fakeDate.toISOString(),
});

describe('CreateExampleUseCase', () => {
  const exampleRepositoryMock = createMock<IExampleRepository>({});
  const createExampleUseCase = new CreateExampleUseCase(exampleRepositoryMock);

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(fakeDate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('execute', () => {
    it('should create example sucessfully', async () => {
      const createMockSpy = jest
        .spyOn(exampleRepositoryMock, 'create')
        .mockResolvedValueOnce(exampleEntity);
      const result = await createExampleUseCase.execute({
        name: exampleEntity.name,
        email: exampleEntity.email,
      });
      expect(createMockSpy).toBeCalledTimes(1);
      expect(result).toMatchInlineSnapshot(`
        ExampleEntity {
          "active": true,
          "createdAt": "2023-01-01T00:00:00.000Z",
          "email": "foo@bar.com",
          "id": "9dd65950-6c54-4276-8c16-f50bb7496145",
          "name": "Foo Bar",
          "updatedAt": "2023-01-01T00:00:00.000Z",
        }
      `);
    });
  });
});

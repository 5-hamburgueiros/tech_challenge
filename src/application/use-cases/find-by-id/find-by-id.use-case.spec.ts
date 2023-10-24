import { ExampleEntity } from '@/domain/entities';
import { IExampleRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { FindByIdUseCase } from './find-by-id.use-case';

const fakeDate = new Date('2023-01-01T00:00:00.000Z');
const exampleEntity = new ExampleEntity({
  id: '9dd65950-6c54-4276-8c16-f50bb7496145',
  name: 'Foo Bar',
  email: 'foo@bar.com',
  active: true,
  createdAt: fakeDate.toISOString(),
  updatedAt: fakeDate.toISOString(),
});

describe('FindByIdUseCase', () => {
  const exampleRepositoryMock = createMock<IExampleRepository>({});
  const findByIdUseCase = new FindByIdUseCase(exampleRepositoryMock);

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe('execute', () => {
    it('should return found example sucessfully', async () => {
      const findByIdMockSpy = jest
        .spyOn(exampleRepositoryMock, 'findById')
        .mockResolvedValueOnce(exampleEntity);
      const result = await findByIdUseCase.execute({
        id: exampleEntity.id,
      });
      expect(findByIdMockSpy).toBeCalledTimes(1);
      expect(findByIdMockSpy).toBeCalledWith({
        id: exampleEntity.id,
      });
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

import { ExampleEntity } from '@/domain/entities';
import { ExampleModelTypeOrm } from '@/infra/database/typerom/model';
import { createMock } from '@golevelup/nestjs-testing';
import { Repository } from 'typeorm';
import { ExampleRepositoryTypeOrm } from './example.repository';

const fakeDate = new Date('2023-01-01T00:00:00.000Z');
const exampleEntity = new ExampleEntity({
  id: '9dd65950-6c54-4276-8c16-f50bb7496145',
  name: 'Foo Bar',
  email: 'foo@bar.com',
  active: true,
  createdAt: fakeDate.toISOString(),
  updatedAt: fakeDate.toISOString(),
});

describe('ExampleRepositoryTypeOrm', () => {
  const typeOrmRepositoryMock = createMock<Repository<ExampleModelTypeOrm>>({});
  const exampleRepository = new ExampleRepositoryTypeOrm(typeOrmRepositoryMock);

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create example sucessfully', async () => {
      const dbModel = ExampleModelTypeOrm.FromEntity(exampleEntity);
      const saveMock = jest
        .spyOn(typeOrmRepositoryMock, 'save')
        .mockResolvedValueOnce(dbModel);
      const result = await exampleRepository.create({
        example: exampleEntity,
      });
      expect(saveMock).toBeCalledTimes(1);
      expect(saveMock).toBeCalledWith(dbModel);
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

  describe('findById', () => {
    it('should fetch example by id sucessfully', async () => {
      const findOneByIdMock = jest
        .spyOn(typeOrmRepositoryMock, 'findOneBy')
        .mockResolvedValueOnce(ExampleModelTypeOrm.FromEntity(exampleEntity));
      const result = await exampleRepository.findById({
        id: exampleEntity.id,
      });
      expect(findOneByIdMock).toBeCalledTimes(1);
      expect(findOneByIdMock).toBeCalledWith({
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

  describe('fetchAllByActiveStatus', () => {
    it('should fetch examples by status sucessfully', async () => {
      const findByStatusMock = jest
        .spyOn(typeOrmRepositoryMock, 'findBy')
        .mockResolvedValueOnce([ExampleModelTypeOrm.FromEntity(exampleEntity)]);
      const result = await exampleRepository.fetchAllByActiveStatus({
        isActive: exampleEntity.active,
      });
      expect(findByStatusMock).toBeCalledTimes(1);
      expect(findByStatusMock).toBeCalledWith({
        isActive: exampleEntity.active,
      });
      expect(result).toMatchInlineSnapshot(`
        Array [
          ExampleEntity {
            "active": true,
            "createdAt": "2023-01-01T00:00:00.000Z",
            "email": "foo@bar.com",
            "id": "9dd65950-6c54-4276-8c16-f50bb7496145",
            "name": "Foo Bar",
            "updatedAt": "2023-01-01T00:00:00.000Z",
          },
        ]
      `);
    });
  });
});

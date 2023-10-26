import { ClienteEntity } from '@/domain/entities';
import { DocumentoCadastradoException } from '@/domain/exceptions';
import { IClienteRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateClienteUseCase } from './create-cliente.use-case'; // Adjust the import path as needed

describe('CreateClienteUseCase', () => {
  let createClienteUseCase: CreateClienteUseCase;
  let clienteRepository: IClienteRepository;

  const mockClienteData = {
    documento: '1234567890',
    email: 'test@example.com',
    nome: 'John Doe',
  };

  beforeEach(async () => {
    clienteRepository = createMock<IClienteRepository>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClienteUseCase,
        {
          provide: IClienteRepository,
          useValue: clienteRepository,
        },
      ],
    }).compile();

    createClienteUseCase =
      module.get<CreateClienteUseCase>(CreateClienteUseCase);
  });

  it('should be defined', () => {
    expect(createClienteUseCase).toBeDefined();
  });

  it('should create a new cliente', async () => {
    const createdCliente = new ClienteEntity({
      id: undefined,
      documento: mockClienteData.documento,
      nome: mockClienteData.nome,
      email: mockClienteData.email,
    });
    const clienteRepositoryFindByDocumentSpy = jest
      .spyOn(clienteRepository, 'findByDocument')
      .mockResolvedValue(null);
    const clienteRepositoryCreateSpy = jest
      .spyOn(clienteRepository, 'create')
      .mockResolvedValue(createdCliente);

    const result = await createClienteUseCase.execute(mockClienteData);

    expect(result).toEqual(createdCliente);
    expect(clienteRepository.findByDocument).toHaveBeenCalledWith({
      document: mockClienteData.documento,
    });
    expect(clienteRepository.create).toHaveBeenCalledWith({
      cliente: expect.any(ClienteEntity),
    });
    expect(clienteRepositoryFindByDocumentSpy).toHaveBeenCalled();
    expect(clienteRepositoryCreateSpy).toHaveBeenCalled();
  });

  it('should throw DocumentoCadastradoException if the document already exists', async () => {
    // Mock that an existing client with the same document is found
    const clienteRepositoryFindByDocumentSpy = jest
      .spyOn(clienteRepository, 'findByDocument')
      .mockResolvedValue(
        new ClienteEntity({
          id: 'fake-id',
          ...mockClienteData,
        }),
      );

    await expect(createClienteUseCase.execute(mockClienteData)).rejects.toThrow(
      DocumentoCadastradoException,
    );
    expect(clienteRepositoryFindByDocumentSpy).toHaveBeenCalled();
  });
});

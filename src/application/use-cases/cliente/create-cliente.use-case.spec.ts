import { ClienteEntity, SignUpEntity } from '@/domain/entities';
import { DocumentoCadastradoException } from '@/domain/exceptions';
import { IClienteRepository } from '@/domain/repository';
import { createMock } from '@golevelup/nestjs-testing';
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { map, of } from 'rxjs';
import { SignUpUseCase } from '../autenticacao/sign-up.use-case';
import { CreateClienteUseCase } from './create-cliente.use-case'; // Adjust the import path as needed

describe('CreateClienteUseCase', () => {
  let createClienteUseCase: CreateClienteUseCase;
  let clienteRepository: IClienteRepository;
  let signup: SignUpUseCase;

  const mockClienteData = {
    documento: '1234567890',
    email: 'test@example.com',
    nome: 'John Doe',
  };

  const createSignup = new SignUpEntity({
    message: 'User created successfully',
  });

  beforeEach(async () => {
    clienteRepository = createMock<IClienteRepository>();
    signup = createMock<any>();
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CreateClienteUseCase,
        SignUpUseCase,
        {
          provide: IClienteRepository,
          useValue: clienteRepository,
        },
      ],
    }).compile();

    createClienteUseCase =
      module.get<CreateClienteUseCase>(CreateClienteUseCase);
    signup = module.get<SignUpUseCase>(SignUpUseCase);
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
      .spyOn(clienteRepository, 'findByDocumento')
      .mockResolvedValue(null);
    const clienteRepositoryCreateSpy = jest
      .spyOn(clienteRepository, 'create')
      .mockResolvedValue(createdCliente);
    const signupSpy = jest.spyOn(signup, 'execute').mockResolvedValue(
      of('signup').pipe(
        map((resp) => {
          return createSignup;
        }),
      ),
    );

    const result = await createClienteUseCase.execute(mockClienteData);

    expect(result).toEqual(createdCliente);
    expect(clienteRepository.findByDocumento).toHaveBeenCalledWith({
      documento: mockClienteData.documento,
    });
    expect(clienteRepository.create).toHaveBeenCalledWith({
      cliente: expect.any(ClienteEntity),
    });
    expect(clienteRepositoryFindByDocumentSpy).toHaveBeenCalled();
    expect(clienteRepositoryCreateSpy).toHaveBeenCalled();
    expect(signupSpy).toHaveBeenCalled();
  });

  it('should throw DocumentoCadastradoException if the document already exists', async () => {
    // Mock that an existing client with the same document is found
    const clienteRepositoryFindByDocumentSpy = jest
      .spyOn(clienteRepository, 'findByDocumento')
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

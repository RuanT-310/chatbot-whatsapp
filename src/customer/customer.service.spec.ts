import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

const mockCustomerRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto: CreateCustomerDto = { name: 'Test User', number: '1234567890' };
      const expectedResult = { id: 1, ...createCustomerDto };
      
      mockCustomerRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createCustomerDto);
      
      expect(mockCustomerRepository.save).toHaveBeenCalledWith(createCustomerDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const expectedResult = [{ id: 1, name: 'Test User', number: '1234567890' }];
      
      mockCustomerRepository.find.mockResolvedValue(expectedResult);

      const result = await service.findAll();
      
      expect(mockCustomerRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const id = 1;
      const expectedResult = { id: 1, name: 'Test User', number: '1234567890' };
      
      mockCustomerRepository.findOneBy.mockResolvedValue(expectedResult);

      const result = await service.findOne(id);
      
      expect(mockCustomerRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const id = 1;
      const updateCustomerDto: UpdateCustomerDto = { name: 'Updated User' };
      const updateResult = { generatedMaps: [], raw: [], affected: 1 };

      mockCustomerRepository.update.mockResolvedValue(updateResult);

      const result = await service.update(id, updateCustomerDto);
      
      expect(mockCustomerRepository.update).toHaveBeenCalledWith(id, updateCustomerDto);
      expect(result).toEqual(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      const id = 1;
      const deleteResult = { raw: [], affected: 1 };
      
      mockCustomerRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(id);
      
      expect(mockCustomerRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteResult);
    });
  });
});

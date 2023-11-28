import { Test, TestingModule } from '@nestjs/testing';
import { VotersService } from './voters.service';
import { CreateVoterDto, UpdateVoterDto } from '../../entities/dtos/voters';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('VotersService', () => {
  let service: VotersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotersService],
    }).compile();

    service = module.get<VotersService>(VotersService);
  });

  describe('create', () => {
    it('should create a new voter', async () => {
      const mockCreateVoterDto: CreateVoterDto = {
        full_name: "Luis  Cruz",
        identification_card: "402-2196950-0",
        address: "",
        electoral_table: "0040"
      };

      const result = await service.create(mockCreateVoterDto);

      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should find all voters', async () => {
      const result = await service.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should find a voter by ID', async () => {
      const mockId = new Types.ObjectId().toHexString();

      const result = await service.findOne(mockId);

      expect(result).toBeDefined();
    });

    it('should throw NotFoundException when voter with ID not found', async () => {
      const mockId = 'nonexistentId';

      await expect(service.findOne(mockId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a voter by ID', async () => {
      const mockId = new Types.ObjectId().toHexString();
      const mockUpdateVoterDto: UpdateVoterDto = {
        full_name: "Luis  Cruz",
        identification_card: "402-2196950-0",
        address: "",
        electoral_table: "0040"
      };

      await expect(service.update(mockId, mockUpdateVoterDto)).resolves.not.toThrow();
    });

    it('should throw NotFoundException when updating a nonexistent voter', async () => {
      const mockId = 'nonexistentId';
      const mockUpdateVoterDto: UpdateVoterDto = {
        full_name: "Luis  Cruz",
        identification_card: "402-2196950-0",
        address: "",
        electoral_table: "0040"
      };

      await expect(service.update(mockId, mockUpdateVoterDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a voter by ID', async () => {
      const mockId = new Types.ObjectId().toHexString();

      await expect(service.remove(mockId)).resolves.not.toThrow();
    });

    it('should throw NotFoundException when removing a nonexistent voter', async () => {
      const mockId = 'nonexistentId';

      await expect(service.remove(mockId)).rejects.toThrowError(NotFoundException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: { getProducts: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    service = {
      getProducts: vi.fn().mockResolvedValue({ data: [], page: 1, limit: 10, hasNextPage: false }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: service }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should pass the parsed sort field and direction to the service', async () => {
    await controller.getProducts('2', '25', 'mouse', '7', 'price', 'desc');

    expect(service.getProducts).toHaveBeenCalledWith(2, 25, 'mouse', 7, 'price', 'desc');
  });
});

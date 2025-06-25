import { TestBed } from '@angular/core/testing';

import { SchemaPrismaService } from './schema.prisma.service';

describe('SchemaPrismaService', () => {
  let service: SchemaPrismaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaPrismaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

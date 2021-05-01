import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
describe('ProductService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=product.service.spec.js.map
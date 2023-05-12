package TH_WEB.Service.impl;

import TH_WEB.Enity.Product;
import TH_WEB.Respository.ProductRespos;
import TH_WEB.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Service
@Transactional
public class ProductIMPL implements ProductService {

    @Autowired(required = true)
    private ProductRespos productRespos;

    @Override
    public List<Product> listAll() {
        return productRespos.findAll();
    }

    @Override
    public Product findbyID(int id) {
        return productRespos.findById(id);
    }

    @Override
    public Product get(int id) {
        return productRespos.findById(id);
    }

    @Override
    public String save(Product product) {
        productRespos.save(product);
        return product.getName();
    }

    @Override
    public String deleted(int id) {
        String res = productRespos.deleteById(id);
        return res;
    }
}

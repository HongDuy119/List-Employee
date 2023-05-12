package TH_WEB.Service;

import TH_WEB.Enity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface ProductService {
    // get all product
    public List<Product> listAll();
    Product findbyID(int id);
    //get all by id
    public Product get(int id);

    public String save(Product product);

    public String deleted(int id);



}

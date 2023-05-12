package TH_WEB.Controller;

import TH_WEB.Enity.Product;
import TH_WEB.Service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Product>> getAll(){
        List<Product> products = productService.listAll();
        return ResponseEntity.ok(products);
    }
    @GetMapping("/getAll/{id}")
    public ResponseEntity<Product> getAll(@PathVariable int id){
        Product products = productService.findbyID(id);
        System.out.println(products);
        return ResponseEntity.ok(products);
    }
    @PostMapping("/products")
    public void add(@RequestParam String products) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Product product = objectMapper.readValue(products, Product.class);
        ResponseEntity.ok(productService.save(product));
    }
    @PutMapping("getAll/{id}")
    public ResponseEntity<?> upate(@PathVariable Integer id, @RequestParam String products) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Product product = objectMapper.readValue(products, Product.class);
        return ResponseEntity.ok(productService.save(product));
    }

    @DeleteMapping("/products/delete/{id}")
    public void delete(@PathVariable Integer id) {
        productService.deleted(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> search(@RequestParam String submit)
    {
        return null;
    }
}

package TH_WEB.Respository;

import TH_WEB.Enity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
@EnableJpaRepositories
public interface ProductRespos extends JpaRepository<Product, Integer> {
    List<Product> findAll();

    public Product findById(int id);

    String deleteById(int id);

}

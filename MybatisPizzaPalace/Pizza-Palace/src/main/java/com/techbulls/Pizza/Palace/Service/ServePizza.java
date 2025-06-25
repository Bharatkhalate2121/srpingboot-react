package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Dto.Requests.PizzaWithImage;
import com.techbulls.Pizza.Palace.Entities.Pizza;
import com.techbulls.Pizza.Palace.Mapper.PizzaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ServePizza {

    private PizzaMapper pizzaMapper;

    @Autowired
    public void setPizzaMapper(PizzaMapper pizzaMapper) {
        this.pizzaMapper = pizzaMapper;
    }

    public Pizza createPizza(Pizza pizza){
            pizzaMapper.insertPizza(pizza);
            return pizza;
    }

    public Pizza getPizzaById(Integer id){
        Pizza pizza=pizzaMapper.getPizzaById(id);
        if (pizza!=null){
            return pizza;
        }
        throw new NoSuchElementException("No record with id "+id+" exists");
    }

    public List<Pizza> getAllPizza(){
        List<Pizza> pizzaList=pizzaMapper.getALlPizzas();
        if(pizzaList!=null){
            return pizzaList;
        }
        throw new NoSuchElementException("No Pizzas Available");
    }

    public Pizza updatePizza(Integer id, Pizza pizza){
        pizza.setPizzaId(id);
        this.getPizzaById(id);
        pizzaMapper.updatePizza(pizza);
        return pizzaMapper.getPizzaById(id);
    }

    public void deletePizzaById(Integer id){
        this.getPizzaById(id);
        pizzaMapper.deletePizza(id);
    }

    public Pizza addPizza(Pizza pizza,MultipartFile file){
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("File is empty.");
                }
                File dir = new File("Images/");
                if (!dir.exists()) dir.mkdirs();
                // Get file extension
                String originalFilename = file.getOriginalFilename();
                String extension = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }
                // Generate random name
                String newFileName = UUID.randomUUID().toString() + extension;
                // Save file
                Path targetPath = Paths.get("Images/").resolve(newFileName);
                Files.write(targetPath, file.getBytes());
                pizza.setImageUrl("http://localhost:8080/images/"+newFileName);
                pizza =this.createPizza(pizza);
                return pizza;
         } catch (IOException e) {
                     throw new RuntimeException("Could not store file: " + e.getMessage());
                }

    }
}

package com.techbulls.Pizza.Palace.Controllers;


import com.techbulls.Pizza.Palace.Dto.PizzaList;
import com.techbulls.Pizza.Palace.Dto.ResponseObject;
import com.techbulls.Pizza.Palace.Entities.Pizza;
import com.techbulls.Pizza.Palace.Service.ServePizza;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pizzas")
public class PizzaController {
    private ServePizza servePizza;

    @Autowired
    public void setServePizza(ServePizza servePizza){
        this.servePizza=servePizza;
    }


    @PostMapping
    public ResponseEntity<?> createPizzas(@Valid @RequestBody Pizza pizza){
        pizza=servePizza.createPizza(pizza);
        PizzaList data=new PizzaList(List.of(pizza));
        ResponseObject responseObject=new ResponseObject(true,"Pizza Created Successfully",data);
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPizza(@PathVariable Integer id){
        Pizza pizza=servePizza.getPizzaById(id);
        PizzaList data=new PizzaList(List.of(pizza));
        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping
    public ResponseEntity<?> getAllPizzas(){
        List<Pizza> pizza=servePizza.getAllPizza();
        PizzaList data=new PizzaList(pizza);
        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
        return ResponseEntity.ok(responseObject);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> editPizza(@Valid @RequestBody Pizza pizza,@PathVariable Integer id){
        System.out.println(pizza);
        System.out.println(id);
        pizza=servePizza.updatePizza(id,pizza);

        PizzaList data=new PizzaList(List.of(pizza));
        ResponseObject responseObject=new ResponseObject(true,"Data Updated Successfuly",data);
        return ResponseEntity.ok(responseObject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePizza(@PathVariable Integer id){
        servePizza.deletePizzaById(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

}

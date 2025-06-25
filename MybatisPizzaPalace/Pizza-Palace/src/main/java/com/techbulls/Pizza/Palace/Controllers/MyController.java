package com.techbulls.Pizza.Palace.Controllers;

import com.techbulls.Pizza.Palace.Dto.CustomerList;
import com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj.OrderResponse;
import com.techbulls.Pizza.Palace.Dto.OrderList;
import com.techbulls.Pizza.Palace.Dto.PizzaList;
import com.techbulls.Pizza.Palace.Dto.ResponseObject;
import com.techbulls.Pizza.Palace.Entities.Pizza;
import com.techbulls.Pizza.Palace.Entities.Users;
import com.techbulls.Pizza.Palace.Service.ServeOrder;
import com.techbulls.Pizza.Palace.Service.ServePizza;
import com.techbulls.Pizza.Palace.Service.ServeUsers;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class MyController {


    private ServePizza servePizza;
    @Autowired
    private ServeUsers serveUsers;

    @Autowired
    private ServeOrder serveOrder;

    @Autowired
    public void setServePizza(ServePizza servePizza) {
        this.servePizza = servePizza;
    }

    @PostMapping("/mypizza")
    public ResponseEntity<?> createPizza(@ModelAttribute @Valid Pizza pizza, @RequestParam("file") MultipartFile file){
        System.out.println(pizza);
        pizza=servePizza.addPizza(pizza,file);
        PizzaList data=new PizzaList(List.of(pizza));
        ResponseObject responseObject=new ResponseObject(true,"Pizza Created Successfully",data);
        return ResponseEntity.ok(responseObject);

    }


    @GetMapping("/images/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) throws IOException {
        Path file = Paths.get(System.getProperty("user.dir"), "Images", filename);

        byte[] imageBytes = Files.readAllBytes(file);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // or IMAGE_PNG depending on file type
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> getAuth(@Valid @RequestBody Users users){
        List<Object> list=serveUsers.getUsers(users);
        ResponseObject responseObject=new ResponseObject(true,"Data Found",list);
        return ResponseEntity.ok(responseObject);
    }

//    @GetMapping("/getOrdersForUser/{id}")
//    public ResponseEntity<?> getOrdersForCustomer(@PathVariable Integer id){
//        List<OrderResponse> list=serveOrder.getOrderByUserId(id);
//        OrderList data=new OrderList(list);
//        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
//        return ResponseEntity.ok(responseObject);
//    }

//    @GetMapping("/getOrdersForUser/{")
//    public ResponseEntity<?> getOrdersForCustomer(@PathVariable Integer id){
//        List<OrderResponse> list=serveOrder.getOrderByUserId(id);
//        OrderList data=new OrderList(list);
//        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
//        return ResponseEntity.ok(responseObject);
//    }



}

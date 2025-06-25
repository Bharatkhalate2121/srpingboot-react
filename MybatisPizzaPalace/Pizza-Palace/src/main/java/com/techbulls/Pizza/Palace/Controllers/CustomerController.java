package com.techbulls.Pizza.Palace.Controllers;


import com.techbulls.Pizza.Palace.Dto.CustomerList;
import com.techbulls.Pizza.Palace.Dto.ResponseObject;
import com.techbulls.Pizza.Palace.Entities.Customer;
import com.techbulls.Pizza.Palace.Entities.Pizza;
import com.techbulls.Pizza.Palace.Service.ServeCustomer;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private ServeCustomer serveCustomer;

    @Autowired
    public void setServeCustomer(ServeCustomer serveCustomer){
        this.serveCustomer = serveCustomer;
    }


    @PostMapping
    public ResponseEntity<?> createCustomer(@Valid @RequestBody Customer customer,@RequestParam String password){
        System.out.println("hiii");
        customer= serveCustomer.createCustomer(customer, password);
        CustomerList data=new CustomerList(List.of(customer));
        ResponseObject responseObject=new ResponseObject(true,"Customer Created Successfully",data);
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable Integer id){
        Customer customer= serveCustomer.getCustomerById(id);
        CustomerList data=new CustomerList(List.of(customer));
        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
        return ResponseEntity.ok(responseObject);
    }

    @GetMapping
    public ResponseEntity<?> getALlCustomers(){
        List<Customer> customer= serveCustomer.getAllCustomer();
        CustomerList data=new CustomerList(customer);
        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
        return ResponseEntity.ok(responseObject);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> editCustomer(@Valid @RequestBody Customer customer,@PathVariable Integer id){
        customer= serveCustomer.updateCustomer(id,customer);

        CustomerList data=new CustomerList(List.of(customer));
        ResponseObject responseObject=new ResponseObject(true,"Data Found",data);
        return ResponseEntity.ok(responseObject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer id){
        serveCustomer.deleteCustomerById(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

}

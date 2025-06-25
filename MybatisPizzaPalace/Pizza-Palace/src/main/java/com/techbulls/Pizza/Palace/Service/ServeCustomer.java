package com.techbulls.Pizza.Palace.Service;


import com.techbulls.Pizza.Palace.Entities.Customer;
import com.techbulls.Pizza.Palace.Mapper.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ServeCustomer {

    private CustomerMapper customerMapper;

    @Autowired
    private ServeUsers serveUsers;

    @Autowired
    public void setCustomerMapper(CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }


    @Transactional
    public Customer createCustomer(Customer customer,String password){
        customerMapper.insertCustomer(customer);
        serveUsers.cresteUser(customer.getEmailAddress(),password);
        return customer;
    }

    public Customer getCustomerById(Integer id){
        Customer customer= customerMapper.getCustomerById(id);
        if (customer!=null){
            return customer;
        }
        throw new NoSuchElementException("No record with id "+id+" exists");
    }

    public List<Customer> getAllCustomer(){
        List<Customer> customerList= customerMapper.getAllCustomers();
        if(customerList!=null){
            return customerList;
        }
        throw new NoSuchElementException("No Customers Available");
    }

    public Customer updateCustomer(Integer id, Customer customer){
        customer.setCustomerId(id);
        this.getCustomerById(id);
        customerMapper.updateCustomer(customer);
        return customerMapper.getCustomerById(id);
    }

    public void deleteCustomerById(Integer id){
        this.getCustomerById(id);
        customerMapper.deleteCustomer(id);
    }

    public Customer getCustomerByEmail(String email){
        return customerMapper.getCustomerByEmail(email);
    }



}

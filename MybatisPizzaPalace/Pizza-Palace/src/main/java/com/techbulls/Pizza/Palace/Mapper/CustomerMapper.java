package com.techbulls.Pizza.Palace.Mapper;

import com.techbulls.Pizza.Palace.Entities.Customer;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CustomerMapper {
    @Select("SELECT * FROM customer WHERE customer_id = #{id}")
    Customer getCustomerById(Integer id);

    @Select("SELECT * FROM customer")
    List<Customer> getAllCustomers();

    @Insert("INSERT INTO customer(first_name, last_name, address, phone_number, email_address) " +
            "VALUES (#{firstName}, #{lastName}, #{address}, #{phoneNumber}, #{emailAddress})")
    @Options(useGeneratedKeys = true, keyProperty = "customerId")
    void insertCustomer(Customer customer);

    @Update("UPDATE customer SET first_name = #{firstName}, last_name = #{lastName}, address = #{address}, " +
            "phone_number = #{phoneNumber}, email_address = #{emailAddress} WHERE customer_id = #{customerId}")
    void updateCustomer(Customer customer);

    @Delete("DELETE FROM customer WHERE customer_id = #{id}")
    void deleteCustomer(Integer id);

    @Select("SELECT * FROM customer WHERE email_address = #{email}")
    Customer getCustomerByEmail(String email);



}


package com.techbulls.Pizza.Palace.Dto;

import com.techbulls.Pizza.Palace.Entities.Customer;
import com.techbulls.Pizza.Palace.Entities.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerList {
    private List<Customer> customer;
}

package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Entities.Customer;
import com.techbulls.Pizza.Palace.Mapper.CustomerMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;

@ExtendWith(MockitoExtension.class)
public class TestCustomerService {

    @Mock
    private CustomerMapper customerMapper;
    @Mock
    private ServeUsers serveUsers;
    @InjectMocks
    private ServeCustomer serveCustomer;

    private static Customer customer=new Customer();

    @BeforeAll
    public static void setCustomer(){
        customer.setCustomerId(1);
        customer.setFirstName("Bharat");
        customer.setLastName("Khalate");
        customer.setAddress("ChavhanWadi, Tuljapur, Dharashiv");
        customer.setPhoneNumber("8010269748");
        customer.setEmailAddress("bharatkhalate50@gmail.com");
    }

    @Test
    public void testCreateCustomer(){
        customer.setCustomerId(null);
        Mockito.doNothing().when(serveUsers).cresteUser(Mockito.any(String.class),Mockito.any(String.class));
        Mockito.doAnswer(invocation -> {
            Customer customer1=invocation.getArgument(0);
            customer1.setCustomerId(1);
            return null;
        }).when(customerMapper).insertCustomer(Mockito.any(Customer.class));
        Customer result=serveCustomer.createCustomer(customer,"1234567890");
        Assertions.assertEquals(customer.getCustomerId(),result.getCustomerId());
    }

    @Test
    public void testGetCustomerById(){
        Mockito.when(customerMapper.getCustomerById(Mockito.any(Integer.class))).thenReturn(customer);
        Customer result=serveCustomer.getCustomerById(1);
        Assertions.assertEquals(customer,result);
    }

    @Test
    public void testGetCustomerByIdNotFound(){
        Mockito.when(customerMapper.getCustomerById(Mockito.any(Integer.class))).thenReturn(null);
        NoSuchElementException noSuchElementException=Assertions.assertThrows(NoSuchElementException.class,()->{
            serveCustomer.getCustomerById(1);
        });
        Assertions.assertEquals("No record with id 1 exists",noSuchElementException.getMessage());
    }

    @Test
    public void getAllCustomer (){
        Mockito.when(customerMapper.getAllCustomers()).thenReturn(List.of(customer));
        List<?> customerList=serveCustomer.getAllCustomer();
        Assertions.assertEquals(List.of(customer),customerList);
    }

    @Test
    public void testUpdateCustomer(){
        Mockito.when(customerMapper.getCustomerById(Mockito.any(Integer.class))).thenReturn(customer);
        Mockito.doNothing().when(customerMapper).updateCustomer(Mockito.any(Customer.class));
        Customer result=serveCustomer.updateCustomer(1,customer);
    }

    @Test
    public void testDeleteCustomerById(){
        Mockito.doNothing().when(customerMapper).deleteCustomer(Mockito.any(Integer.class));
        customerMapper.deleteCustomer(1);
        Mockito.verify(customerMapper,Mockito.times(1)).deleteCustomer(1);
    }

    @Test
    public void testGetCusomerByEmail(){
        Mockito.when(customerMapper.getCustomerByEmail(Mockito.anyString())).thenReturn(customer);
        Customer result=serveCustomer.getCustomerByEmail("");
        Assertions.assertEquals(customer,result);
    }


}

package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Entities.Pizza;
import com.techbulls.Pizza.Palace.Mapper.PizzaMapper;
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
public class TestPizzaService {

    @Mock
    private PizzaMapper pizzaMapper;

    @InjectMocks
    private ServePizza servePizza;

    private static Pizza pizza=new Pizza();

    @BeforeAll
    public static void setPizza(){
        pizza.setPizzaId(1);
        pizza.setName("Mergerita");
        pizza.setDescription("this is very good pizza, this nice pizza");
        pizza.setType("Veg");
        pizza.setImageUrl("http://localhost/abc.pizzasImages");
        pizza.setPriceRegularSize(150);
        pizza.setPriceMediumSize(200);
        pizza.setPriceLargeSize(300);
        pizza.setValid(true);
    }


    @Test
    public void testCreatePizza(){
        pizza.setPizzaId(null);
        Mockito.doAnswer(invocation -> {
            Pizza inputPizza = invocation.getArgument(0);
            inputPizza.setPizzaId(1); // mimic DB-generated ID
            return null; // because insertPizza is void
        }).when(pizzaMapper).insertPizza(Mockito.any(Pizza.class));
        Pizza result = servePizza.createPizza(pizza);
        Assertions.assertEquals(1, result.getPizzaId());
        Assertions.assertEquals(pizza,result);
    }


    @Test
    public void testGetPizzaById(){
        Mockito.when(pizzaMapper.getPizzaById(Mockito.any(Integer.class))).thenReturn(pizza);
        Pizza resultantPizza=servePizza.getPizzaById(pizza.getPizzaId());
        Assertions.assertEquals(pizza,resultantPizza);
    }


    @Test
    public void getAllPizzas(){
        List<Pizza> pizzaList= List.of(pizza);
        Mockito.when(pizzaMapper.getALlPizzas()).thenReturn(pizzaList);
        List<?> list=servePizza.getAllPizza();
        Assertions.assertEquals(pizzaList,list);
    }

    @Test
    public void getAllPizzasWhenNoPizzas(){
        Mockito.when(servePizza.getAllPizza()).thenReturn(null);
        NoSuchElementException noSuchElementException=Assertions.assertThrows(NoSuchElementException.class,()->{
            servePizza.getAllPizza();
        });
        Assertions.assertEquals("No Pizzas Available",noSuchElementException.getMessage());
    }

    @Test
    public void testUpdatePizza(){
        Pizza expectedPizza=new Pizza();
        expectedPizza.setPizzaId(1);
        expectedPizza.setName("Mergerita");
        Pizza pizzaToPass=new Pizza();
        pizzaToPass.setName("abc");
        pizzaToPass.setPizzaId(1);
        Mockito.when(pizzaMapper.getPizzaById(Mockito.any(Integer.class))).thenReturn(expectedPizza);
        Mockito.doNothing().when(pizzaMapper).updatePizza(pizza);
        Pizza result=servePizza.updatePizza(1,pizza);
        Assertions.assertEquals(pizza.getName(),result.getName());
        Assertions.assertEquals(pizza.getPizzaId(),result.getPizzaId());
        Mockito.verify(pizzaMapper,Mockito.times(1)).updatePizza(Mockito.any(Pizza.class));
    }



    @Test
    public void testDeletePizzaById(){
        Mockito.when(pizzaMapper.getPizzaById(Mockito.any(Integer.class))).thenReturn(pizza);
        Mockito.doNothing().when(pizzaMapper).deletePizza(Mockito.any(Integer.class));
        servePizza.deletePizzaById(1);
        Mockito.verify(pizzaMapper,Mockito.times(1)).deletePizza(Mockito.any(Integer.class));
    }


}

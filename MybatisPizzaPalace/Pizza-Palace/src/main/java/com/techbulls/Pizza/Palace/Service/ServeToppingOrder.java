package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Entities.ToppingOrder;
import com.techbulls.Pizza.Palace.Mapper.ToppingsOrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ServeToppingOrder {
    @Autowired
    private ToppingsOrderMapper toppingsOrderMapper;


    public ToppingOrder createToppingOrder(ToppingOrder toppingOrder){
        toppingsOrderMapper.createToppingOrder(toppingOrder);
        return toppingOrder;
    }

    public List<Integer> getToppingsIdByOrderLineID(Integer id){
        return toppingsOrderMapper.getToppingsByOrderLineId(id);
    }

    public void deleteToppingOrderByOrderId(Integer orderId){
        toppingsOrderMapper.deleteToppingOrderByOrderId(orderId);
    }
}

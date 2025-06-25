package com.techbulls.Pizza.Palace.Service;

import com.techbulls.Pizza.Palace.Dto.Response.PizzaResponseObj;
import com.techbulls.Pizza.Palace.Entities.OrderLine;
import com.techbulls.Pizza.Palace.Mapper.OrderLineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServeOrderLine {

    private OrderLineMapper orderLineMapper;
    @Autowired
    public void setOrderLineMapper(OrderLineMapper orderLineMapper) {
        this.orderLineMapper = orderLineMapper;
    }

    public List<PizzaResponseObj> getOrderPizzaDetails(Integer id){
        return orderLineMapper.getOrderPizzaDetails(id);
    }

    public OrderLine createOrderline(OrderLine orderLine){
        orderLineMapper.insertOrderLine(orderLine);
        return orderLine;
    }

    public void deleteOrderLineByOrderId(Integer id){
        orderLineMapper.deleteOrderLineByOrderId(id);
    }

    public List<OrderLine> getOrderLineDetailsByOrderId(Integer id){
        List<OrderLine> orderLineList=orderLineMapper.getOrderPizzaDetailsByOrderId(id);
        return orderLineList;
    }

}

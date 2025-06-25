package com.techbulls.Pizza.Palace.Mapper;

import com.techbulls.Pizza.Palace.Dto.Response.PizzaResponseObj;
import com.techbulls.Pizza.Palace.Entities.OrderLine;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OrderLineMapper {
    @Select("SELECT * FROM order_line WHERE order_line_id = #{id}")
    OrderLine getOrderLineById(Integer id);

    @Insert("INSERT INTO order_line(order_id, pizza_id, size, quantity, total_price) " +
            "VALUES (#{orderId}, #{pizzaId}, #{size}, #{quantity}, #{totalPrice})")
    @Options(useGeneratedKeys = true, keyProperty = "orderLineId")
    void insertOrderLine(OrderLine orderLine);

    @Update("UPDATE order_line SET order_id = #{orderId}, pizza_id = #{pizzaId}, size = #{size}, quantity = #{quantity}, " +
            "total_price = #{totalPrice} WHERE order_line_id = #{orderLineId}")
    void updateOrderLine(OrderLine orderLine);

    @Delete("DELETE FROM order_line WHERE order_line_id = #{id}")
    void deleteOrderLine(Integer id);

    @Delete("DELETE FROM order_line WHERE order_id = #{id}")
    void deleteOrderLineByOrderId(Integer id);

    @Select("select pizza_id, size, quantity, total_price as sub_total from order_line where order_id=#{orderId}")
    List<PizzaResponseObj> getOrderPizzaDetails(Integer orderId);

    @Select("select * from order_line where order_id=#{orderId}")
    List<OrderLine> getOrderPizzaDetailsByOrderId(Integer orderId);
}

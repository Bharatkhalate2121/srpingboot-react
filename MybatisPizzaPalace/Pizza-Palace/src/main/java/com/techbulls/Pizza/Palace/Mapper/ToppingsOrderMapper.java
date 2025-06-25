package com.techbulls.Pizza.Palace.Mapper;

import com.techbulls.Pizza.Palace.Entities.ToppingOrder;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ToppingsOrderMapper {
    @Insert("insert into topping_order (order_id,order_line_id,topping_id) values(#{orderId},#{orderLineId},#{toppingId})")
    @Options(useGeneratedKeys = true, keyProperty = "toppingOrderId", keyColumn = "topping_order_id")
    void createToppingOrder(ToppingOrder toppingOrder);

    @Select("select topping_id from topping_order where order_line_id=#{id}")
    List<Integer> getToppingsByOrderLineId(Integer id);

    @Delete("delete from topping_order where order_id=#{orderId}")
    void deleteToppingOrderByOrderId(Integer orderID);

}

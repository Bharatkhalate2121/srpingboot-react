package com.techbulls.Pizza.Palace.Mapper;

import com.techbulls.Pizza.Palace.Dto.MyObj.RequestObj.ChangeAddressObj;
import com.techbulls.Pizza.Palace.Dto.Requests.OrderUpdateRequestObj;
import com.techbulls.Pizza.Palace.Entities.Orders;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OrderMapper {
    @Select("SELECT * FROM orders WHERE order_id = #{id}")
    Orders getOrderById(Integer id);

    @Select("SELECT * FROM orders order by order_id asc")
    List<Orders> getAllOrders();

    @Insert("INSERT INTO orders(customer_id, status, total_amount, delivery_address, valid) " +
            "VALUES (#{customerId}, DEFAULT, #{totalAmount}, #{deliveryAddress},true)")
    @Options(useGeneratedKeys = true, keyProperty = "orderId")
    void insertOrder(Orders order);

    @Update("UPDATE orders SET status='CREATED', delivery_address = #{deliveryAddress} WHERE order_id = #{id}")
    void updateOrder(@Param("deliveryAddress") String deliveryAddress, @Param("id") Integer id);


    @Delete("update orders set valid=false WHERE order_id = #{id}")
    void deleteOrder(Integer id);

    @Select("select * from orders where customer_id=#{id} AND valid=true order by order_id asc")
    List<Orders> getAllOrderByUserId(Integer id);

    @Update("UPDATE orders SET status='CREATED', delivery_address = #{deliveryAddress} WHERE order_id = #{orderId}")
    void updateOrderAddress(ChangeAddressObj changeAddressObj);

}

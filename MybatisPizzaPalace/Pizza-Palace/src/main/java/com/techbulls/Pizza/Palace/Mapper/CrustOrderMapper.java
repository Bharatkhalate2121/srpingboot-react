package com.techbulls.Pizza.Palace.Mapper;

import com.techbulls.Pizza.Palace.Entities.Crust;
import com.techbulls.Pizza.Palace.Entities.CrustOrder;
import org.apache.ibatis.annotations.*;

@Mapper
public interface CrustOrderMapper {
    @Insert("insert into crust_order(order_id, order_line_id, crust_id) values (#{orderId}, #{orderLineId}, #{crustId})")
    @Options(useGeneratedKeys = true, keyProperty = "crustOrderId", keyColumn = "crust_order_id")
    void createCrustOrder(CrustOrder crust);

    @Select("select crust_id from crust_order where order_line_id=#{id}")
    Integer getCrustByOrderLineId(Integer id);

    @Delete("delete from crust_order where order_id=#{orderId}")
    void deleteCrustOrderByOrderId(Integer Id);
}

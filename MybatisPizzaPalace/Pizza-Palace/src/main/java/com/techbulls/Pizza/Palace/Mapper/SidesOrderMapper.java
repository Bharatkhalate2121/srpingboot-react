package com.techbulls.Pizza.Palace.Mapper;


import com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj.SidesResponse;
import com.techbulls.Pizza.Palace.Entities.SidesOrder;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SidesOrderMapper {

        @Insert("INSERT INTO sides_order (order_id, sides_id, quantity) " +
                "VALUES (#{orderId}, #{sidesId}, #{quantity})")
        @Options(useGeneratedKeys = true, keyProperty = "sidesOrderId")
        void insertSidesOrder(SidesOrder sidesOrder);

        @Select("select sides_id, quantity from sides_order where order_id=#{OrderId}")
        List<SidesResponse> getSidesByOrderId(Integer OrderId);

        @Delete("delete from sides_order where order_id=#{orderId}")
        void deleteSidesOrderById(Integer orderId);

}

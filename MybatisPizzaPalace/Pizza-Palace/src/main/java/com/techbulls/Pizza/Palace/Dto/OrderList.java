package com.techbulls.Pizza.Palace.Dto;

import com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj.OrderResponse;
import com.techbulls.Pizza.Palace.Dto.Response.OrdersResponseObj;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderList {
//    private List<OrdersResponseObj> order;
    private List<OrderResponse> order;

}

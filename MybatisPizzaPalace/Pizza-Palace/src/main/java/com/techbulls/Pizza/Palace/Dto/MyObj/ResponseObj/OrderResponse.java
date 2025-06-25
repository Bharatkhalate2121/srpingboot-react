package com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderResponse {
    private Integer orderId;
    private Integer customerId;
    private String deliveryAddress;
    private Integer totalAmount;
    private String status;
    private LocalDateTime orderTime;
    private Boolean valid;
    private List<PizzaResponse> pizza;
    private List<SidesResponse> sides;
}

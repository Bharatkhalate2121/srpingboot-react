package com.techbulls.Pizza.Palace.Dto.Response;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersResponseObj {

    private Integer orderId;
    private Integer customerId;
    private String status;
    @Positive(message = "Total Amount cant be less then 0")
    private Integer totalAmount;
    private LocalDateTime orderTime;
    private String deliveryAddress;
    private List<PizzaResponseObj> pizza;

}
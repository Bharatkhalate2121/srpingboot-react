package com.techbulls.Pizza.Palace.Entities;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;


@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orders {
    private Integer orderId;
    private Integer customerId;
    private String status;
    @Positive(message = "Total Amount cant be less then 0")
    private Integer totalAmount;
    private LocalDateTime orderDateTime;
    private String deliveryAddress;
    private Boolean valid;
}
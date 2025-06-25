package com.techbulls.Pizza.Palace.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidesOrder {
    private Integer sidesOrderId;
    private Integer orderId;
    private Integer sidesId;
    private Integer quantity;
}
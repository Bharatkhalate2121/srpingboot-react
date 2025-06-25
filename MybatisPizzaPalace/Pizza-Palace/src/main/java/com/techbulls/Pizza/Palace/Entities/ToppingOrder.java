package com.techbulls.Pizza.Palace.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToppingOrder {
    private Integer toppingOrderId;
    private Integer orderId;
    private Integer orderLineId;
    private Integer toppingId;
}

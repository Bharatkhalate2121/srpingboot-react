package com.techbulls.Pizza.Palace.Dto.Requests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderUpdateRequestObj {

    private Integer customerId;
    private String deliveryAddress;
    private List<PizzaRequestObj> pizza;

}

package com.techbulls.Pizza.Palace.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PizzaResponseObj {
    private Integer pizzaId;
    private String size;
    private Integer quantity;
    private Integer subTotal;
}

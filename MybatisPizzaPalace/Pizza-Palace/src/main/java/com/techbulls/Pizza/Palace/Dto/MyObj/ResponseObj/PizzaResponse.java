package com.techbulls.Pizza.Palace.Dto.MyObj.ResponseObj;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PizzaResponse {


    @NotNull(message="invalid Id")
    private Integer pizzaId;
    @NotNull(message = "ivalid size")
    @NotEmpty(message = "ivalid size")
    private String size;
    @Min(value = 1,message = "please select atleast 1 pizza")
    private Integer quantity;
    private Integer crustId;

    private Integer subTotal;

    private List<Integer> toppingsId;
}

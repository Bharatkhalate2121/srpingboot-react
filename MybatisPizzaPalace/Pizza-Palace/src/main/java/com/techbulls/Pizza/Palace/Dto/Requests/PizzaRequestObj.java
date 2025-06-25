package com.techbulls.Pizza.Palace.Dto.Requests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Validated
public class PizzaRequestObj {
    @NotNull(message = "Pizza id cant be null")
    private Integer pizzaId;
    @NotNull(message = "size cant be null")
    @NotEmpty(message = "size cant be Empty")
    private String size;
    @Min(value = 1, message = "please select atleast 1 pizza")
    private Integer quantity;
}

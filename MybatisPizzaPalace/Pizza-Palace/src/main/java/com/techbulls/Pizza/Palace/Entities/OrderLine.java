package com.techbulls.Pizza.Palace.Entities;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;


@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderLine {


    private Integer orderLineId;
    Integer orderId;
    Integer pizzaId;
    @NotNull @NotEmpty(message = "invalid size")
    private String size;
    @NotNull(message = "Can't be null")
    @Min(value = 1,message = "select atleast 1 pizza")
    private Integer quantity;
    @NotNull(message = "Total price cant be null")
    private Integer totalPrice;
}

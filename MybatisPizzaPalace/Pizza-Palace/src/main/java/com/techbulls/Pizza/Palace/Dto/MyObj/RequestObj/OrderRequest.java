package com.techbulls.Pizza.Palace.Dto.MyObj.RequestObj;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderRequest {
    @NotNull(message = "id annot be null")
    private Integer customerId;

    @NotNull(message = "address cannot be null")
    @NotEmpty(message = "Address annot be empty")
    private String deliveryAddress;

    @Min(value = 1,message = "amount is not valid")
    @Positive(message = "invalid amount")
    private Integer totalAmount;

    @NotNull(message ="please select some pizzas")
    @NotEmpty(message ="please select some pizzas")
    private List<PizzaRequestObj> pizza;

    private List<SidesRequestObj> sides;


}

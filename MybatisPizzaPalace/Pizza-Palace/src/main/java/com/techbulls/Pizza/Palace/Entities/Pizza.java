package com.techbulls.Pizza.Palace.Entities;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pizza {

    private Integer pizzaId;
    @NotNull(message = "name cannot be null")
    @NotEmpty(message = "name cannot be empty")
    private String name;
    private String description;
    private String type;
    private String imageUrl;
    @NotNull(message = "priceRegularSize pizza cannot be nulll")
    @Positive(message = "price cannot be negative")
    private  Integer priceRegularSize;
    @NotNull(message = "priceMediumSize pizza cannot be nulll")
    @Positive(message = "price cannot be negative")
    private Integer priceMediumSize;
    @NotNull(message = "priceLargeSize pizza cannot be nulll")
    @Positive(message = "price cannot be negative")
    private Integer priceLargeSize;

    private Boolean valid;

}

package com.techbulls.Pizza.Palace.Dto.Requests;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PizzaWithImage {

    private Integer pizzaId;
    @NotNull(message = "name cannot be null")
    @NotEmpty(message = "name cannot be empty")
    private String name;
    private String description;
    private String type;
    private MultipartFile imageUrl;
    @NotNull(message = "price cannot be nulll")
    @Positive(message = "price cannot be negative")
    private  Integer priceRegularSize;
    @NotNull(message = "price cannot be nulll")
    @Positive(message = "price cannot be negative")
    private Integer priceMediumSize;
    @NotNull(message = "price cannot be nulll")
    @Positive(message = "price cannot be negative")
    private Integer priceLargeSize;

}

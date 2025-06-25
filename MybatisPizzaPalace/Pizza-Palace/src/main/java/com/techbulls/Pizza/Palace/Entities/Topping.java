package com.techbulls.Pizza.Palace.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Topping {
    private Integer toppingId;
    private String name;
    private String type;
    private Boolean available;
}

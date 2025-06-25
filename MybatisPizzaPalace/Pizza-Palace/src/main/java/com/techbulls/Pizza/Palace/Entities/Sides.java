package com.techbulls.Pizza.Palace.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sides {
    private Integer sidesId;
    private String name;
    private Integer price;
    private Boolean available;
}

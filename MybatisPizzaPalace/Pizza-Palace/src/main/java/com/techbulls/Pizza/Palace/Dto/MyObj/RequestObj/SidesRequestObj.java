package com.techbulls.Pizza.Palace.Dto.MyObj.RequestObj;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidesRequestObj {
    @NotNull(message = "side id annot be nulll")
    private Integer sidesId;
    @NotNull(message = "quantity cannot be nulll")
    @Min(value = 1, message = "please select atlest 1 otem")
    private Integer quantity;
}
